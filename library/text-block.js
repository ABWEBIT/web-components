import uuid from '../helpers/uuid.js';

class TextBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'closed'});

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host{
      --font-family:var(--font-family-default);
      --font-size:100%;
      --color:var(--rgb-255-255-255);}
    slot{
      position:relative;
      display:block;
      line-height:var(--line-height);
      font-family:var(--font-family);
      font-size:var(--font-size);
      color:var(--color);}
    </style>
    <slot></slot>
    `;
    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('text-block',TextBlock); 