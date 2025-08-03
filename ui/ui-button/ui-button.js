import {UIBase} from '../ui-base.js';

class UIButton extends UIBase{
  #button = null;
  #disabled = false;
  #loading = false;

  static properties = Object.freeze({
    'disabled':{name:'uiDisabled',type:Boolean,reflect:true},
    'loading':{name:'uiLoading',type:Boolean,reflect:true}
  });

  get uiDisabled(){return this.#disabled;}
  set uiDisabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    if(this.#button){
      this.#button.disabled = this.#disabled;
    }
  }

  get uiLoading(){return this.#loading;}
  set uiLoading(value){
    if(this.#loading === (value === true)) return;
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    if(this.#button){
      this.#loader();
    }
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
    if(content.length > 0){
      this.#button.append(...content);
      this.replaceChildren(this.#button);
    }
  }

  #loader = () => {
    const spinner = this.querySelector('ui-spinner');

    if(this.#loading && !spinner){
      this.append(document.createElement('ui-spinner'));
      this.uiDisabled = true;
    }
    else if(!this.#loading && spinner){
      spinner.remove();
      this.uiDisabled = false;
    }
  }
}
customElements.define('ui-button',UIButton);