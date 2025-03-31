import {textNormalize} from '../helpers/utils.js';

class FormField extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #hint = '';

  static get observedAttributes(){return ['label','hint'];}

  get _label(){return this.#label;}
  set _label(value){
    value = textNormalize(value);
    if(value){
      this.#label = value;
      this.#updateText('label',this.#label);
    }
  }

  get _hint(){return this.#hint;}
  set _hint(value){
    value = textNormalize(value);
    if(value){
      this.#hint = value;
      this.#updateText('hint',this.#hint);
    }
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`text-block[type="${type}"]`);
      if(block) block.textContent = text;
    });
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{
      position:relative;
      display:inline-flex;
      flex-direction:column;
      width:fit-content;
      row-gap:10px;}

    :host > text-block[type="label"],
    :host > text-block[type="hint"]{
      line-height:100%;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;}

    :host > text-block[type="label"]{
      font-size:90%;
      color:rgb(255,255,255);}

    :host > text-block[type="hint"]{
      font-size:80%;
      color:rgb(150,150,150);}
    </style>
    ${this.#label && `<text-block type="label"></text-block>`}
    <slot></slot>
    ${this.#hint && `<text-block type="hint"></text-block>`}`;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'label':this._label = newValue; break;
        case 'hint':this._hint = newValue; break;
      }
    }
  }

}
customElements.define('form-field',FormField);