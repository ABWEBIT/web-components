import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  shadow = this.attachShadow({mode:'open'});
  #name = '';

  static get observedAttributes(){return ['name'];}

  get _name(){return this.#name;}
  set _name(value){
    if(/^[A-Za-z]+$/.test(value) && icons[value]){
      this.#name = value;
      this.updateName();
    }
    else console.warn(`invalid name: ${value}`);
  }

  updateName(){
    const svg = this.shadow.querySelector('svg');
    if(svg) svg.innerHTML = icons[this.#name] || '';
  }

  connectedCallback(){
    this.shadow.innerHTML = `
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

    ['width','height'].forEach((property)=>{
      const value = this.getAttribute(property);
      if(/^\d+(\.\d+)?(px|%)$/.test(value)){
        this.shadow.host.style.setProperty(`--${property}`,value);
      }
      else if(value) console.warn(`invalid ${property}: ${value}`);
    });
  }

  disconnectedCallback(){
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(name === 'name' && oldValue !== newValue){
      this._name = newValue;
    };
  }

}
customElements.define('icon-block',IconBlock);