import {UIComponentsStyle,UIIconStyle} from '../helpers/styles.js';
import {icons} from '../helpers/icons.js';

class UIIcon extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #icon = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIComponentsStyle,UIIconStyle];
  }

  static get observedAttributes(){
    return ['icon'];
  }

  get icon(){return this.#icon;}
  set icon(value){
    value = String(value || '');
    let array = icons[value];

    if(array && array.length){
      let paths = array.map(d=>{
        let path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('d',d);
        return path;
      });      

      queueMicrotask(()=>{
        let svg = this.#shadow.querySelector('svg');
        if(svg) svg.replaceChildren(...paths);
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