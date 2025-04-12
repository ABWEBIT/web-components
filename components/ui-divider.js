import {UIDividerStyles} from '../helpers/styles.js';

class UIDivider extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  
  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIDividerStyles];
  }

  connectedCallback(){
    const types = ['blank','line'];
    let type = (this.getAttribute('type') || '').trim();
    type = types.includes(type) ? type : 'blank';
    this.setAttribute('type',type);

    const orientation = this.hasAttribute('horizontal');
    if(!orientation) this.setAttribute('horizontal','');

    const height = parseInt(this.getAttribute('height'),10);
    if(height) this.style.height = `${height}px`;

    const label = this.getAttribute('label');


    if(type === 'line' && !label){
      this.#shadow.innerHTML = '<span class="line"></span>';
    }
    else if(type === 'line' && label){
      this.#shadow.innerHTML = `
        ${type && `<span class="line"></span>`}
        <span class="label"></span>
        ${type && `<span class="line"></span>`}`;

        const obj = this.#shadow.querySelector('.label');
        obj.textContent = label;
    }

  }
}
customElements.define('ui-divider',UIDivider);