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

    this.loading = this.hasAttribute('loading');

    let height = parseInt(this.getAttribute('height'),10) || 24;
    this.style.setProperty('--ui-object-height',`${height}px`);

    const icon = document.createElement('ui-icon');
    this.setAttributes(icon,{
      'height': height,
      'icon': 'spinner'
    });
    this.appendChild(icon);
  }

}
customElements.define('ui-spinner',UISpinner);