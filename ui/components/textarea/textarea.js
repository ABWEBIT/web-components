import {UIBase} from '../../base.js';

class UITextarea extends UIBase{
  #listeners = null;
  #textarea = null;
  #required = false;
  #disabled = false;

  static properties = Object.freeze({
    'required':{name:'required',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get placeholder(){return this.#textarea?.placeholder ?? '';}
  set placeholder(value){
    if(!this.#textarea) return;
    this.#textarea.placeholder = String(value ?? '');
  }

  get value(){return this.#textarea?.value ?? '';}
  set value(value){
    if(!this.#textarea) return;
    this.#textarea.value = String(value ?? '');
  }

  get required(){return this.#required;}
  set required(value){
    this.#required = value === true;
    this.reflect('required',this.#required);
    if(this.#textarea) this.#textarea.required = this.#required;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#textarea) this.#textarea.disabled = this.#disabled;
  }

  connectedCallback(){
    super.connectedCallback();

    const value = this.getAttribute('value') ?? '';
    const placeholder = this.getAttribute('placeholder') ?? '';
    this.removeAttribute('value');
    this.removeAttribute('placeholder');

    const fragment = document.createDocumentFragment();

    this.#textarea = document.createElement('textarea');
    if(value) this.value = value;
    if(placeholder) this.placeholder = placeholder;

    fragment.appendChild(this.#textarea);

    this.appendChild(fragment);

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.#textarea.addEventListener('input',this.#onInput,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #onInput = (e) =>{
    if(this.#disabled) return;
    this.#onAction(e);
  }

  #onAction = (e) =>{
    console.log(e.type);
  }

}
customElements.define('ui-textarea',UITextarea);