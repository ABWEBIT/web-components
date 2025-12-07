import {uuid} from '../../utils/index.js';

class UIAccordion extends HTMLElement{
  #items = null;
  #labels = null;
  connectedCallback(){

    this.#items = this.querySelectorAll('ui-accordion-item');
    this.#labels = this.querySelectorAll('ui-label');

    this.#items.forEach(item =>{
      const label = item.querySelector('ui-label');
      if(!label){
        throw new Error('ui-label not found in item');
      }
      label.role = 'heading';
      label.ariaLevel = "6";

      const panel = item.querySelector('ui-label');
      if(!label){
        throw new Error('ui-label not found in item');
      }


    });


  }


  #render(){
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
      accordionHeaderIcon.setAttribute('name','keyboard-arrow-down');

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      /* panel */
      const accordionPanel = document.createElement('div');
      accordionPanel.ariaHidden = item.expanded ? 'false' : 'true',
      accordionPanel.role = 'region';
      accordionPanel.id = idPanel;
      accordionPanel.setAttribute('aria-labelledby',idHeader);

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