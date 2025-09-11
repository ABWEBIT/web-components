import {UIBase} from '../ui-base.js';

class UIButton extends UIBase{
  #listeners = null;
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
    this.#syncDisabled();
  }

  get uiLoading(){return this.#loading;}
  set uiLoading(value){
    if(this.#loading === (value === true)) return;
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.#syncLoading();
  }

  connectedCallback(){
    super.connectedCallback();
    this.setAttribute('role','button');

    if(!this.hasAttribute('manual-config')){

      this.size();
      this.theme();
    }

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

  #syncLoading = () => {
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

  #syncDisabled = () => {
    if(this.#disabled) this.ariaDisabled = String(this.#disabled);
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  #onClick = (e) => {
    if(this.#disabled) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    this.onAction(e);
  }

  #onKeyDown = (e) => {
    if(this.#disabled) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      if(e.repeat) return;
      this.click(e);
    }
  }

  onAction(e){
    //console.log(e.type);
  }
}
customElements.define('ui-button',UIButton);