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
      const accordionHeader = document.createElement('ui-accordion-header');
      this.setAttributes(accordionHeader,{
        'role': 'button',
        'tabindex': item.disabled ? '-1' : '0',
        'aria-expanded': item.expanded ? 'true' : 'false',
        'aria-controls': idPanel,
        'id': idHeader
      });

      if(item.disabled){
        accordionHeader.disabled = !!item.disabled;
        accordionHeader.setAttribute('disabled','');
        accordionHeader.ariaDisabled = String(!!item.disabled);
      }

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
      const accordionHeaderText = document.createTextNode(item.label ?? '');

      /* header expand icon */
      const accordionHeaderIcon = document.createElement('ui-icon');
      this.setAttributes(accordionHeaderIcon,{
        'icon': 'arrow-down-small'
      });

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      /* panel */
      const accordionPanel = document.createElement('ui-accordion-panel');
      this.setAttributes(accordionPanel,{
        'role': 'region',
        'id': idPanel,
        'aria-labelledby': idHeader
      });
      accordionPanel.hidden = !item.expanded || item.disabled;
      accordionPanel.innerHTML = item.content ?? '';
      
      /* item */
      const accordionItem = document.createElement('ui-accordion-item');
      this.setAttributes(accordionItem,{
        'index': index
      });

      accordionItem.append(accordionHeader,accordionPanel);
      fragment.appendChild(accordionItem);
    });
    this.replaceChildren(fragment);
  }

  #onAction = (button) => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded',String(!expanded));

    const panel = this.querySelector(`#${button.getAttribute('aria-controls')}`);
    if(panel) panel.hidden = expanded;
  }

}
customElements.define('ui-accordion',UIAccordion);