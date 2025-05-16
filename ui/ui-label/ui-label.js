import {UIBase} from '../ui-base/ui-base.js';

class UILabel extends UIBase{
  connectedCallback(){
    super.connectedCallback();
  }
}
customElements.define('ui-label',UILabel);