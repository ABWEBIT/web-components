import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #name = '';
  #width = '';
  #height = '';

  static get observedAttributes(){return ['name','width','height'];}

  get _name(){return this.#name;}
  set _name(value){
    if(/^[A-Za-z]+$/.test(value) && icons[value]){
      this.#name = value;
      const svg = this.#shadow.querySelector('svg');
      if(svg) svg.innerHTML = icons[this.#name];
    }
    else console.warn(`invalid name: ${value}`);
  }

  get _width(){return this.#width;}
  set _width(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#width = value;
      this.#shadow.host.style.setProperty(`--width`,this.#width);
    }
  }

  get _height(){return this.#height;}
  set _height(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#height = value;
      this.#shadow.host.style.setProperty(`--height`,this.#height);
    }
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{
      all:initial;
      position:relative;
      display:inline-flex;
      justify-content:center;
      width:var(--width,20px);
      height:var(--height,20px);
      overflow:hidden;}

    :host,:host *:not(style){box-sizing:border-box;}

    svg{
      width:100%;
      height:100%;
      fill:var(--rgb-255-255-255);
      shape-rendering:geometricPrecision;
      -webkit-user-select:none;
      user-select:none;}
    </style>
    <svg viewBox="0 0 20 20">
      ${icons?.[this.#name] || ''}
    </svg>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(name === 'name' && oldValue !== newValue){this._name = newValue;};
    if(name === 'width' && oldValue !== newValue){this._width = newValue;};
    if(name === 'height' && oldValue !== newValue){this._height = newValue;};
  }

}
customElements.define('icon-block',IconBlock);