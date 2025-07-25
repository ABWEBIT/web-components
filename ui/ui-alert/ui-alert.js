import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  connectedCallback(){
    super.connectedCallback();
  }
}
customElements.define('ui-alert',UIAlert);