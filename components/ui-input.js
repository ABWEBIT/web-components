import {globalStyles,inputStyle} from '../helpers/styles.js';
import {textNormalize,variableName,inputTypes,htmlEscape,uuid} from '../helpers/utils.js';

class UIInput extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #hint = '';
  #iconBefore = '';
  #iconAfter = '';
  #inputHandler = this.onInput.bind(this);
  #inputClear = this.onClear.bind(this);

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [globalStyles,inputStyle];
  }

  static get observedAttributes(){
    return ['label','hint','icon-before','icon-after'];
  }

  get label(){return this.#label;}
  set label(value){
    value = textNormalize(value);
    if(value){
      this.#label = value;
      this.#updateText('label',this.#label);
    }
  }

  get hint(){return this.#hint;}
  set hint(value){
    value = textNormalize(value);
    if(value){
      this.#hint = value;
      this.#updateText('hint',this.#hint);
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

  get iconBefore(){return this.#iconBefore;}
  set iconBefore(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconBefore = value;
      this.#updateIcon('before',this.#iconBefore);
    }
  }

  get iconAfter(){return this.#iconAfter;}
  set iconAfter(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconAfter = value;
      this.#updateIcon('after',this.#iconAfter);
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
    ${this.#label && `<span class="label"></span>`}
    <div class="block">
    ${this.#iconBefore && `<ui-icon position="before" icon=""></ui-icon>`}
    <input type="">
    <ui-button icon-before="clear"></ui-button>
    ${this.#iconAfter && `<ui-icon position="after" icon=""></ui-icon>`}
    </div>
    ${this.#hint && `<span class="hint"></span>`}`;

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
      else hintBlock.textContent = this.#hint;
    }
  }

  onClear(){
    const inputObject = this.#shadow.querySelector('input');
    if(inputObject) inputObject.value = '';
    let hintBlock = this.#shadow.querySelector('.hint');
    if(hintBlock) hintBlock.textContent = this.#hint;
  }

  disconnectedCallback(){
    const inputObject = this.#shadow.querySelector('input');
    if(inputObject) inputObject.removeEventListener('input',this.#inputHandler);

    const inputClear = this.#shadow.querySelector('ui-button[icon-before="Clear"]');
    if(inputClear) inputClear.addEventListener('click',this.#inputClear);
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'label':this.label = newValue; break;
        case 'hint':this.hint = newValue; break;
        case 'icon-before':this.iconBefore = newValue; break;
        case 'icon-after':this.iconAfter = newValue; break;
      }
    }
  }

}
customElements.define('ui-input',UIInput);