import {UIBase,UIBaseStyle} from '../ui-base/index.js';
import {UITextStyle} from './ui-text-style.js';

class UIText extends UIBase{
  #shadow;

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UITextStyle];
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
      <slot></slot>
    `;
  }

}
customElements.define('ui-text',UIText);