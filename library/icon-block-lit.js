import {LitElement,html,css,unsafeSVG} from '../helpers/lit-all.min-v3.2.1.js';
import * as icons from './icons-pack.js';

class IconBlock extends LitElement{
  static properties = {
    iconName:{type:String,attribute:'name'},
    iconWidth:{type:String,attribute:'width'},
    iconHeight:{type:String,attribute:'height'},
  };

  static styles = css`
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host,:host svg{position:relative;display:inline-flex;}

    :host{
      height:100%;
      justify-content:center;
      overflow:hidden;}

    :host svg{
      width:var(--width,24px);
      height:var(--height,24px);
      shape-rendering:geometricPrecision;
      stroke:none;
      fill:var(--rgb-255-255-255);
      -webkit-user-select:none;
      user-select:none;}
  `;
  
  constructor(){
    super();
    this.exists = false;
  }

  updated(changedProperties){
    if(changedProperties.has('iconName')){
      if(this.iconName && /^[A-Za-z]+$/.test(this.iconName) && this.iconName in icons){
        this.exists = true;
      }
      else console.warn(`Invalid Icon Name: ${this.iconName}`);
    }
    if(changedProperties.has('iconWidth')){
      if(this.iconWidth && /^\d+(\.\d+)?(px|%)$/.test(this.iconWidth)){
        this.style.setProperty('--width',this.iconWidth);
      }
      else console.warn(`Invalid Icon Width: ${this.iconWidth}`);
    }
    if(changedProperties.has('iconHeight')){
      if(this.iconHeight && /^\d+(\.\d+)?(px|%)$/.test(this.iconHeight)){
        this.style.setProperty('--height',this.iconHeight);
      }
      else console.warn(`Invalid Icon Height: ${this.iconHeight}`);
    }
  }

  render(){
    return html`
      <svg viewBox="0 0 24 24">
        ${unsafeSVG(icons[this.iconName])}
      </svg>
    `;
  }

}
customElements.define('icon-block',IconBlock);