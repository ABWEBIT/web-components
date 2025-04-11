import {UIDividerStyles} from '../helpers/styles.js';

class UIDivider extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIDividerStyles];
  }

  connectedCallback(){
    this.setAttribute('orientation','vertical');
    const label = String(this.getAttribute('label') || '');

    if(label){
      this.#shadow.innerHTML = `
        <span>${label}</span>
      `;
    }
  }
}
customElements.define('ui-divider',UIDivider);