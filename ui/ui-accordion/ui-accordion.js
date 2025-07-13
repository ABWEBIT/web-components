import {UIBase} from '../ui-base.js';

class UIAccordion extends UIBase{
  #disabled = false;
  #items = [];

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');

  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  onClick(e){
    if(this.disabled) return;
    if(typeof this.onAction === 'function') this.onAction(e);
  }

  onKeyDown(e){
    if(e.code !== 'Tab') e.preventDefault();
    if(this.#disabled) return;
    if(e.repeat) return;
    if(e.code === 'Enter' || e.code === 'Space'){
      if(typeof this.onAction === 'function') this.onAction(e);
    }
  }

  onAction(e){
    //console.log(e.type);
  }

}
customElements.define('ui-accordion',UIAccordion);