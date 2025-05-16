import {UIBase} from '../ui-base/ui-base.js';

class UILoader extends UIBase{
  #shape = 'rounded';
  #shapeTypes = ['rounded','pill','square'];
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

    this.setAttributes(this,{
      'role': 'checkbox'
    });

    this.loading = this.hasAttribute('loading');

    let height = parseInt(this.getAttribute('height'),10) || 20;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <ui-icon height="${height}" icon="check"></ui-icon>
    `;
  }

}
customElements.define('ui-loader',UILoader);