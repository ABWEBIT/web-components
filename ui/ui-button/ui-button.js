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
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.#syncDisabled();
  }

  get loading(){return this.#loading;}
  set loading(value){
    if(this.#loading === (value === true)) return;
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.#syncLoading();
  }

  connectedCallback(){
    super.connectedCallback();
    this.role = 'button';

    if(!this.hasAttribute('tabindex')) this.tabIndex = 0;

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});

    this.#syncDisabled();
    this.#syncLoading();
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #syncLoading = () =>{
    const spinner = this.querySelector('ui-spinner');

    if(this.#loading && !spinner){
      this.append(document.createElement('ui-spinner'));
      this.disabled = true;
    }
    else if(!this.#loading && spinner){
      spinner.remove();
      this.disabled = false;
    }

    if(this.#loading) this.ariaBusy = true
    else this.ariaBusy = null;
  }

  #syncDisabled = () =>{
    if(this.#disabled) this.ariaDisabled = true
    else this.ariaDisabled = null;
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  #onClick = (e) =>{
    if(this.#disabled) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    this.#onAction(e);
  }

  #onKeyDown = (e) =>{
    if(this.#disabled) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      if(e.repeat) return;
      this.#onAction(e);
    }
  }

  #onAction = (e) =>{
    this.dispatchEvent(new CustomEvent('button-action',{
      detail:{originalEvent:e},
      bubbles:true,
      composed:true
    }));
  }
}
customElements.define('ui-button',UIButton);