import {UIDividerStyles} from '../helpers/styles.js';
import {textNormalize} from '../helpers/utils.js';

class UIDivider extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  
  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIDividerStyles];
  }

  connectedCallback(){
    let label = textNormalize(this.getAttribute('label'));

    const axes = ['x','y'];
    let axis = textNormalize(this.getAttribute('axis'));
    axis = axes.includes(axis) ? axis : 'x';
    if(this.getAttribute('axis') !== axis) this.setAttribute('axis',axis);

    const height = parseInt(this.getAttribute('height'),10);
    if(height) this.style.height = `${height}px`;

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

/*
const alignments = ['left','right'];
let align = textNormalize(this.getAttribute('align'));
align = alignments.includes(align) ? align : '';
if(this.getAttribute('align') !== align && align) this.setAttribute('align',align);
*/