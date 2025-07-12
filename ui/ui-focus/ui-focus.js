import {UIBase} from '../ui-base.js';

class UIFocus extends UIBase{
  connectedCallback(){
    this.setAttributes(this,{
      'tabindex': '0',
      'aria-hidden': 'true'
    });
  }
}
customElements.define('ui-focus',UIFocus);