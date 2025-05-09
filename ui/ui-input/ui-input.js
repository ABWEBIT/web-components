import {UIBase} from '../ui-base/ui-base.js';
import {inputTypes,htmlEscape} from '../../utils/index.js';

class UIInput extends UIBase{
  #input;
  #iconLeading = '';
  #iconTrailing = '';
  #disabled = false;
  #clearable = false;

  #onInput = this.onInput.bind(this);
  #onClear = this.onClear.bind(this);
  #onFocus = this.onFocus.bind(this);
  #onBlur = this.onBlur.bind(this);

  static properties = Object.freeze({
    'icon-leading':{name:'iconLeading',type:String,reflect:true},
    'icon-trailing':{name:'iconTrailing',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get iconLeading(){return this.#iconLeading;}
  set iconLeading(value){
    if(!(this.#iconLeading = String(value || ''))) return;
    this.updateIcon('[leading]',this.#iconLeading);
    this.reflect('icon-leading',this.#iconLeading);
  }

  get iconTrailing(){return this.#iconTrailing;}
  set iconTrailing(value){
    if(!(this.#iconTrailing = String(value || ''))) return;
    this.updateIcon('[trailing]',this.#iconTrailing);
    this.reflect('icon-trailing',this.#iconTrailing);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.tabindex();
  }

  connectedCallback(){
    super.connectedCallback();
    this.setAttribute('animated','');

    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.#clearable = this.hasAttribute('clearable');

    this.innerHTML = `
      ${this.#iconLeading ? '<ui-icon leading></ui-icon>' : ''}
      <input>
      ${this.#clearable ? '<ui-icon icon="cancel"></ui-icon>' : ''}
      ${this.#iconTrailing ? '<ui-icon trailing></ui-icon>' : ''}
    `;

    requestAnimationFrame(()=>{

      this.#input = this.querySelector('input');
      if(!this.#input) return;
      this.tabindex();
      this.#input.addEventListener('input',this.#onInput);
      this.#input.addEventListener('focus',this.#onFocus);
      this.#input.addEventListener('blur',this.#onBlur);

      const type = this.getAttribute('type') || 'text';
      this.#input.type = inputTypes(type) ? htmlEscape(type) : 'text';

      const placeholder = this.getAttribute('placeholder') || '';
      if(placeholder) this.#input.setAttribute('placeholder',placeholder);

      if(this.hasAttribute('required')) this.#input.required = true;

      const clear = this.querySelector('ui-icon[icon="cancel"]');
      if(clear) clear.addEventListener('click',this.#onClear);
    });
  }

  tabindex(){
    if(!this.#input) return;
    if(this.#disabled) this.#input.setAttribute('tabindex','-1');
    else this.#input.removeAttribute('tabindex');
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
    if(this.#input){
      this.#input.removeEventListener('input',this.#onInput);
      this.#input.removeEventListener('focus',this.#onFocus);
      this.#input.removeEventListener('blur',this.#onBlur);
    }

    const clear = this.querySelector('ui-icon[icon="cancel"]');
    if(clear) clear.removeEventListener('click',this.#onClear);
  }

}
customElements.define('ui-input',UIInput);