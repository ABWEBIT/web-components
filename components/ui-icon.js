import {UIBase} from '../components/ui-base.js';
import {UIBaseStyle,UIIconStyle} from '../helpers/styles.js';
import {icons} from '../helpers/icons.js';

class UIIcon extends UIBase{
  #shadow;
  #icon = '';

  static #viewBox = '0 0 20 20';
  static #xmlns = 'http://www.w3.org/2000/svg';
  static #dRegex = /^[MmLlHhVvCcSsQqTtAaZz0-9\s.,-]+$/;

  static properties = Object.freeze({
    'icon':{name:'icon',type:String,reflect:true}
  });

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIIconStyle];
  }

  get icon(){return this.#icon;}
  set icon(value){
    this.#icon = String(value || '');
    const array = icons?.[this.#icon];

    if(!Array.isArray(array)) return;
    if(!array.every(d => typeof d === 'string')) return;

    const paths = array
    .filter(d=>UIIcon.#dRegex.test(d))
    .map(d=>{
      const path = document.createElementNS(`${UIIcon.#xmlns}`,'path');
      path.setAttribute('d',d);
      return path;
    });      

    queueMicrotask(()=>{
      const svg = this.#shadow.querySelector('svg');
      if(!svg) return;
      svg.replaceChildren(...paths);
    });
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
      <svg viewBox="${UIIcon.#viewBox}" xmlns="${UIIcon.#xmlns}"></svg>
    `;

    requestAnimationFrame(()=>this.setAttribute('transition','active'));
  }
}
customElements.define('ui-icon',UIIcon);