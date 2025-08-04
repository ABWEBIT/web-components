import {UIBase} from '../ui-base.js';
import {icons} from '../../lib/icons.js';

class UICheckbox extends UIBase{
  #listeners = null;
  #disabled = false;
  #checked = false;

  static #icon = 'check';
  static #viewBox = '0 0 24 24';
  static #xmlns = 'http://www.w3.org/2000/svg';

  static properties = Object.freeze({
    'checked':{name:'checked',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
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
    this.setAttribute('role','checkbox');
    this.shape();
    this.size();
    this.theme();

    this.checked = this.hasAttribute('checked');
    this.disabled = this.hasAttribute('disabled');

    const svg = document.createElementNS(UICheckbox.#xmlns,'svg');
    svg.setAttribute('viewBox',UICheckbox.#viewBox);

    const data = icons?.[UICheckbox.#icon];
    if(!Array.isArray(data) || data.length === 0) return;

    const content = data[0];
    if(typeof content !== 'string') return;

    svg.innerHTML =`<rect></rect>` +  content;
    this.appendChild(svg);

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
    e.preventDefault();
    e.stopImmediatePropagation();
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
customElements.define('ui-checkbox',UICheckbox);