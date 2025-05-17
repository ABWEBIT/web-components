import {UIBase} from '../ui-base/ui-base.js';
import {icons} from '../../lib/icons.js';

class UIIcon extends UIBase{
  #icon = '';

  static #viewBox = '0 0 24 24';
  static #xmlns = 'http://www.w3.org/2000/svg';
  static #dRegex = /^[MmLlHhVvCcSsQqTtAaZz0-9\s.,-]+$/;

  static properties = Object.freeze({
    'icon':{name:'icon',type:String,reflect:true}
  });

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
      const svg = this.querySelector('svg');
      if(!svg) return;
      svg.replaceChildren(...paths);
      this.reflect('icon',this.#icon);
    });
  }

  connectedCallback(){
    super.connectedCallback();

    let height = parseInt(this.getAttribute('height'),10) || 24;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <svg viewBox="${UIIcon.#viewBox}" xmlns="${UIIcon.#xmlns}"></svg>
    `;
  }
}
customElements.define('ui-icon',UIIcon);