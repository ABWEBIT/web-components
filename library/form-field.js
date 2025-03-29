//import uuid from '../helpers/uuid.js';
import Validator from '../helpers/validation.js';

class FormField extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #hint = '';

  static get observedAttributes(){return ['label','hint'];}

  get _label(){return this.#label;}
  set _label(value){
    value = String(value || '').trim();
    this.#label = Validator.text(value) ? value : '';
    this.#updateText('label',this.#label);
  }

  get _hint(){return this.#hint;}
  set _hint(value){
    value = String(value || '').trim();
    this.#hint = Validator.text(value) ? value : '';
    this.#updateText('hint',this.#hint);
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`text-block[type="${type}"]`);
      if(block) block.textContent = text;
    });
  }

  connectedCallback(){
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
    ${this.#label ? `<text-block type="label"></text-block>` : ''}
    <slot></slot>
    ${this.#hint ? `<text-block type="hint"></text-block>` : ''}`;

    //this.setAttribute('data-uuid',uuid());
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'label':this._label = newValue; break;
        case 'hint':this._hint = newValue; break;
      }
    }
  }

}
customElements.define('form-field',FormField);