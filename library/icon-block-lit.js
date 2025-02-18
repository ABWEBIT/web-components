import {LitElement,html,css,unsafeSVG,nothing} from '../helpers/lit-all.min-v3.2.1.js';
import * as icons from '../helpers/icons-pack.js';

class IconBlock extends LitElement{
  constructor(){
    super();
    this.iconName = '';
    this.iconWidth = '20px';
    this.iconHeight = '20px';
    this.iconValid = false;
  }

  static properties = {
    iconName:{type:String,attribute:'name',reflect:true},
    iconWidth:{type:String,attribute:'width'},
    iconHeight:{type:String,attribute:'height'},
    iconValid:{type:Boolean,state:true},
  }

  static styles = css`
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
  `;
  
  updated(changedProperties){
    if(changedProperties.has('iconName')){
      if(icons[this.iconName] && /^[A-Za-z]+$/.test(this.iconName)){
        this.iconValid = true;
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
      <svg viewBox="0 0 20 20">
        ${this.iconValid ? unsafeSVG(icons[this.iconName]) : nothing}
      </svg>
    `;
  }

}
customElements.define('icon-block',IconBlock);