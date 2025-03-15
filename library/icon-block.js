import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'closed'});
  #name = '';
  #id = '';

  static get observedAttributes(){return ['name'];}

  get _name(){return this.#name;}
  set _name(value){
    if(/^[A-Za-z][A-Za-z0-9]*$/.test(value) && icons?.[value]){
      this.#name = value;
      const svg = this.#shadow.querySelector('span');
      if(svg) svg.innerHTML = icons[this.#name];
    }
    else console.warn(`error in name: ${value}`);
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host{
      --width:20px;
      --height:20px;
      --fill:var(--rgb-255-255-255);
      width:var(--width);
      height:var(--height);}
    svg{
      display:block;
      width:var(--width);
      height:var(--height);
      fill:var(--fill);
      shape-rendering:geometricPrecision;
      -webkit-user-select:none;
      user-select:none;
      pointer-events:none;
      transition:fill 0.2s;}
    </style>
    <span>
      ${icons?.[this.#name] || ''}
    </span>
    `;

    const arr = new Uint32Array(2);
    crypto.getRandomValues(arr);
    this.#id = `id-${arr[0].toString(36)}-${arr[1].toString(36)}`;


    if(!this.hasAttribute('id')){
      this.setAttribute('id',this.#id);
    }
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