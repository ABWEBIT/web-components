import {UIBase} from '../ui-base/ui-base.js';

class UILabel extends UIBase{
  #text = '';

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true}
  });

  get text(){return this.#text;}
  set text(value){
    let str;
    if(!(str = String(value || ''))) return;

    if(this.hasAttribute('required') && !str.endsWith('*')){
      str += ' *';
    }

    this.#text = str;
    this.reflect('text',this.#text);
    this.textContent = this.#text;

  }

  connectedCallback(){
    super.connectedCallback();

  }
}
customElements.define('ui-label',UILabel);