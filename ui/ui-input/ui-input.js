import {UIBase} from '../ui-base/ui-base.js';
import {inputTypes,htmlEscape} from '../../utils/index.js';

class UIInput extends UIBase{
  #input;
  #value = '';
  #disabled = false;
  #clearable = false;

  #onInput = this.onInput.bind(this);
  #onClear = this.onClear.bind(this);
  #onFocus = this.onFocus.bind(this);
  #onBlur = this.onBlur.bind(this);

  static properties = Object.freeze({
    'value':{name:'value',type:String},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#input) this.#input.disabled = this.#disabled;
  }

  get value(){return this.#value;}
  set value(value){
    if(!(this.#value = String(value ?? ''))) return;
    queueMicrotask(() => {
      if(this.#input) this.#input.value = this.#value;
    });
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();

    const fragment = document.createDocumentFragment();

    this.#input = document.createElement('input');
    fragment.appendChild(this.#input);

    this.#clearable = this.hasAttribute('clearable');

    if(this.#clearable){
      const icon = document.createElement('ui-icon');
      this.setAttributes(icon,{
        'icon': 'close'
      });
      icon.addEventListener('click',this.#onClear);
      fragment.appendChild(icon);
    }

    this.appendChild(fragment);

    this.#input.addEventListener('input',this.#onInput);
    this.#input.addEventListener('focus',this.#onFocus);
    this.#input.addEventListener('blur',this.#onBlur);

    const type = this.getAttribute('type') || 'text';
    this.#input.type = inputTypes(type) ? htmlEscape(type) : 'text';

    const placeholder = this.getAttribute('placeholder');
    if(placeholder) this.#input.placeholder = placeholder;

    this.#input.required = this.hasAttribute('required');
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
  }

  disconnectedCallback(){
    this.#input.removeEventListener('input',this.#onInput);
    this.#input.removeEventListener('focus',this.#onFocus);
    this.#input.removeEventListener('blur',this.#onBlur);

    const clear = this.querySelector('ui-icon[icon="clear"]');
    if(clear) clear.removeEventListener('click',this.#onClear);
  }

}
customElements.define('ui-input',UIInput);