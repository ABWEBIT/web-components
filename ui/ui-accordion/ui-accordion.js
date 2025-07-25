import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UIAccordion extends UIBase{
  #items = [];
  #iconExpand = 'arrow-down-small';

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

    this.#iconExpand = this.getAttribute('icon') || this.#iconExpand;
    this.removeAttribute('icon');
  }

  #render(){
    this.replaceChildren();
    const fragment = document.createDocumentFragment();

    this.#items.forEach((item,index) => {
      const id = uuid();
      const idControl = `id-controls-${id}`;
      const idHeader = `id-header-${id}`;

      /* header */
      const accordionHeader = document.createElement('button');
      this.setAttributes(accordionHeader,{
        'type': 'button',
        'data-ui': 'accordion-header',
        'aria-expanded': item.expanded ? 'true' : 'false',
        'aria-controls': idControl,
        'id': idHeader
      });
      accordionHeader.disabled = !!item.disabled

      /* events */
      accordionHeader.addEventListener('keydown',(e) => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          if(e.repeat) return;
          if(!accordionHeader.disabled){
            this.#onAction(accordionHeader);
          }
        }
      });

      accordionHeader.addEventListener('click',() =>{
        if(!accordionHeader.disabled){
          this.#onAction(accordionHeader);
        }
      });

      /* header text */
      const accordionHeaderText = document.createElement('span');
      this.setAttributes(accordionHeaderText,{
        'data-ui': 'accordion-header-text'
      });
      accordionHeaderText.textContent = item.label ?? '';

      /* header expand icon */
      const accordionHeaderIcon = document.createElement('span');
      this.setAttributes(accordionHeaderIcon,{
        'data-ui': 'accordion-header-icon',
        'aria-hidden': 'true'
      });

      const icon = document.createElement('ui-icon');
      icon.setAttribute('icon',this.#iconExpand);
      accordionHeaderIcon.appendChild(icon);

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      /* panel */
      const accordionPanel = document.createElement('div');
      accordionPanel.setAttribute('data-ui','accordion-panel');
      this.setAttributes(accordionPanel,{
        'role': 'region',
        'id': idControl,
        'aria-labelledby': idHeader
      });
      accordionPanel.hidden = !item.expanded || item.disabled;
      accordionPanel.innerHTML = item.content ?? '';
      
      /* item */
      const accordionItem = document.createElement('div');
      this.setAttributes(accordionItem,{
        'data-ui': 'accordion-item',
        'data-ui-index': index
      });

      accordionItem.append(accordionHeader,accordionPanel);
      fragment.appendChild(accordionItem);
    });
    this.appendChild(fragment);
  }

  #onAction = (button) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded',String(!expanded));
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    panel.hidden = expanded;
  }

}
customElements.define('ui-accordion',UIAccordion);