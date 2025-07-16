import {UIBase} from '../ui-base.js';
import {icons} from '../../lib/icons.js';

class UICheckbox extends UIBase{
  #checked = false;
  #disabled = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

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
    this.shape();
    this.size();
    this.color();
    this.setAttribute('role','checkbox');

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

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  onClick(e){
    if(this.disabled) return;
    if(typeof this.doAction === 'function') this.doAction(e);
  }

  onKeyDown(e){
    if(e.key !== 'Tab') e.preventDefault();
    if(this.#disabled) return;
    if(e.repeat) return;
    if(e.key === 'Enter' || e.key === ' ') this.doAction(e);
  }

  doAction(e){
    this.checked = !this.#checked;
    //console.log(e.type);
  }

}
customElements.define('ui-checkbox',UICheckbox);