import {LitElement,html,css,unsafeSVG,unsafeCSS,unsafeHTML} from '../helpers/lit-all.min-v3.2.1.js';
import * as icons from './icons-pack.js';

class IconBlock extends LitElement{
  static properties = {
    iconName:{type:String,attribute:'name'},
    iconWidth:{type:String,attribute:'width'},
  };

  static styles = css`
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host,:host svg{position:relative;display:inline-flex;}

    :host{
      width:20px;
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
  `;

  constructor(){
    super();
  }
  
  render(){
    return html`
      <svg viewBox="0 0 20 20">
        ${unsafeSVG(icons[this.iconName])}
      </svg>
    `;
  }

}
customElements.define('icon-block',IconBlock);