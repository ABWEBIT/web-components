import {UIDividerStyles} from '../helpers/styles.js';
import {textNormalize} from '../helpers/utils.js';

class UIDivider extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  
  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIDividerStyles];
  }

  connectedCallback(){
    const axes = ['x','y'];
    let axis = textNormalize(this.getAttribute('axis'));
    axis = axes.includes(axis) ? axis : 'x';
    this.setAttribute('axis',axis);

    const types = ['blank','line'];
    let type = textNormalize(this.getAttribute('type'));
    type = types.includes(type) ? type : 'blank';
    this.setAttribute('type',type);

    const height = parseInt(this.getAttribute('height'),10);
    if(height) this.style.height = `${height}px`;

    const label = textNormalize(this.getAttribute('label'));


    if(type === 'line' && !label){
      this.#shadow.innerHTML = '<div class="line"></div>';
    }
    else if(type === 'line' && label){
      this.#shadow.innerHTML = `
        <div class="line"></div>
        <div class="label"></div>
        <div class="line"></div>`;

        const obj = this.#shadow.querySelector('.label');
        obj.textContent = label;
    }

  }
}
customElements.define('ui-divider',UIDivider);