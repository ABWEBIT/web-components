import {UIBase} from '../components/ui-base.js';
import {UIBaseStyle,UIDividerStyle} from '../helpers/styles.js';

class UIDivider extends UIBase{
  #shadow;
  #label = '';

  static properties = Object.freeze({
    'label':{name:'label',type: String,reflect:true}
  });
  
  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIDividerStyle];
  }

  get label(){return this.#label;}
  set label(value){
    value = String(value || '');
    if(value){
      this.#label = value;
      this.updateText('.label',this.#label);
      this.reflect('label',this.#label);
    }
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