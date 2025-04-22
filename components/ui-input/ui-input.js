import {UIBase,UIBaseStyle} from '../ui-base/index.js';
import {UIInputStyle} from './ui-input-style.js';
import {inputTypes,htmlEscape} from '../../utils/index.js';

class UIInput extends UIBase{
  #shadow;
  #input;
  #iconStart = '';
  #iconEnd = '';
  #disabled = false;

  #onInput = this.onInput.bind(this);
  #onClear = this.onClear.bind(this);
  #onFocus = this.onFocus.bind(this);
  #onBlur = this.onBlur.bind(this);

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIInputStyle];
  }

  static properties = Object.freeze({
    'icon-start':{name:'iconStart',type:String,reflect:true},
    'icon-end':{name:'iconEnd',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get iconStart(){return this.#iconStart;}
  set iconStart(value){
    if(!(this.#iconStart = String(value || ''))) return;
    this.#updateIcon('[leading]',this.#iconStart);
    this.reflect('icon-start',this.#iconStart);
  }

  get iconEnd(){return this.#iconEnd;}
  set iconEnd(value){
    if(!(this.#iconEnd = String(value || ''))) return;
    this.#updateIcon('[trailing]',this.#iconEnd);
    this.reflect('icon-end',this.#iconEnd);
  }

  #updateIcon(position,name){
    queueMicrotask(()=>{
      let obj = this.#shadow.querySelector(`ui-icon${position}`);
      if(!obj) return;
      obj.setAttribute('icon',name);
    });
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    const input = this.#shadow.querySelector('input');
    if(!input) return;
    if(this.#disabled) input.setAttribute('tabindex','-1');
    else input.removeAttribute('tabindex');
  }

  connectedCallback(){
    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.height = `${height}px`;
    this.style.setProperty('--height',`${height}px`);

    this.#shadow.innerHTML = `
    ${this.#iconStart && `<ui-icon leading></ui-icon>`}
    <input>
    <ui-icon icon="cancel"></ui-icon>
    ${this.#iconEnd && `<ui-icon trailing></ui-icon>`}
    `;

    requestAnimationFrame(()=>{
      this.setAttribute('animated','');
      this.#input = this.#shadow.querySelector('input');
      if(!this.#input) return;

      this.#input.addEventListener('input',this.#onInput);
      this.#input.addEventListener('focus',this.#onFocus);
      this.#input.addEventListener('blur',this.#onBlur);

      const type = this.getAttribute('type') || 'text';
      this.#input.type = inputTypes(type) ? htmlEscape(type) : 'text';

      const placeholder = this.getAttribute('placeholder') || '';
      if(placeholder) this.#input.setAttribute('placeholder',placeholder);

      if(this.hasAttribute('required')) this.#input.required = true;

      const clear = this.#shadow.querySelector('ui-icon[icon="cancel"]');
      if(clear) clear.addEventListener('click',this.#onClear);
    });
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

    const clear = this.#shadow.querySelector('ui-icon[icon="cancel"]');
    if(clear) clear.removeEventListener('click',this.#onClear);
  }

}
customElements.define('ui-input',UIInput);