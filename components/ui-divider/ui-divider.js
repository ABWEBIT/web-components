import {UIBase,UIBaseStyle} from '../ui-base/index.js';
import {UIDividerStyle} from './ui-divider-style.js';

class UIDivider extends UIBase{
  #shadow;
  #label = '';

  static properties = Object.freeze({
    'label':{name:'label',type:String,reflect:true}
  });

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIDividerStyle];
  }

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('.label',this.#label);
    this.reflect('label',this.#label);
  }

  connectedCallback(){
    let axis = this.getAttribute('axis');
    axis = ['x','y'].includes(axis) ? axis : 'x';
    if(this.getAttribute('axis') !== axis) this.setAttribute('axis',axis);

    this.#shadow.innerHTML = this.#label ? `
      <div class="line"></div>
      <div class="label"></div>
      <div class="line"></div>
    `
    : `<div class="line"></div>`;
  }
}
customElements.define('ui-divider',UIDivider);