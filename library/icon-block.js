import * as symbols from './icons-pack.js';

class IconBlock extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
  }

  style(){
    return `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host,:host svg{position:relative;display:inline-flex;}

    :host{
      justify-content:center;
      width:20px;
      height:100%;}

    :host svg{
      width:20px;
      height:inherit;
      fill:var(--rgb-255-255-255);
      -webkit-user-select:none;
      user-select:none;
      shape-rendering:geometricPrecision;}
    </style>
    `;
  }

  html(){
    return `
      <svg viewBox="0 0 20 20">
        ${symbols.iconSearch}
      </svg>
    `;
  }

  connectedCallback(){
    this.shadowRoot.innerHTML = this.style()+this.html();
  }

  disconnectedCallback(){
  }

}
customElements.define('icon-block',IconBlock);