import {UIBase} from '../../base.js';

class UISeparator extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    this.role = 'separator';
  }
}
customElements.define('ui-separator',UISeparator);