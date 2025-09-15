import {UIBase} from '../ui-base.js';

class UIFocus extends UIBase{
  connectedCallback(){
    this.tabIndex = '0';
    this.ariaHidden = 'true';
  }
}
customElements.define('ui-focus',UIFocus);