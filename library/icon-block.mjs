import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  shadow = this.attachShadow({mode:'open'});
  #name = '';
  #rendered = false;

  static get observedAttributes(){return ['name'];}

  get #nameFunc(){return this.#name;}
  set #nameFunc(value){this.#name = value;}

  css(){
    return `
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
    `;
  }

  html(){
    return `
      <svg viewBox="0 0 20 20">
        ${icons?.[this.#name] || ''}
      </svg>
    `;
  }

  connectedCallback(){
    this.#rendered = true;
    this.shadow.innerHTML = this.css()+this.html();

    ['width','height'].forEach((property)=>{
      const value = this.getAttribute(property);
      if(value && /^\d+(\.\d+)?(px|%)$/.test(value)){
        this.shadow.host.style.setProperty(`--${property}`,value);
      }
      else if(value) console.warn(`Invalid Icon ${property}: ${value}`);
    });

  }

  disconnectedCallback(){
    this.#rendered = false;
  }

  attributeChangedCallback(name,oldValue,newValue){
    console.log('+++');
    if(name === 'name'){
      if(icons[newValue] && /^[A-Za-z]+$/.test(newValue) && oldValue !== newValue){
        this.#nameFunc = newValue;
        if(this.#rendered === true) this.shadow.querySelector('svg').innerHTML = icons[newValue]
      }
      else console.warn(`Invalid Icon Name: ${newValue}`);
    };
  }

}
customElements.define('icon-block',IconBlock);