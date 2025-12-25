import {uuid} from '../../utilities/index.js';

class UIAccordion extends HTMLElement{
  #items = null;
  connectedCallback(){

    this.#items = this.querySelectorAll(':scope > div');

    this.#items.forEach(item =>{
      const id = uuid();
      const idButton = `button-${id}`;
      const idPanel = `panel-${id}`;

      const label = item.querySelector(':scope > :is(h2,h3,h4,h5,h6):first-child');
      if(!label){
        throw new Error('Accordion Label (h2-H6) not found');
      }

      const button = label.querySelector(':scope > button');
      if(!button){
        throw new Error('Accordion Button (button) not found');
      }

      const panel = item.querySelector(':scope > div');
      if(!panel){
        throw new Error('Accordion Panel (div) not found in item');
      }
      panel.role = 'region';

      button.id ||= idButton;
      panel.id ||= idPanel;

      button.setAttribute('aria-controls',panel.id);
      panel.setAttribute('aria-labelledby',button.id);

      let expanded = button.getAttribute('aria-expanded');

      if(expanded !== 'true' && expanded !== 'false'){
        button.setAttribute('aria-expanded','false');
        expanded = 'false';
      }

      panel.ariaHidden = String(expanded === 'false');
      item.dataset.expanded = String(expanded === 'true');

      button.addEventListener('click',() => this.#onAction(item,button,panel));

      const icon = document.createElement('ui-icon');
      icon.setAttribute('name','arrow-down');
      icon.setAttribute('expand-icon','');
      button.append(icon);
    });

  }

  #onAction = (item,button,panel) => {
    const expanded = button.ariaExpanded === 'true';
    item.dataset.expanded = String(!expanded);
    button.ariaExpanded = String(!expanded);
    panel.ariaHidden = String(expanded);
  }

}
customElements.define('ui-accordion',UIAccordion);