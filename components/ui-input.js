import {UIBase} from '../components/ui-base.js';
import {UIBaseStyle,UIInputStyle} from '../helpers/styles.js';
import {textNormalize,variableName,inputTypes,htmlEscape,uuid} from '../helpers/utils.js';

class UIInput extends UIBase{
  #shadow;
  #placeholder = '';
  #iconLeft = '';
  #iconRight = '';
  #disabled = false;
  #inputHandler = this.onInput.bind(this);
  #inputClear = this.onClear.bind(this);

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIInputStyle];
  }

  static properties = Object.freeze({
    'icon-left':{name:'iconLeft',type: String,reflect:true},
    'icon-right':{name:'iconRight',type: String,reflect:true},
    'disabled':{name:'disabled',type: Boolean,reflect:true}
  });

  get placeholder(){return this.#placeholder;}
  set placeholder(value){
    if(!(this.#placeholder = String(value || ''))) return;
    this.updateText('.label',this.#placeholder);
    this.reflect('label',this.#placeholder);
  }

  get iconLeft(){return this.#iconLeft;}
  set iconLeft(value){
    if(!(this.#iconLeft = String(value || ''))) return;
    this.#updateIcon(':first-child',this.#iconLeft);
    this.reflect('icon-left',this.#iconLeft);
  }

  get iconRight(){return this.#iconRight;}
  set iconRight(value){
    if(!(this.#iconRight = String(value || ''))) return;
    this.#updateIcon(':last-child',this.#iconRight);
    this.reflect('icon-right',this.#iconRight);
  }

  #updateIcon(position,name){
    queueMicrotask(()=>{
      let obj = this.#shadow.querySelector(`ui-icon${position}`);
      if(!obj) return;
      obj.setAttribute('icon',name);
    });
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    ${this.#iconLeft && `<ui-icon></ui-icon>`}
    <input>
    <ui-button icon-left="clear"></ui-button>
    ${this.#iconRight && `<ui-icon></ui-icon>`}
    `;

    const inputObject = this.#shadow.querySelector('input');
    if(inputObject){
      inputObject.addEventListener('input',this.#inputHandler);

      let inputType = textNormalize(this.getAttribute('type'));
      inputType = inputTypes(inputType) ? inputType : 'text';
      inputObject.type = htmlEscape(inputType);
      
      let inputPlaceholder = htmlEscape(textNormalize(this.getAttribute('placeholder')));
      if(inputPlaceholder) inputObject.setAttribute('placeholder',inputPlaceholder);
      if(this.hasAttribute('required')) inputObject.required = true;
    }

    const inputClear = this.#shadow.querySelector('ui-button[icon-before="clear"]');
    if(inputClear){
      inputClear.addEventListener('click',this.#inputClear)
    }

    requestAnimationFrame(()=>this.setAttribute('transition','active'));
  }

  onInput(){
  }

  onClear(){
    const inputObject = this.#shadow.querySelector('input');
    if(inputObject) inputObject.value = '';
  }

  disconnectedCallback(){
    const inputObject = this.#shadow.querySelector('input');
    if(inputObject) inputObject.removeEventListener('input',this.#inputHandler);

    const inputClear = this.#shadow.querySelector('ui-button[icon-before="Clear"]');
    if(inputClear) inputClear.addEventListener('click',this.#inputClear);
  }

}
customElements.define('ui-input',UIInput);