import {UIBaseStyle} from '../helpers/styles.js';

class UIText extends HTMLElement{
  #shadow;

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle];
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <slot></slot>
    `;
  }

}
customElements.define('ui-text',UIText);