import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'closed'});
  #name = '';
  #width = '';
  #height = '';
  #color = '';

  static get observedAttributes(){
    return ['name','width','height','color'];
  }

  get _name(){return this.#name;}
  set _name(value){
    if(/^[A-Za-z][A-Za-z0-9]*$/.test(value) && icons?.[value]){
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
      this.style.setProperty(`--width`,this.#width);
    }
    else console.warn(`invalid width: ${value}`);
  }

  get _height(){return this.#height;}
  set _height(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#height = value;
      this.style.setProperty(`--height`,this.#height);
    }
    else console.warn(`invalid height: ${value}`);
  }

  get _color(){return this.#color;}
  set _color(value){
    if(/^--[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(value)){
      this.#color = value;
      this.#shadow.host.style.setProperty(`--color`,`var(${this.#color})`);
    }
    else console.warn(`invalid color: ${value}`);
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}

    :host{
      position:relative;
      display:flex;
      justify-content:center;
      width:var(--width,20px);
      height:var(--height,20px);
      overflow:hidden;
      pointer-events:none;}

    :host svg{
      width:var(--width,20px);
      height:var(--height,20px);
      fill:var(--color,rgb(255,255,255));
      shape-rendering:geometricPrecision;
      -webkit-user-select:none;
      user-select:none;}
    </style>
    ${icons?.[this.#name] || ''}
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'name':this._name = newValue; break;
        case 'width':this._width = newValue; break;
        case 'height':this._height = newValue; break;
        case 'color':this._color = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);