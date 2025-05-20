import {UIBase} from '../ui-base/ui-base.js';

class UILabel extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    if(this.hasAttribute('required')){
      const span = document.createElement('span');
      const symbol = (this.getAttribute('symbol') || '*').trim().charAt(0);
      span.textContent = symbol;
      this.appendChild(span);
    }
  }
}
customElements.define('ui-label',UILabel);