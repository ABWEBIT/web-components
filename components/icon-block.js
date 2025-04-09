import {globalStyles,iconStyle} from '../helpers/styles.js';
import * as icons from '../helpers/icons.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #icon = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [globalStyles,iconStyle];
  }

  static get observedAttributes(){
    return ['icon'];
  }

  get icon(){return this.#icon;}
  set icon(value){
    value = textNormalize(value);
    if(value && variableName(value) && icons[value]){
      this.#icon = htmlEscape(value);
      queueMicrotask(()=>{
        let group = document.createElementNS('http://www.w3.org/2000/svg','g');
        group.innerHTML = icons[this.#icon];
        let svg = this.#shadow.querySelector('svg');
        if(svg) svg.replaceChildren(...group.children);
      });
    }
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
    `;

    setTimeout(()=>this.setAttribute('transition','active'),0);
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon':this.icon = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);