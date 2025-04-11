import {globalStyles,iconStyle} from '../helpers/styles.js';
import * as icons from '../helpers/icons.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class UIIcon extends HTMLElement{
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
        const svg = this.#shadow.querySelector('svg');
        if(svg){
          const parser = new DOMParser();
          const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${icons[this.#icon]}</svg>`,'image/svg+xml');
          const parsed = doc.querySelector('svg');
          if(parsed) svg.replaceChildren(...parsed.children);
        }
      });
    }
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
    `;

    requestAnimationFrame(()=>this.setAttribute('transition','active'));
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon':this.icon = newValue; break;
      }
    }
  }

}
customElements.define('ui-icon',UIIcon);