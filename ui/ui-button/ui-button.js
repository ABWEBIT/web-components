import {UIBase} from '../ui-base/ui-base.js';

class UIButton extends UIBase{
  #text = '';
  #disabled = false;
  #loading = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
    'loading':{name:'loading',type:Boolean,reflect:true}
  });

  get text(){return this.#text;}
  set text(value){
    if(!(this.#text = String(value || ''))) return;
    this.updateText('span',this.#text);
    this.reflect('text',this.#text);
    this.setAttributes(this,{
      'aria-label': this.#text
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

  get loading(){return this.#loading;}
  set loading(value){
    this.#loading = value === true;
    this.reflect('loading',this.#loading);
    this.setAttributes(this, {
      'aria-busy': this.#loading ? 'true' : 'false'
    });
    this.loader();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();

    this.setAttributes(this,{
      'role': 'button',
      'aria-busy': this.#loading ? 'true' : 'false'
    });

    this.disabled = this.hasAttribute('disabled');
    this.loading = this.hasAttribute('loading');

    this.loader();

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  loader(){
    const spinner = this.querySelector('ui-spinner');

    if(this.#loading && !spinner){
      this.appendChild(document.createElement('ui-spinner'));
    }
    else if(!this.#loading && spinner){
      spinner.remove();
    }
  }

  onClick(e){
    if(this.disabled || this.#loading) return;
    if(typeof this.onAction === 'function') this.onAction(e);
  }

  onKeyDown(e){
    if(e.code !== 'Tab') e.preventDefault();
    if(this.#disabled || this.#loading) return;
    if(e.repeat) return;
    if(e.code === 'Enter' || e.code === 'Space'){
      if(typeof this.onAction === 'function') this.onAction(e);
    }
  }

  onAction(e){
    console.log(e.type);
  }

}
customElements.define('ui-button',UIButton);