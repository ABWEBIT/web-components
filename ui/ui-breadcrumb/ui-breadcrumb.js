import {UIBase} from '../ui-base.js';

class UIText extends UIBase{
  connectedCallback(){
    super.connectedCallback();
  }
}
customElements.define('ui-text',UIText);