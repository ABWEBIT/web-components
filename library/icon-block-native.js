import * as icons from '../helpers/icons-pack.js';

class IconBlock extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.iconName = '';
    this.iconWidth = '';
    this.rendered = false;
  }

  static get observedAttributes(){
    return ['name','width','height'];
  }

  get iconNameFunc(){return this.iconName;}
  set iconNameFunc(value){
    this.iconName = value;
    if(this.rendered) this.iconNameUpdate();
  }

  get iconWidthFunc(){return this.iconWidth;}
  set iconWidthFunc(value){
    this.iconWidth = value;
  }

  style(){
    return `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}

    :host{
      position:relative;
      display:inline-flex;
      justify-content:center;
      width:var(--width);
      height:var(--height);
      overflow:hidden;}

    :host svg{
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



  attributeChangedCallback(name,oldValue,newValue){
    if(name === 'name'){

      if(newValue && oldValue !== newValue && /^[A-Za-z]+$/.test(newValue) && newValue in icons){
        this.iconNameFunc = newValue;
      }
      else console.warn(`Invalid Icon Name: ${newValue}`);

    };

    if(name === 'width'){

      if(newValue && /^\d+(\.\d+)?(px|%)$/.test(newValue)){
        this.iconWidthFunc = newValue;
      }
      else console.warn(`Invalid Icon Width: ${newValue}`);

    };

  }

}
customElements.define('icon-block',IconBlock);