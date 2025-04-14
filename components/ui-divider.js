import {UIComponentsStyle,UIDividerStyle} from '../helpers/styles.js';

class UIDivider extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  
  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIComponentsStyle,UIDividerStyle];
  }

  connectedCallback(){
    let axis = this.getAttribute('axis');
    axis = ['x','y'].includes(axis) ? axis : 'x';
    if(this.getAttribute('axis') !== axis) this.setAttribute('axis',axis);

    let label = String(this.getAttribute('label') || '');

    this.#shadow.innerHTML = label ? `
      <div class="line"></div>
      <div class="label"></div>
      <div class="line"></div>
    `
    : `<div class="line"></div>`;

    if(label){
      let obj = this.#shadow.querySelector('.label');
      if(obj) obj.textContent = label;
    }
  }
}
customElements.define('ui-divider',UIDivider);