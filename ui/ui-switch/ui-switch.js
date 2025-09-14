import {UIBase} from '../ui-base.js';

class UISwitch extends UIBase{
  #listeners = null;
  #disabled = false;
  #checked = false;

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true},
    'checked':{name:'checked',type:Boolean,reflect:true}
  });

  get disabled(){return this.#disabled;}
  set disabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.#syncDisabled();
  }

  get checked(){return this.#checked;}
  set checked(value){
    if(this.#checked === (value === true)) return;
    this.#checked = value === true;
    this.reflect('checked',this.#checked);
    this.#syncChecked();
  }

  connectedCallback(){
    super.connectedCallback();
    this.role = 'switch';
    this.replaceChildren();

    this.checked = this.hasAttribute('checked');
    this.disabled = this.hasAttribute('disabled');

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});

    this.#syncDisabled();
    this.#syncChecked();
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #syncChecked = () =>{
    this.ariaChecked = this.#checked ? 'true' : 'false'
  }

  #syncDisabled = () =>{
    if(this.#disabled) this.ariaDisabled = true
    else this.ariaDisabled = null;
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  #onClick = (e) =>{
    if(this.disabled) return;
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
    this.checked = !this.#checked;
  }

}
customElements.define('ui-switch',UISwitch);