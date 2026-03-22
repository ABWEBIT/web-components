import './accordion-item.js';

export class UIAccordion extends HTMLElement{
  #items = [];

  connectedCallback(){
    this.#items = [...this.getElementsByTagName('ui-accordion-item')];

    this.addEventListener('accordion-item-toggle',(e) => {
      const item = e.detail.item;

      if(item.disabled) return;

      if(this.hasAttribute('single')){
        this.#items.forEach(i => {
          if(i.disabled) return;
          i.expanded = i === item ? !i.expanded : false;
        });
      }
      else{
        item.expanded = !item.expanded;
      }
    });
  }
}
customElements.define('ui-accordion',UIAccordion);