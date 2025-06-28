import {UIBase} from '../ui-base/ui-base.js';

class UISpinner extends UIBase{
  connectedCallback(){
    super.connectedCallback();

    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24');
    svg.setAttribute('aria-hidden','true');

    svg.innerHTML = `<path d="M12.008,23c-4.619-.8-7.993-4.84-7.989-9.564.006-4.228,2.762-7.952,6.78-9.162.712-.202,1.205-.855,1.208-1.601h0c-.004-.929-.755-1.678-1.676-1.673-.088,0-.175.008-.262.022C4.098,2.093.117,7.843,1.179,13.865c.933,5.29,5.499,9.142,10.828,9.135Z" />`;
    this.appendChild(svg);
  }
}
customElements.define('ui-spinner',UISpinner);