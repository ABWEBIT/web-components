//import uuid from '../helpers/uuid.js';

class FormField extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #hint = '';

  connectedCallback(){
    this.#label = this.getAttribute('label') || '';
    this.#hint = this.getAttribute('hint') || '';

    this.#shadow.innerHTML = `
    <style>
    :host{
      position:relative;
      display:inline-flex;
      flex-direction:column;
      width:fit-content;
      row-gap:3px;}

    :host > text-block[type="label"],
    :host > text-block[type="hint"]{
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;}

    :host > text-block[type="label"]{
      font-size:90%;
      color:rgb(255,255,255);}

    :host > text-block[type="hint"]{
      font-size:80%;
      color:rgb(150,150,150);}
    </style>
    ${this.#label ? `<text-block type="label">${this.#label}</text-block>` : ''}
    <slot></slot>
    ${this.#hint ? `<text-block type="hint">${this.#hint}</text-block>` : ''}`;

    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('form-field',FormField);