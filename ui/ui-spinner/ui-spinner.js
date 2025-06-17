import {UIBase} from '../ui-base/ui-base.js';

class UISpinner extends UIBase{
  #loading = false;

  static properties = Object.freeze({
    'loading':{name:'loading',type:Boolean,reflect:true}
  });

  get loading(){return this.#loading;}
  set loading(value){
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
  }

  connectedCallback(){
    super.connectedCallback();
    this.size();

    this.loading = this.hasAttribute('loading');

    const icon = document.createElement('ui-icon');
    this.setAttributes(icon,{
      'icon': 'spinner'
    });
    this.appendChild(icon);
  }

}
customElements.define('ui-spinner',UISpinner);