import {UIBase} from '../ui-base.js';

class UISeparator extends UIBase{
  connectedCallback(){
    super.connectedCallback();
  }
}
customElements.define('ui-separator',UISeparator);