import {LitElement,html,css,unsafeSVG} from '../helpers/lit-all.min-v3.2.1.js';
import * as icons from '../helpers/icons-pack.js';

class IconBlock extends LitElement{
  constructor(){
    super();
    this.iconName = '';
    this.iconValid = false;
    this.iconWidth = '20px';
    this.iconHeight = '20px';
  }

  static properties = {
    iconName:{type:String,attribute:'name',reflect: true},
    iconValid:{type:Boolean},
    iconWidth:{type:String,attribute:'width'},
    iconHeight:{type:String,attribute:'height'},
  };

  static styles = css`
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}

    :host{
      color:#ffffff;
      position:relative;
      display:inline-flex;
      justify-content:center;
      width:var(--width);
      height:var(--height);
      overflow:hidden;}

    :host svg{
      width:20px;
      height:20px;
      fill:var(--rgb-255-255-255);
      shape-rendering:geometricPrecision;
      -webkit-user-select:none;
      user-select:none;}
  `;
  
  updated(changedProperties){
    if(changedProperties.has('iconName')){
      if(this.iconName && /^[A-Za-z]+$/.test(this.iconName) && this.iconName in icons){
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
    let svgCode;
    if(this.iconValid === true){
      svgCode = html`${unsafeSVG(icons[this.iconName])}`;
    };

    return html`
      <svg viewBox="0 0 20 20">
        ${svgCode}
      </svg>
    `;
  }

}
customElements.define('icon-block',IconBlock);