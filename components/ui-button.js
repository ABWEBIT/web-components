import {UIComponentsStyles,UIButtonStyle} from '../helpers/styles.js';
import {variableName,htmlEscape,elementSize} from '../helpers/utils.js';

class UIButton extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #iconBefore = '';
  #iconAfter = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIComponentsStyles,UIButtonStyle];
  }

  static get observedAttributes(){
    return ['icon-before','icon-after','label'];
  }

  get iconBefore(){return this.#iconBefore;}
  set iconBefore(value){
    value = String(value || '');
    if(value && variableName(value)){
      this.#iconBefore = value;
      this.#updateIcon('before',this.#iconBefore);
    }
  }

  get iconAfter(){return this.#iconAfter;}
  set iconAfter(value){
    value = String(value || '');
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

  get label(){return this.#label;}
  set label(value){
    value = String(value || '');
    if(value){
      this.#label = value;
      this.#updateText('label',this.#label);
    }
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`.${type}`);
      if(block) block.textContent = text;
    });
  }

  connectedCallback(){
    let size = this.getAttribute('size');
    size = elementSize(size) ? size : 'large';
    if(this.getAttribute('size') !== size) this.setAttribute('size',size);

    this.#shadow.innerHTML = `
    ${this.#iconBefore && `<ui-icon position="before" icon=""></ui-icon>`}
    ${this.#label && `<div class="label"></div>`}
    ${this.#iconAfter && `<ui-icon position="after" icon=""></ui-icon>`}`;

    requestAnimationFrame(()=>this.setAttribute('transition','active'));
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon-before':this.iconBefore = newValue; break;
        case 'icon-after':this.iconAfter = newValue; break;
        case 'label':this.label = newValue; break;
      }
    }
  }

}
customElements.define('ui-button',UIButton);