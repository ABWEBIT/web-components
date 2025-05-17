import {UIBase} from '../ui-base/ui-base.js';

class UILabel extends UIBase{
  connectedCallback(){
    super.connectedCallback();

    if(this.hasAttribute('required')){
      this.insertAdjacentText('beforeend',' *');
    }

  }
}
customElements.define('ui-label',UILabel);