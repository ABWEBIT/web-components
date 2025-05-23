import {UIBase} from '../ui-base/ui-base.js';

class UIListbox extends UIBase{

  connectedCallback(){
    super.connectedCallback();
    this.shape();

    this.setAttributes(this,{
      'role': 'listbox'
    });
  }

}
customElements.define('ui-listbox',UIListbox);