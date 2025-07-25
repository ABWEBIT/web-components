import {UIBase} from '../ui-base.js';

class UISeparator extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    this.size();
    this.theme();

    const orientation = this.getAttribute('orientation');
    if(!['horizontal','vertical'].includes(orientation)){
      this.setAttribute('orientation','horizontal');
    }
  }
}
customElements.define('ui-separator',UISeparator);