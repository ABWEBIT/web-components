import {UIBase} from '../ui-base/ui-base.js';
import {icons} from '../../lib/icons.js';

class UISpinner extends UIBase{
  static #icon = 'spinner';
  static #viewBox = '0 0 24 24';
  static #xmlns = 'http://www.w3.org/2000/svg';

  connectedCallback(){
    super.connectedCallback();

    const svg = document.createElementNS(UISpinner.#xmlns,'svg');
    svg.setAttribute('viewBox',UISpinner.#viewBox);
    svg.setAttribute('aria-hidden','true');

    const data = icons?.[UISpinner.#icon];
    if(!Array.isArray(data) || data.length === 0) return;

    const content = data[0];
    if(typeof content !== 'string') return;

    svg.innerHTML = content;
    this.appendChild(svg);
  }
}
customElements.define('ui-spinner',UISpinner);