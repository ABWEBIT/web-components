import {UIBase} from '../ui-base.js';

class UIButton extends UIBase{
  #listeners = null;
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
    this.setAttributes(this,{
      'aria-disabled': this.#disabled ? 'true' : 'false',
      'tabindex': this.#disabled ? '-1' : '0'
    });
  }

  get loading(){return this.#loading;}
  set loading(value){
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.setAttributes(this,{
      'aria-busy': this.#loading ? 'true' : 'false'
    });
    this.#loader();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

    this.setAttributes(this,{
      'role': 'button',
      'aria-busy': this.#loading ? 'true' : 'false'
    });

    this.disabled = this.hasAttribute('disabled');
    this.loading = this.hasAttribute('loading');

    this.#loader();

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
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