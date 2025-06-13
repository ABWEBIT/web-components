import {UIBase} from '../ui-base/ui-base.js';
import {inputTypes} from '../../utils/index.js';

class UIInput extends UIBase{
  #input;
  #clear = null;
  #disabled = false;
  #clearable = false;

  #onInput = this.onInput.bind(this);
  #onClear = this.onClear.bind(this);
  #onFocus = this.onFocus.bind(this);
  #onBlur = this.onBlur.bind(this);

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get value(){return this.#input?.value ?? '';}
  set value(value){
    if(!this.#input) return;
    this.#input.value = String(value ?? '');
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
    if(placeholder) this.#input.placeholder = placeholder;
    this.#input.type = inputTypes(type) ? type : 'text';
    this.#input.required = this.hasAttribute('required');

    fragment.appendChild(this.#input);

    this.#clearable = this.hasAttribute('clearable');
    if(this.#clearable){
      this.#clear = document.createElement('ui-icon');
      this.setAttributes(this.#clear,{
        'icon': 'close'
      });
      this.#clear.addEventListener('click',this.#onClear);
      fragment.appendChild(this.#clear);
    }

    this.appendChild(fragment);

    this.#input.addEventListener('input',this.#onInput);
    this.#input.addEventListener('focus',this.#onFocus);
    this.#input.addEventListener('blur',this.#onBlur);
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

  onClear(){
    if(!this.#input) return;
    this.#input.value = '';
    this.#input.focus();
  }

  disconnectedCallback(){
    if(this.#input){
      this.#input.removeEventListener('input',this.#onInput);
      this.#input.removeEventListener('focus',this.#onFocus);
      this.#input.removeEventListener('blur',this.#onBlur);
    }

    if(this.#clear){
      this.#clear.removeEventListener('click',this.#onClear);
    }
  }

}
customElements.define('ui-input',UIInput);