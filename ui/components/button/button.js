import {UIBase} from '../../base.js';

class UIButton extends UIBase{
  #listeners = null;
  #disabled = false;
  #busy = false;

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true},
    'busy':{name:'busy',type:Boolean,reflect:true}
  });

  get disabled(){return this.#disabled;}
  set disabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.#syncDisabled();
  }

  get busy(){return this.#busy;}
  set busy(value){
    if(this.#busy === (value === true)) return;
    this.#busy = value === true;
    this.reflect('busy',this.#busy);
    this.#syncBusy();
  }

  connectedCallback(){
    super.connectedCallback();
    this.role = 'button';
    this.tabIndex = 0;

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});

    this.#syncDisabled();
    this.#syncBusy();
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #syncBusy = () =>{
    const spinner = this.querySelector('ui-spinner');

    if(this.#busy && !spinner){
      this.append(document.createElement('ui-spinner'));
      this.disabled = true;
      this.ariaBusy = true;
    }
    else if(!this.#busy && spinner){
      spinner?.remove();
      this.disabled = false;
      this.ariaBusy = null;
    }
  }

  #syncDisabled = () =>{
    this.ariaDisabled = this.#disabled ? true : null;
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