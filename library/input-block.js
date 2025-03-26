//import uuid from '../helpers/uuid.js';

class InputBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #before = '';
  #after = '';
  #type = 'text';
  #types = ['text','password','email','url','search','tel'];
  #validator = this.validation.bind(this);
  #placeholder = '';

  static get observedAttributes(){return ['before','after'];}

  get _before(){return this.#before;}
  set _before(value){
    this.#before = this.#checkName(value) ? value : '';}

  get _after(){return this.#after;}
  set _after(value){
    this.#after = this.#checkName(value) ? value : '';}

  #checkName(name){
    return /^[A-Za-z][A-Za-z0-9]*$/.test(name);
  }

  connectedCallback(){
    const type = this.getAttribute('type');
    this.#type = this.#types.includes(type) ? type : 'text';
    this.#placeholder = this.getAttribute('placeholder');

    this.#shadow.innerHTML = `
      <style>
      :host *{box-sizing:border-box;outline:none;}
      :host{
        position:relative;
        display:inline-flex;
        vertical-align:middle;
        width:fit-content;
        height:40px;
        border:none;
        border-radius:var(--border-radius);
        overflow:hidden;
        background-color:rgb(25,25,25);
        transition:background-color 0.2s,color 0.2s;}

      :host > *{height:100%;}

      :host > input{
        flex-grow:1;
        width:100%;
        min-width:70px;
        padding:0 15px;
        border:none;
        color:rgb(255,255,255);
        font-size:90%;
        background-color:transparent;
        transition:color 0.2s;}

      :host > input::-ms-reveal{display:none;}

      :host > icon-block{
        width:35px;
        min-width:35px;}

      @media (hover:hover){
        :host(:hover),
        :host:has(> input:focus){
          background-color:rgb(35,35,35);}
        :host(:hover) > icon-block,
        :host:has(> input:focus) > icon-block{color:rgb(225,225,225);}
      }

      :host > icon-block:first-of-type{justify-content:end;}
      :host > icon-block:last-of-type{justify-content:start;}
      </style>
      ${this.#before ? `<icon-block name="${this.#before}"></icon-block>` : ''}
      <input type="${this.#type}" placeholder="${this.#placeholder ? this.#placeholder : ''}">
      ${this.#after ? `<icon-block name="${this.#after}"></icon-block>` : ''}`;

    const input = this.#shadow.querySelector('input');
    if(input) input.addEventListener('input', this.#validator);

    //this.setAttribute('data-uuid',uuid());
  }

  disconnectedCallback(){
    const input = this.#shadow.querySelector('input');
    if(input) input.removeEventListener('input',this.#validator);
  }

  validation(){
    console.log(this.#shadow.querySelector('input').value.length);
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'before':this._before = newValue; break;
        case 'after':this._after = newValue; break;
      }
    }
  }

}
customElements.define('input-block',InputBlock);