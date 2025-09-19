import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';
import DOMPurify from '../../utils/purify.es.mjs';

class UIAccordion extends UIBase{
  #data = null;

  get data(){return this.#data;}
  set data(value){
    if(!Array.isArray(value)) throw new Error('Data must be an array');
    if(this.#data === value) return;
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
  }

  #render(){
    const d = this.#data;
    if(!d) return;

    const fragment = document.createDocumentFragment();

    d.forEach((item,index) => {
      const id = uuid();
      const idHeader = `id-header-${id}`;
      const idPanel = `id-panel-${id}`;

      /* header */
      const accordionHeader = document.createElement('ui-button');
      accordionHeader.ariaExpanded = item.expanded ? 'true' : 'false';
      accordionHeader.id = idHeader;
      accordionHeader.setAttribute('aria-controls',idPanel);

      accordionHeader.disabled = !!item.disabled;

      /* header text */
      const accordionHeaderText = document.createTextNode(item.label ?? '');

      /* header expand icon */
      const accordionHeaderIcon = document.createElement('ui-icon');
      accordionHeaderIcon.setAttribute('icon','arrow-down-small');

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      /* panel */
      const accordionPanel = document.createElement('div');
      accordionPanel.ariaHidden = item.expanded ? 'false' : 'true',
      accordionPanel.role = 'region';
      accordionPanel.id = idPanel;
      accordionPanel.setAttribute('aria-labelledby',idHeader);

      accordionPanel.innerHTML = DOMPurify.sanitize(item.content ?? '');
      
      /* item */
      const accordionItem = document.createElement('div');
      accordionItem.dataset.index = index;

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
    const expanded = button.ariaExpanded === 'true';
    button.ariaExpanded = String(!expanded);
    if(panel) panel.ariaHidden = String(expanded);
  }

}
customElements.define('ui-accordion',UIAccordion);