import {UIComponentsStyle} from '../helpers/styles.js';

class UIText extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIComponentsStyle];
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <slot></slot>
    `;
  }

}
customElements.define('ui-text',UIText);