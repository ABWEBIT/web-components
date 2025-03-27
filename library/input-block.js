//import uuid from '../helpers/uuid.js';
import Validator from '../helpers/validation.js';

class InputBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #placeholder = '';
  #before = '';
  #after = '';
  #type = 'text';
  #types = ['text','password','email','url','search','tel'];
  #handler = this.operation.bind(this);

  static get observedAttributes(){return ['before','after'];}

  get _before(){return this.#before;}
  set _before(value){
    value = String(value || '').trim();
    this.#before = Validator.iconName(value) ? value : '';
    let block = this.#shadow.querySelector('icon-block[position="before"]');
    if(block && this.#before) block.setAttribute('name', this.#before);
  }

  get _after(){return this.#after;}
  set _after(value){
    value = String(value || '').trim();
    this.#after = Validator.iconName(value) ? value : '';
    let block = this.#shadow.querySelector('icon-block[position="after"]');
    if(block && this.#after) block.setAttribute('name',this.#after);
  }

  connectedCallback(){
    let type = this.getAttribute('type');
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
      color:rgb(175,175,175);
      background-color:rgb(25,25,25);
      transition:background-color 0.2s,color 0.2s;}

    :host > input{
      height:100%;
      flex-grow:1;
      width:100%;
      min-width:70px;
      padding-left:15px;
      padding-right:15px;
      border:none;
      color:rgb(255,255,255);
      font-size:90%;
      background-color:transparent;
      transition:color 0.2s;}

    :host > input::-ms-reveal{display:none;}

    :host > icon-block{
      height:100%;
      width:40px;
      min-width:40px;}

    @media (hover:hover){
      :host(:hover),
      :host:has(> input:focus){
        background-color:rgb(35,35,35);}
      :host(:hover) > icon-block,
      :host:has(> input:focus) > icon-block{color:rgb(225,225,225);}
    }

    :host:has(> icon-block:nth-child(2)) input{padding-left:0;}
    :host:has(> icon-block:nth-child(4)) input{padding-right:0;}
    </style>
    ${this.#before ? `<icon-block position="before" name="${this.#before}"></icon-block>` : ''}
    <input type="${this.#type}" placeholder="${this.#placeholder ? this.#placeholder : ''}">
    ${this.#after ? `<icon-block position="after" name="${this.#after}"></icon-block>` : ''}`;

    let input = this.#shadow.querySelector('input');
    if(input) input.addEventListener('input',this.#handler);

    //this.setAttribute('data-uuid',uuid());
  }

  disconnectedCallback(){
    let input = this.#shadow.querySelector('input');
    if(input) input.removeEventListener('input',this.#handler);
  }

  operation(){
    //console.log(this.#shadow.querySelector('input').value.length);
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