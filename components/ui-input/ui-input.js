import {UIBase,UIBaseStyle} from '../ui-base/index.js';
import {UIInputStyle} from './ui-input-style.js';
import {inputTypes,htmlEscape} from '../../utils/index.js';

class UIInput extends UIBase{
  #shadow;
  #placeholder = '';
  #iconStart = '';
  #iconEnd = '';
  #disabled = false;
  #onInput = this.onInput.bind(this);
  #onClear = this.onClear.bind(this);

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIInputStyle];
  }

  static properties = Object.freeze({
    'icon-start':{name:'iconStart',type: String,reflect:true},
    'icon-end':{name:'iconEnd',type: String,reflect:true},
    'disabled':{name:'disabled',type: Boolean,reflect:true}
  });

  get placeholder(){return this.#placeholder;}
  set placeholder(value){
    if(!(this.#placeholder = String(value || ''))) return;
    this.updateText('.label',this.#placeholder);
    this.reflect('label',this.#placeholder);
  }

  get iconStart(){return this.#iconStart;}
  set iconStart(value){
    if(!(this.#iconStart = String(value || ''))) return;
    this.#updateIcon('[icon-start]',this.#iconStart);
    this.reflect('icon-start',this.#iconStart);
  }

  get iconEnd(){return this.#iconEnd;}
  set iconEnd(value){
    if(!(this.#iconEnd = String(value || ''))) return;
    this.#updateIcon('[icon-end]',this.#iconEnd);
    this.reflect('icon-end',this.#iconEnd);
  }

  #updateIcon(position,name){
    queueMicrotask(()=>{
      let obj = this.#shadow.querySelector(`ui-icon${position}`);
      if(!obj) return;
      obj.setAttribute('icon',name);
    });
  }

  connectedCallback(){
    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.height = `${height}px`;
    this.style.setProperty('--height',`${height}px`);

    this.#shadow.innerHTML = `
    ${this.#iconStart && `<ui-icon icon-start></ui-icon>`}
    <input>
    <ui-icon icon="cancel"></ui-icon>
    ${this.#iconEnd && `<ui-icon icon-end></ui-icon>`}
    `;

    const obj = this.#shadow.querySelector('input');
    if(obj){
      obj.addEventListener('input',this.#onInput);

      let inputType =this.getAttribute('type');
      inputType = inputTypes(inputType) ? inputType : 'text';
      obj.type = htmlEscape(inputType);
      
      let placeholder = htmlEscape(this.getAttribute('placeholder'));
      if(placeholder) obj.setAttribute('placeholder',placeholder);
      if(this.hasAttribute('required')) obj.required = true;
    }

    const inputClear = this.#shadow.querySelector('ui-icon[icon="cancel"]');
    if(inputClear) inputClear.addEventListener('click',this.#onClear)

    requestAnimationFrame(()=>this.setAttribute('animated',''));
  }

  onInput(){
  }

  onClear(){
    const obj = this.#shadow.querySelector('input');
    if(!obj) return;
    obj.value = '';
  }

  disconnectedCallback(){
    const obj = this.#shadow.querySelector('input');
    if(obj) obj.removeEventListener('input',this.#onInput);

    const inputClear = this.#shadow.querySelector('ui-button[icon-before="Clear"]');
    if(inputClear) inputClear.addEventListener('click',this.#onClear);
  }

}
customElements.define('ui-input',UIInput);