import {UIBase} from '../ui-base/ui-base.js';
import {htmlEscape} from '../../utils/index.js';

class UITextarea extends UIBase{
  #textarea;
  #value = '';
  #disabled = false;

  #onInput = this.onInput.bind(this);
  #onFocus = this.onFocus.bind(this);
  #onBlur = this.onBlur.bind(this);

  static properties = Object.freeze({
    'value':{name:'value',type:String},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get value(){return this.#value;}
  set value(value){
    if(!(this.#value = String(value || ''))) return;
    if(this.#textarea) this.#textarea.value = this.#value;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#textarea) this.#textarea.disabled = this.#disabled;
  }

  connectedCallback(){
    super.connectedCallback();
    this.replaceChildren();
    this.shape();

    const fragment = document.createDocumentFragment();

    this.#textarea = document.createElement('textarea');
    fragment.appendChild(this.#textarea);

    this.appendChild(fragment);

    this.#textarea.addEventListener('input',this.#onInput);
    this.#textarea.addEventListener('focus',this.#onFocus);
    this.#textarea.addEventListener('blur',this.#onBlur);

    const placeholder = this.getAttribute('placeholder');
    if(placeholder) this.#textarea.placeholder = placeholder;

    this.#textarea.required = this.hasAttribute('required');
  }

  onInput(){
    if(this.#disabled) return;
  }

  onFocus(){
    this.setAttribute('focused','');
  }

  onBlur(){
    this.removeAttribute('focused');
  }

  doAction(e){
    console.log(e.type);
  }

  disconnectedCallback(){
    this.#textarea.removeEventListener('input',this.#onInput);
    this.#textarea.removeEventListener('focus',this.#onFocus);
    this.#textarea.removeEventListener('blur',this.#onBlur);
  }

}
customElements.define('ui-textarea',UITextarea);