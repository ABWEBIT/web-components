import {UIBase} from '../ui-base/ui-base.js';

class UIDivider extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    const orientation = this.getAttribute('orientation');
    if(!['horizontal','vertical'].includes(orientation)){
      this.setAttribute('orientation','horizontal');
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