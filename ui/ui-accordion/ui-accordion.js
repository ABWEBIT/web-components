import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UIAccordion extends UIBase{
  #data = [];

  get data(){return this.#data;}
  set data(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
  }

  #render(){
    const fragment = document.createDocumentFragment();

    this.#data.forEach((item,index) => {
      const id = uuid();
      const idHeader = `id-header-${id}`;
      const idPanel = `id-panel-${id}`;

      /* header */
      const accordionHeader = document.createElement('ui-button');
      this.setAttributes(accordionHeader,{
        'aria-expanded': item.expanded ? 'true' : 'false',
        'aria-controls': idPanel,
        'id': idHeader
      });

      if(item.disabled){
        accordionHeader.setAttribute('disabled','');
      }

      /* header text */
      const accordionHeaderText = document.createTextNode(item.title ?? '');

      /* header expand icon */
      const accordionHeaderIcon = document.createElement('ui-icon');
      this.setAttributes(accordionHeaderIcon,{
        'icon': 'arrow-down-small'
      });

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      /* panel */
      const accordionPanel = document.createElement('div');
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
        'data-index': index
      });

      accordionItem.append(accordionHeader,accordionPanel);
      fragment.append(accordionItem);

      /* events */
      accordionHeader.addEventListener('button-action',() =>{
        if(!item.disabled){
          this.#onAction(accordionHeader,accordionPanel);
        }
      });
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