import * as icons from '../helpers/icons.js';
//import uuid from '../helpers/uuid.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #name = '';

  static get observedAttributes(){return ['name'];}

  get _name(){return this.#name;}
  set _name(value){
    if(/^[A-Za-z][A-Za-z0-9]*$/.test(value) && icons[value]){
      this.#name = value;
      const svg = this.#shadow.querySelector('svg');
      if(svg) svg.innerHTML = icons[this.#name];
    }
    else console.warn(`error in name: ${value}`);
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host *{box-sizing:border-box;outline:none;}
    :host{
      position:relative;
      display:inline-flex;
      width:fit-content;
      justify-content:center;
      align-items:center;
      vertical-align:middle;
      color:rgb(150,150,150);
      transition:color 0.2s;
      -webkit-user-select:none;
      user-select:none;}

    :host > svg{
      width:20px;
      height:20px;
      fill:currentColor;
      shape-rendering:geometricPrecision;
      pointer-events:none;}
    </style>
    <svg viewBox="0 0 20 20">
      ${icons[this.#name] || ''}
    </svg>`;

    //this.setAttribute('data-uuid',uuid());
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'name':this._name = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);