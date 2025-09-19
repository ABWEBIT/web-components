import {UIBase} from '../ui-base.js';
import {inputTypes} from '../../utils/index.js';
import {icons} from '../../lib/icons.js';

class UIInput extends UIBase{
  #listeners = null;
  #input = null;
  #clear = null;
  #iconInput = 'close';
  #required = false;
  #disabled = false;
  #clearable = false;

  static properties = Object.freeze({
    'required':{name:'required',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get placeholder(){return this.#input?.placeholder ?? '';}
  set placeholder(value){
    if(!this.#input) return;
    this.#input.placeholder = String(value ?? '');
  }

  get type(){return this.#input?.type ?? 'text';}
  set type(value){
    if(!this.#input) return;
    this.#input.type = inputTypes(value) ? value : 'text';
  }

  get value(){return this.#input?.value ?? '';}
  set value(value){
    if(!this.#input) return;
    this.#input.value = String(value ?? '');
  }

  get required(){return this.#required;}
  set required(value){
    this.#required = value === true;
    this.reflect('required',this.#required);
    if(this.#input) this.#input.required = this.#required;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#input) this.#input.disabled = this.#disabled;
  }

  connectedCallback(){
    super.connectedCallback();

    const value = this.getAttribute('value') ?? '';
    const placeholder = this.getAttribute('placeholder') ?? '';
    const type = this.getAttribute('type') || 'text';
    this.removeAttribute('value');
    this.removeAttribute('placeholder');
    this.removeAttribute('type');

    const fragment = document.createDocumentFragment();
    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.#input = document.createElement('input');
    if(value) this.value = value;
    if(placeholder) this.placeholder = placeholder;
    this.#input.type = inputTypes(type) ? type : 'text';

    fragment.appendChild(this.#input);

    this.#clearable = this.hasAttribute('clearable');
    if(this.#clearable){
      this.#clear = document.createElement('ui-icon');
      this.#clear.setAttribute('icon',this.#iconInput);

      this.#clear.addEventListener('click',this.#onClear,{signal});
      fragment.appendChild(this.#clear);
    }

    this.appendChild(fragment);

    this.#input.addEventListener('input',this.#onInput,{signal});
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

  #onClear = (e) =>{
    if(!this.#input) return;
    this.#input.value = '';
    //this.#input.focus();
  }

}
customElements.define('ui-input',UIInput);