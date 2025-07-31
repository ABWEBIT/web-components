import {UIBase} from '../ui-base.js';
import {icons} from '../../lib/icons.js';

class UIIcon extends UIBase{
  #icon = '';
  #svg = null;

  static #viewBox = '0 0 24 24';
  static #xmlns = 'http://www.w3.org/2000/svg';

  static properties = Object.freeze({
    'icon':{name:'uiIcon',type:String,reflect:true}
  });

  get uiIcon(){return this.#icon;}
  set uiIcon(value){
    const newValue = String(value || '');
    if(this.#icon === newValue) return;
    this.#icon = newValue;
    queueMicrotask(() => this.#renderIcon());
  }

  connectedCallback(){
    super.connectedCallback();
    this.setAttribute('aria-hidden','true');
    this.#svg = document.createElementNS(UIIcon.#xmlns,'svg');
    this.#svg.setAttribute('viewBox',UIIcon.#viewBox);
    this.replaceChildren(this.#svg);
  }

  #renderIcon(){
    const data = icons?.[this.#icon];
    if(!Array.isArray(data) || data.length === 0) return;

    const content = data[0];
    if(typeof content !== 'string') return;

    if(!this.#svg) return;
    this.#svg.innerHTML = content;
    this.reflect('icon',this.#icon);
  }
}
customElements.define('ui-icon',UIIcon);