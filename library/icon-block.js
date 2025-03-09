import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #nameData = '';
  #widthData = '';
  #heightData = '';

  static get observedAttributes(){return ['name','width','height'];}

  get nameProp(){return this.#nameData;}
  set nameProp(value){
    if(/^[A-Za-z0-9]+$/.test(value) && icons[value]){
      this.#nameData = value;
      const svg = this.#shadow.querySelector('svg');
      if(svg) svg.innerHTML = icons[this.#nameData];
    }
    else console.warn(`invalid name: ${value}`);
  }

  get widthProp(){return this.#widthData;}
  set widthProp(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#widthData = value;
      this.#shadow.host.style.setProperty(`--width`,this.#widthData);
    }
    else console.warn(`invalid width: ${value}`);
  }

  get heightProp(){return this.#heightData;}
  set heightProp(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#heightData = value;
      this.#shadow.host.style.setProperty(`--height`,this.#heightData);
    }
    else console.warn(`invalid height: ${value}`);
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
      ${icons?.[this.#nameData] || ''}
    </svg>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue !== newValue){
      switch(name){
        case 'name':this.nameProp = newValue; break;
        case 'width':this.widthProp = newValue; break;
        case 'height':this.heightProp = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);