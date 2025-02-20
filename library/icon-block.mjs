import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  shadow = this.attachShadow({mode:'closed'});
  #name = '';

  static get observedAttributes(){
    return ['name'];
  }

  get _name(){return this.#name;}
  set _name(value){
    if(icons[value] && /^[A-Za-z]+$/.test(value)){
      this.#name = value;
      this.update();
    }
    else console.warn(`Invalid Icon Name: ${value}`);
  }

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

  render(){
    this.shadow.innerHTML = this.css()+this.html();

    ['width','height'].forEach((property)=>{
      const value = this.getAttribute(property);
      if(value && /^\d+(\.\d+)?(px|%)$/.test(value)){
        this.shadow.host.style.setProperty(`--${property}`,value);
      }
      else if(value) console.warn(`Invalid Icon ${property}: ${value}`);
    });
  }

  update(){
    const svgElement = this.shadow.querySelector('svg');
    if(svgElement){
      svgElement.innerHTML = icons[this.#name] || '';
    }
  }

  connectedCallback(){
    this.render();
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