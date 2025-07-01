import {UIBase} from '../ui-base/ui-base.js';
import {inputTypes} from '../../utils/index.js';
import {icons} from '../../lib/icons.js';

class UIInput extends UIBase{
  #input = null;
  #clear = null;
  #iconInput = 'close';
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
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

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
      this.#clear = document.createElement('ui-icon');
      this.#clear.setAttribute('icon',this.#iconInput);

      this.#clear.addEventListener('click',this.#onClear);
      fragment.appendChild(this.#clear);
    }

    this.appendChild(fragment);

    this.#input.addEventListener('input',this.#onInput);
  }

  onInput(e){
    if(this.#disabled) return;
    this.doAction(e);
  }

  doAction(e){
    console.log(e.type);
  }

  onClear(){
    if(!this.#input) return;
    this.#input.value = '';
    //this.#input.focus();
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