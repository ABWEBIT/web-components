import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.iconName = '';
    this.iconWidth = '20px';
    this.iconHeight = '20px';
    this.rendered = false;
  }

  static get observedAttributes(){return ['name','width','height'];}

  get iconNameFunc(){return this.iconName;}
  set iconNameFunc(value){this.iconName = value;}

  get iconWidthFunc(){return this.iconWidth;}
  set iconWidthFunc(value){this.iconWidth = value;}

  get iconHeightFunc(){return this.iconHeight;}
  set iconHeightFunc(value){this.iconHeight = value;}

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
        ${icons?.[this.iconName] || ''}
      </svg>
    `;
  }

  connectedCallback(){
    this.rendered = true;
    this.shadowRoot.innerHTML = this.css()+this.html();
  }

  disconnectedCallback(){
    this.rendered = false;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(name === 'name'){
      if(icons[newValue] && /^[A-Za-z]+$/.test(newValue) && oldValue !== newValue){
        this.iconNameFunc = newValue;
        if(this.rendered === true) this.shadowRoot.querySelector('svg').innerHTML = icons[newValue]
      }
      else console.warn(`Invalid Icon Name: ${newValue}`);
    };
    if(name === 'width'){
      if(newValue && /^\d+(\.\d+)?(px|%)$/.test(newValue) && oldValue !== newValue){
        this.iconWidthFunc = newValue;
        this.shadowRoot.host.style.setProperty('--width',newValue);
      }
      else console.warn(`Invalid Icon Width: ${newValue}`);
    };
    if(name === 'height'){
      if(newValue && /^\d+(\.\d+)?(px|%)$/.test(newValue) && oldValue !== newValue){
        this.iconHeightFunc = newValue;
        this.shadowRoot.host.style.setProperty('--height',newValue);
      }
      else console.warn(`Invalid Icon Height: ${newValue}`);
    };
  }

}
customElements.define('icon-block',IconBlock);