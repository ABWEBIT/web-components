import {UISpacingStyles} from '../helpers/styles.js';

class UISpacing extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UISpacingStyles];
  }

  connectedCallback(){
    this.setAttribute('orientation','vertical');
    const height = parseInt(this.getAttribute('height'),10);
    if(height) this.style.height = `${height}px`;
  }
}
customElements.define('ui-spacing',UISpacing);