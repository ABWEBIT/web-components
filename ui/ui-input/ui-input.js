import {UIBase} from '../ui-base/ui-base.js';
import {inputTypes} from '../../utils/index.js';

class UIInput extends UIBase{
  #input = null;
  #clear = null;
  #required = false;
  #disabled = false;
  #clearable = false;

  #onInput = this.onInput.bind(this);
  #onClear = this.onClear.bind(this);

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
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#input) this.#input.disabled = this.#disabled;
    if(this.#disabled) this.removeAttribute('focused');
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();

    const value = this.getAttribute('value') ?? '';
    const placeholder = this.getAttribute('placeholder') ?? '';
    const type = this.getAttribute('type') || 'text';
    this.removeAttribute('value');
    this.removeAttribute('placeholder');
    this.removeAttribute('type');

    const fragment = document.createDocumentFragment();

    this.#input = document.createElement('input');
    if(value) this.value = value;
    if(placeholder) this.placeholder = placeholder;
    this.#input.type = inputTypes(type) ? type : 'text';

    fragment.appendChild(this.#input);

    this.#clearable = this.hasAttribute('clearable');
    if(this.#clearable){
      this.#clear = document.createElementNS('http://www.w3.org/2000/svg','svg');
      this.#clear.setAttribute('viewBox','0 0 24 24');

      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d','M13.414,12l6.293-6.293c.391-.391.391-1.023,0-1.414s-1.023-.391-1.414,0l-6.293,6.293-6.293-6.293c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l6.293,6.293-6.293,6.293c-.391.391-.391,1.023,0,1.414.195.195.451.293.707.293s.512-.098.707-.293l6.293-6.293,6.293,6.293c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023,0-1.414l-6.293-6.293Z');

      this.#clear.appendChild(path);

      this.#clear.addEventListener('click',this.#onClear);
      fragment.appendChild(this.#clear);
    }

    this.appendChild(fragment);

    this.#input.addEventListener('input',this.#onInput);
  }

  onInput(){
    if(this.#disabled) return;
  }

  onClear(){
    if(!this.#input) return;
    this.#input.value = '';
    this.#input.focus();
  }

  disconnectedCallback(){
    if(this.#input){
      this.#input.removeEventListener('input',this.#onInput);
    }

    if(this.#clear){
      this.#clear.removeEventListener('click',this.#onClear);
    }
  }

}
customElements.define('ui-input',UIInput);