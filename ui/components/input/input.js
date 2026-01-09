import {inputTypes} from '../../utilities/index.js';

class UIInput extends HTMLElement{
  #listeners = null;
  #input = null;
  #clear = null;
  #iconInput = 'cross';
  #required = false;
  #disabled = false;
  #clearable = false;

  static properties = {
    required:{attribute:'required',type:Boolean,reflect:true},
    disabled:{attribute:'disabled',type:Boolean,reflect:true}
  };

  static get observedAttributes(){
    return ['required','disabled'];
  }

  get value(){return this.#input?.value ?? '';}
  set value(value){
    if(!this.#input) return;
    this.#input.value = String(value ?? '');
  }

  get required(){return this.#required;}
  set required(value){
    this.#required = value === true;
    if(this.#input) this.#input.required = this.#required;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    if(this.#input) this.#input.disabled = this.#disabled;
  }

  connectedCallback(){
    const fragment = document.createDocumentFragment();

    this.#input = this.querySelector('input');
    if(!this.#input.hasAttribute('type')){
      this.#input.setAttribute('type','text');
    }

    this.#clearable = this.hasAttribute('clearable');
    if(this.#clearable){
      this.#clear = document.createElement('ui-icon');
      this.#clear.setAttribute('icon',this.#iconInput);
      fragment.appendChild(this.#clear);
    }

    this.appendChild(fragment);

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    if(this.#clear) this.#clear.addEventListener('click',this.#onClear,{signal});
    if(this.#input) this.#input.addEventListener('input',this.#onInput,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #onInput = (e) =>{
    if(this.#disabled) return;
    this.#onAction(e);
  }

  #onClear = (e) =>{
    if(!this.#input) return;
    this.#input.value = '';
    //this.#input.focus();
  }

  #onAction = (e) =>{
    console.log(e.type);
  }
}
customElements.define('ui-input',UIInput);