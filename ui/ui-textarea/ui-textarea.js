import {UIBase} from '../ui-base/ui-base.js';
import {htmlEscape} from '../../utils/index.js';

class UITextarea extends UIBase{
  #disabled = false;

  #onInput = this.onInput.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

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
    this.shape();
/*
    aria-labelledby="comment-label"
    aria-placeholder="Placeholder"
*/
    this.setAttributes(this,{
      'role': 'textbox',
      'contenteditable': 'plaintext-only',
      'aria-multiline': 'true',
      'aria-required': this.hasAttribute('required') ? 'true' : 'false',
      'empty': this.textContent.trim() === '' ? true : false,
    });

/*
    let height = parseInt(this.getAttribute('height'),10) || 60;
    this.style.setProperty('--ui-object-height',`${height}px`);
*/

    this.addEventListener('input',this.#onInput);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('input',this.#onInput);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  onKeyDown(e){
    this.doAction(e);
  }

  onInput(e){
    if(this.#disabled) return;
    this.empty();
  }

  doAction(e){
    console.log(e.type);
  }

  empty(){
    const empty = this.textContent.trim() === '';
    this.toggleAttribute('empty',empty);
  }

}
customElements.define('ui-textarea',UITextarea);