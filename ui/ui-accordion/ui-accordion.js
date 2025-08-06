import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UIAccordion extends UIBase{
  #items = [];

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#items = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();
  }

  #render(){
    const fragment = document.createDocumentFragment();

    this.#items.forEach((item,index) => {
      const id = uuid();
      const idHeader = `id-header-${id}`;
      const idPanel = `id-panel-${id}`;

      /* header */
      const accordionHeader = document.createElement('ui-button');
      this.setAttributes(accordionHeader,{
        'ui': 'accordion-header',
        'theme': 'none',
        'size': 'none',
        'aria-expanded': item.expanded ? 'true' : 'false',
        'aria-controls': idPanel,
        'id': idHeader
      });

      if(item.disabled){
        accordionHeader.setAttribute('disabled','');
      }

      /* header text */
      const accordionHeaderText = document.createTextNode(item.label ?? '');

      /* header expand icon */
      const accordionHeaderIcon = document.createElement('ui-icon');
      this.setAttributes(accordionHeaderIcon,{
        'icon': 'arrow-down-small'
      });

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      /* panel */
      const accordionPanel = document.createElement('section');
      this.setAttributes(accordionPanel,{
        'role': 'region',
        'id': idPanel,
        'aria-labelledby': idHeader
      });
      accordionPanel.hidden = !item.expanded || item.disabled;
      accordionPanel.innerHTML = item.content ?? '';
      
      /* item */
      const accordionItem = document.createElement('div');
      this.setAttributes(accordionItem,{
        'role': 'presentation',
        'data-index': index
      });

      accordionItem.append(accordionHeader,accordionPanel);
      fragment.appendChild(accordionItem);

      /* events */
      accordionHeader.onAction = (e) => {
        if(!item.disabled){
          this.#onAction(accordionHeader,accordionPanel);
        }
      }
    });
    this.replaceChildren(fragment);
  }

  #onAction = (button,panel) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded',String(!expanded));
    if(panel) panel.hidden = expanded;
  }

}
customElements.define('ui-accordion',UIAccordion);