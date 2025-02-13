import * as icons from './icons-pack.js';

class IconBlock extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.iconName = '';
    this.iconWidth = '';
    this.rendered = false;
  }

  // name
  get iconNameFunc(){return this.iconName;}
  set iconNameFunc(value){
    this.iconName = value;
    if(this.rendered) this.iconNameUpdate();
  }

  // width
  get iconWidthFunc(){return this.iconWidth;}
  set iconWidthFunc(value){
    this.iconWidth = value;
  }

  style(){
    return `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host,:host svg{position:relative;display:inline-flex;}

    :host{
      width:${this.iconWidth || '100%'};
      height:100%;
      justify-content:center;
      overflow:hidden;}

    :host svg{
      width:inherit;
      height:inherit;
      stroke:none;
      fill:var(--rgb-255-255-255);
      -webkit-user-select:none;
      user-select:none;
      shape-rendering:geometricPrecision;}
    </style>
    `;
  }

  html(){
    return `
      <svg viewBox="0 0 20 20">
        ${icons[this.iconName] || ''}
      </svg>
    `;
  }

  connectedCallback(){
    this.rendered = true;
    this.shadowRoot.innerHTML = this.style()+this.html();
  }

  iconNameUpdate(){
    let svgElement = this.shadowRoot.querySelector('svg');
    if(svgElement){
      svgElement.innerHTML = icons[this.iconName] || '';
    }
  }

  disconnectedCallback(){
  }

  static get observedAttributes(){
    return ['name','width'];
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(name === 'name'){

      if(newValue && oldValue !== newValue && /^[A-Za-z]+$/.test(newValue) && newValue in icons){
        this.iconNameFunc = newValue;
      }
      else console.warn(`Invalid Icon Name: ${newValue}`);

    };

    if(name === 'width'){

      if(newValue && /^\d+(\.?\.?\d+)?(px|%)$/.test(newValue)){
        this.iconWidthFunc = newValue;
      }
      else console.warn(`Invalid Icon Width: ${newValue}`);

    };

  }

}
customElements.define('icon-block',IconBlock);