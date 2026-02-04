import './accordion-item.js';

class UIAccordion extends HTMLElement{
  #single = false;
  #items = [];

  connectedCallback(){
    this.#single = this.hasAttribute('single');
    this.#items = [...this.querySelectorAll(':scope > ui-accordion-item')];

    this.addEventListener('accordion-item-toggle',(e) => {
      const item = e.detail.item;

      if(item.disabled) return;

      if(this.#single){
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