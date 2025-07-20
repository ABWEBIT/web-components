import {UIBase} from '../ui-base.js';

class UISwitch extends UIBase{
  #listeners = null;
  #checked = false;
  #disabled = false;

  static properties = Object.freeze({
    'checked': {name: 'checked', type: Boolean, reflect: true},
    'disabled': {name: 'disabled', type: Boolean, reflect: true}
  });

  get checked(){return this.#checked;}
  set checked(value){
    this.#checked = value === true;
    this.reflect('checked',this.#checked);
    this.setAttributes(this,{
      'aria-checked': this.#checked ? 'true' : 'false'
    });
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.setAttributes(this,{
      'tabindex': this.#disabled ? '-1' : '0',
      'aria-disabled': this.#disabled ? 'true' : 'false'
    });
  }

  connectedCallback(){
    super.connectedCallback();
    this.replaceChildren();
    this.size();
    this.color();

    this.setAttributes(this,{
      'role': 'switch'
    });

    this.checked = this.hasAttribute('checked');
    this.disabled = this.hasAttribute('disabled');

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #onClick = (e) => {
    if(this.disabled) return;
    this.#onAction(e);
  }

  #onKeyDown = (e) => {
    if(this.#disabled) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      if(e.repeat) return;
      this.#onAction(e);
    }
  }

  #onAction = (e) => {
    this.checked = !this.#checked;
    console.log(e.type);
  }

}
customElements.define('ui-switch',UISwitch);