import {globalStyles} from '../helpers/styles.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class TextBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [globalStyles];
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <slot></slot>
    `;
  }

}
customElements.define('text-block',TextBlock);