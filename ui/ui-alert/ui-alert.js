import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttribute('role','alert')
  }
}
customElements.define('ui-alert',UIAlert);