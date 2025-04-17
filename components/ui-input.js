import {UIBase} from '../components/ui-base.js';
import {UIBaseStyle,UIInputStyle} from '../helpers/styles.js';
import {textNormalize,variableName,inputTypes,htmlEscape,uuid} from '../helpers/utils.js';

class UIInput extends UIBase{
  #shadow = this.attachShadow({mode:'open'});
  #placeholder = '';
  #iconLeft = '';
  #iconRight = '';
  #disabled = false;
  #inputHandler = this.onInput.bind(this);
  #inputClear = this.onClear.bind(this);

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIInputStyle];
  }

  static properties = Object.freeze({
    'icon-left':{name:'iconLeft',type: String,reflect:true},
    'icon-right':{name:'iconRight',type: String,reflect:true},
    'disabled':{name:'disabled',type: Boolean,reflect:true}
  });

  get placeholder(){return this.#placeholder;}
  set placeholder(value){
    value = String(value || '');
    if(value){
      this.#placeholder = value;
      this.#updateText('placeholder',this.#placeholder);
      this.reflect('placeholder',this.#placeholder);
    }
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`.${type}`);
      if(block){
        let asterisk = '';
        if(this.hasAttribute('required') && type === 'label') asterisk = ' *';
        block.textContent = text+asterisk;
      }
    });
  }

  get iconLeft(){return this.#iconLeft;}
  set iconLeft(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconLeft = value;
      this.#updateIcon('before',this.#iconLeft);
    }
  }

  get iconRight(){return this.#iconRight;}
  set iconRight(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconRight = value;
      this.#updateIcon('after',this.#iconRight);
    }
  }

  #updateIcon(position,name){
    name = htmlEscape(name);
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`ui-icon[position="${position}"]`);
      if(block) block.setAttribute('icon',name);
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
    const hintBlock = this.#shadow.querySelector('.hint');
    if(hintBlock){
      let inputLength = this.#shadow.querySelector('input').value.length;
      if(inputLength > 0) hintBlock.textContent = inputLength;
    }
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