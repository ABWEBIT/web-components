import {UIBase} from '../ui-base.js';

class UIButton extends UIBase{
  #button = null;
  #disabled = false;
  #loading = false;

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true},
    'loading':{name:'loading',type:Boolean,reflect:true}
  });

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#button){
      this.#button.disabled = this.#disabled;
    }
  }

  get loading(){return this.#loading;}
  set loading(value){
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.#loader();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.#button = document.createElement('button');
    this.#button.type = this.getAttribute('type') || 'button';
    this.disabled = this.hasAttribute('disabled');

    const content = [...(this.childNodes)];

    this.#button.append(...content);
    this.replaceChildren(this.#button);
  }

  #loader = () => {
    const spinner = this.querySelector('ui-spinner');

    if(this.#loading && !spinner){
      this.append(document.createElement('ui-spinner'));
      this.disabled = true;
    }
    else if(!this.#loading && spinner){
      spinner.remove();
      this.disabled = false;
    }
  }
}
customElements.define('ui-button',UIButton);