import {UIBase} from '../ui-base/ui-base.js';

class UIDivider extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    const axis = this.getAttribute('axis');
    if(!['x','y'].includes(axis)){
      this.setAttribute('axis','x');
    }

    const text = this.getAttribute('text');
    if(text){
      const span = document.createElement('span');
      span.textContent = text;
      this.appendChild(span);
    }
  }
}
customElements.define('ui-divider',UIDivider);