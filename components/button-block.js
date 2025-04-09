import {globalStyles,buttonStyle} from '../helpers/styles.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #buttonLabel = '';
  #iconBefore = '';
  #iconAfter = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [globalStyles,buttonStyle];
  }

  static get observedAttributes(){
    return ['icon-before','icon-after','label'];
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
      let block = this.#shadow.querySelector(`icon-block[position="${position}"]`);
      if(block) block.setAttribute('name',name);
    });
  }

  get buttonLabel(){return this.#buttonLabel;}
  set buttonLabel(value){
    value = textNormalize(value);
    if(value){
      this.#buttonLabel = value;
      this.#updateText('label',this.#buttonLabel);
    }
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`.${type}`);
      if(block) block.textContent = text;
    });
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    ${this.#iconBefore && `<icon-block position="before" name=""></icon-block>`}
    ${this.#buttonLabel && `<div class="label"></div>`}
    ${this.#iconAfter && `<icon-block position="after" name=""></icon-block>`}`;

    requestAnimationFrame(()=>this.setAttribute('transition','active'));
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon-before':this.iconBefore = newValue; break;
        case 'icon-after':this.iconAfter = newValue; break;
        case 'label':this.buttonLabel = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);