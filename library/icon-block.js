import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'closed'});
  #name = '';

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
    :host *:not(style){box-sizing:border-box;}
    svg{
      position:relative;
      display:flex;
      overflow:hidden;
      justify-content:center;
      width:var(--width,20px);
      height:var(--height,20px);
      fill:var(--fill,rgb(255,255,255));
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