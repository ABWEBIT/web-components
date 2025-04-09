import {globalStyles,iconStyle} from '../helpers/styles.js';
import * as icons from '../helpers/icons.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #name = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [globalStyles,iconStyle];
  }

  static get observedAttributes(){
    return ['name'];
  }

  get name(){return this.#name;}
  set name(value){
    value = textNormalize(value);
    if(value && variableName(value) && icons[value]){
      this.#name = htmlEscape(value);
      queueMicrotask(()=>{
        const svg = this.#shadow.querySelector('svg');
        if(svg){
          const parser = new DOMParser();
          const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${icons[this.#name]}</svg>`,'image/svg+xml');
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
        case 'name':this.name = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);