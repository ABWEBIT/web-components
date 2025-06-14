import {UIBase} from '../ui-base/ui-base.js';

class UITextarea extends UIBase{
  #textarea = null;
  #required = false;
  #disabled = false;

  #onInput = this.onInput.bind(this);

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
    this.shape();

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

    this.#textarea.addEventListener('input',this.#onInput);
  }

  onInput(e){
    if(this.#disabled) return;
    this.doAction(e);
  }

  doAction(e){
    console.log(e.type);
  }

  disconnectedCallback(){
    if(this.#textarea){
      this.#textarea.removeEventListener('input',this.#onInput);
    }
  }

}
customElements.define('ui-textarea',UITextarea);