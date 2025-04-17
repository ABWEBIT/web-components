import {UIBase} from '../components/ui-base.js';
import {UIBaseStyle,UIDividerStyle} from '../helpers/styles.js';

class UIDivider extends UIBase{
  #shadow = this.attachShadow({mode:'open'});
  
  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIDividerStyle];
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
      if(!obj) return;
      obj.textContent = label;
    }
  }
}
customElements.define('ui-divider',UIDivider);