import {globalStyles,buttonStyle} from '../helpers/styles.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #text = '';
  #iconBefore = '';
  #iconAfter = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [globalStyles,buttonStyle];
  }

  static get observedAttributes(){
    return ['icon-before','icon-after','text'];
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
      if(block) block.setAttribute('icon',name);
    });
  }

  get text(){return this.#text;}
  set text(value){
    value = textNormalize(value);
    if(value){
      this.#text = value;
      this.#updateText('text',this.#text);
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
    ${this.#iconBefore && `<icon-block position="before" icon=""></icon-block>`}
    ${this.#text && `<div class="text"></div>`}
    ${this.#iconAfter && `<icon-block position="after" icon=""></icon-block>`}`;

    setTimeout(()=>this.setAttribute('transition','active'),0);
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon-before':this.iconBefore = newValue; break;
        case 'icon-after':this.iconAfter = newValue; break;
        case 'text':this.text = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);