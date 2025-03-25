import uuid from '../helpers/uuid.js';

class InputBlock extends HTMLElement{
  #before = '';
  #after = '';
  #type = 'text';
  #types = ['text','password','email','url','search','tel'];

  constructor(){
    super();
    this.validator = this.validation.bind(this);
  }

  static get observedAttributes(){
    return ['before','after','type'];
  }

  get _before(){return this.#before;}
  set _before(value){
    this.#before = this.#checkName(value) ? value : '';}

  get _after(){return this.#after;}
  set _after(value){
    this.#after = this.#checkName(value) ? value : '';}

  get _type(){return this.#type;}
  set _type(value){
    this.#type = this.#types.includes(value) ? value : 'text';}

  #checkName(name) {
    return /^[A-Za-z][A-Za-z0-9]*$/.test(name);
  }

  connectedCallback(){
    this.innerHTML = `
      ${this.#before ? `<icon-block name="${this.#before}"></icon-block>` : ''}
      <input type="${this.#type}">
      ${this.#after ? `<icon-block name="${this.#after}"></icon-block>` : ''}`;

    this.querySelector('input').addEventListener('input',this.validator);

    //this.setAttribute('data-uuid',uuid());
  }

  disconnectedCallback(){
    this.querySelector('input').removeEventListener('input',this.validator);
  }

  validation(){
    console.log(this.querySelector('input').value.length);
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'before':this._before = newValue; break;
        case 'after':this._after = newValue; break;
        case 'type':this._type = newValue; break;
      }
    }
  }

}
customElements.define('input-block',InputBlock);