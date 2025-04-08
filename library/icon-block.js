import * as icons from '../helpers/icons.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

const iconBlockCSS = new CSSStyleSheet();
iconBlockCSS.replaceSync(`
:host,:host *{
  box-sizing:border-box;
  outline:none;}

:host{
  position:relative;
  display:inline-flex;
  width:fit-content;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
  transition:color 0.2s;
  -webkit-user-select:none;
  user-select:none;}

:host > svg{
  width:20px;
  height:20px;
  fill:currentColor;
  shape-rendering:geometricPrecision;
  pointer-events:none;}
`);

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #icon = '';

  static get observedAttributes(){
    return ['icon'];
  }

  get _icon(){return this.#icon;}
  set _icon(value){
    value = textNormalize(value);
    if(value && variableName(value) && icons[value]){
      this.#icon = htmlEscape(value);
      queueMicrotask(()=>{
        let temp = document.createElementNS("http://www.w3.org/2000/svg", "g");
        temp.innerHTML = icons[this.#icon];
        let svg = this.#shadow.querySelector('svg');
        if(svg) svg.replaceChildren(...temp.children);
      });
    }
  }

  connectedCallback(){
    this.#shadow.adoptedStyleSheets = [iconBlockCSS];
    this.#shadow.innerHTML = `
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon':this._icon = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);