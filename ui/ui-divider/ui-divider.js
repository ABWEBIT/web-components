import {UIBase} from '../ui-base/ui-base.js';

class UIDivider extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    const orientation = this.getAttribute('orientation');
    if(!['horizontal','vertical'].includes(orientation)){
      this.setAttribute('orientation','horizontal');
    }
  }
}
customElements.define('ui-divider',UIDivider);