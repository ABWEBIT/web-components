import {globalStyles} from '../helpers/styles.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

const buttonStyle = new CSSStyleSheet();
buttonStyle.replaceSync(`
:host{
  position:relative;
  display:inline-flex;
  vertical-align:middle;
  align-items:center;
  width:fit-content;
  height:40px;
  min-height:40px;
  border:none;
  border-radius:var(--border-radius);
  overflow:hidden;
  color:rgb(175,175,175);
  background-color:rgb(25,25,25);
  cursor:pointer;
  -webkit-user-select:none;
  user-select:none;}

:host([transition="active"]){
  transition:background-color 0.2s,color 0.2s;}

:host > .text{
  text-align:center;
  font-size:95%;
  padding-left:15px;
  padding-right:15px;
  flex-grow:1;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;}

:host > icon-block{
  height:100%;
  width:40px;
  min-width:40px;}

:host::after{
  position:absolute;
  display:block;
  inset:0;
  content:'';
  border:none;
  border-radius:var(--border-radius);}

@media (hover:hover){
  :host(:hover){
    background-color:rgb(35,35,35);
    color:rgb(225,225,225);}  
}

:host(:active){
  background-color:rgb(45,45,45);}

:host:has(> icon-block[position="before"]) .text{padding-left:0;}
:host:has(> icon-block[position="after"]) .text{padding-right:0;}
`);

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

  #updateIcon(position,iconName){
    iconName = htmlEscape(iconName);
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`icon-block[position="${position}"]`);
      if(block) block.setAttribute('icon',iconName);
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

  #updateText(type,value){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`.${type}`);
      if(block) block.textContent = value;
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