import uuid from '../helpers/uuid.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #width = '';
  #height = '';
  #color = '';

  static get observedAttributes(){return ['width','height','color'];}

  get _width(){return this.#width;}
  set _width(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#width = value;
      this.#shadow.host.style.setProperty(`--width`,this.#width);
    }
    else console.warn(`invalid width: ${value}`);
  }

  get _height(){return this.#height;}
  set _height(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#height = value;
      this.#shadow.host.style.setProperty(`--height`,this.#height);
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
      align-items:center;
      border-radius:var(--border-radius);
      overflow:hidden;
      column-gap:10px;
      width:fit-content;

      height:50px;
      border:0;
      cursor:pointer;
      -webkit-user-select:none;
      user-select:none;
      background-color:rgb(25,25,25);}

    :host > slot::after{
      border-radius:var(--border-radius);
      overflow:hidden;
      position:absolute;
      inset:0;
      content:"";
      background-color:rgb(255,255,255);
      opacity:0;
      transition:opacity 0.2s;}

    @media (hover:hover){
      :host > slot:hover::after{opacity:0.05;}
    }
    :host slot text-block{
      white-space:nowrap;
      text-overflow:ellipsis;}

    </style>
    <slot></slot>
    `;
    this.setAttribute('data-uuid',uuid());
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue !== newValue){
      switch(name){
        case 'width':this._width = newValue; break;
        case 'height':this._height = newValue; break;
        case 'color':this._color = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);