import {UIBase} from '../ui-base/ui-base.js';

class UIDivider extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    this.size();
    this.color();
    const orientation = this.getAttribute('orientation');
    if(!['horizontal','vertical'].includes(orientation)){
      this.setAttribute('orientation','horizontal');
    }
  }
}
customElements.define('ui-divider',UIDivider);