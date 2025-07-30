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
    if(this.#disabled === (value === true)) return
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#button){
      this.#button.disabled = this.#disabled;
    }
    console.log('dis');
  }

  get loading(){return this.#loading;}
  set loading(value){
    if(this.#loading === (value === true)) return
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.#loader();
    console.log('loa');
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.#button = document.createElement('button');
    this.#button.type = this.getAttribute('type') || 'button';
    this.removeAttribute('type');

    const content = [...this.childNodes];
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