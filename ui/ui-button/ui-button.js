import {UIBase} from '../ui-base.js';

class UIButton extends UIBase{
  #listeners = null;
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

    this.disabled = this.hasAttribute('disabled');
    this.loading = this.hasAttribute('loading');

    this.#button = document.createElement('button');

    this.#button.type = this.getAttribute('type') || 'button';
    if(this.disabled) this.#button.disabled = true;

    const buttonContent = [...(this?.childNodes || [])];

    this.#button.append(...buttonContent);
    this.replaceChildren(this.#button);
  }

  #loader = () => {
    const spinner = this.querySelector('ui-spinner');

    if(this.#loading && !spinner){
      this.appendChild(document.createElement('ui-spinner'));
    }
    else if(!this.#loading && spinner){
      spinner.remove();
    }
  }

  #onClick = (e) => {
    if(this.disabled || this.#loading) return;
    e.preventDefault();
    this.#onAction(e);
  }

  #onKeyDown = (e) => {
    if(this.#disabled || this.#loading) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      if(e.repeat) return;
      this.#onAction(e);
    }
  }

  #onAction = (e) => {
    console.log(e.type);
  }

}
customElements.define('ui-button',UIButton);