import uuid from '../helpers/uuid.js';

class TextBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{
      position:relative;
      display:block;
      flex-grow:1;}
    </style>
    <slot></slot>
    `;
    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('text-block',TextBlock); 