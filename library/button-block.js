import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

const buttonBlockCSS = new CSSStyleSheet();
buttonBlockCSS.replaceSync(`
:host *{box-sizing:border-box;outline:none;}
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
  user-select:none;
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
  :host(:hover),
  :host(:hover) > icon-block{color:rgb(225,225,225);}
  :host(:hover){background-color:rgb(35,35,35);}
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

  static get observedAttributes(){return ['icon-before','icon-after','text'];}

  get _iconBefore(){return this.#iconBefore;}
  set _iconBefore(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconBefore = value;
      this.#updateIcon('before',this.#iconBefore);
    }
  }

  get _iconAfter(){return this.#iconAfter;}
  set _iconAfter(value){
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

  get _text(){return this.#text;}
  set _text(value){
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
    this.#shadow.adoptedStyleSheets = [buttonBlockCSS];
    this.#shadow.innerHTML = `
    ${this.#iconBefore && `<icon-block position="before" icon=""></icon-block>`}
    ${this.#text && `<div class="text"></div>`}
    ${this.#iconAfter && `<icon-block position="after" icon=""></icon-block>`}`;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon-before':this._iconBefore = newValue; break;
        case 'icon-after':this._iconAfter = newValue; break;
        case 'text':this._text = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);