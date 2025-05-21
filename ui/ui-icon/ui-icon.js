import {UIBase} from '../ui-base/ui-base.js';
import {icons} from '../../lib/icons.js';

class UIIcon extends UIBase{
  #icon = '';

  static #viewBox = '0 0 24 24';
  static #xmlns = 'http://www.w3.org/2000/svg';

  static properties = Object.freeze({
    'icon':{name:'icon',type:String,reflect:true}
  });

  get icon(){return this.#icon;}
  set icon(value){
    this.#icon = String(value || '');
    const data = icons?.[this.#icon];

    if(!Array.isArray(data) || data.length === 0) return;

    const content = data[0];

    if(typeof content !== 'string') return;

    queueMicrotask(()=>{
      const svg = this.querySelector('svg');
      if(!svg) return;

      svg.innerHTML = content;
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