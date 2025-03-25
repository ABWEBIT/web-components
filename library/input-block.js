import uuid from '../helpers/uuid.js';

class InputBlock extends HTMLElement{
  #before = '';
  #after = '';
  #type = 'text';
  #types = ['text','password','email','url','search','tel'];
  #validator;
  #label = '';
  #hint = '';
  #placeholder = '';

  constructor(){
    super();
    this.#validator = this.validation.bind(this);
  }

  static get observedAttributes(){
    return ['before','after'];}

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

    this.#label = this.getAttribute('label');
    this.#hint = this.getAttribute('hint');
    this.#placeholder = this.getAttribute('placeholder');

    this.innerHTML = `
      ${this.#label ? `<text-block type="label">${this.#label}</text-block>` : ''}
      <wrapper-block>
      ${this.#before ? `<icon-block name="${this.#before}"></icon-block>` : ''}
      <input type="${this.#type}" placeholder="${this.#placeholder ? this.#placeholder : ''}">
      ${this.#after ? `<icon-block name="${this.#after}"></icon-block>` : ''}
      </wrapper-block>
      ${this.#hint ? `<text-block type="hint">${this.#hint}</text-block>` : ''}`;

    const input = this.querySelector('input');
    if(input) input.addEventListener('input', this.#validator);

    //this.setAttribute('data-uuid',uuid());
  }

  disconnectedCallback(){
    const input = this.querySelector('input');
    if(input) input.removeEventListener('input',this.#validator);
  }

  validation(){
    //console.log(this.querySelector('input').value.length);
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