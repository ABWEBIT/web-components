import * as icons from './icons-pack.js';

class IconBlock extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
  }

  style(){
    return `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host,:host svg{position:relative;display:inline-flex;}

    :host{
      justify-content:center;
      width:20px;
      height:100%;}

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
    const regex = /^[A-Za-z]+$/;
    let iconName = this.getAttribute('icon');
    iconName = (typeof iconName === "string" && regex.test(iconName) && iconName in icons ? iconName : 'iconDefault');
    if(icons[iconName] === undefined) console.log('Not found icon: '+iconName);
    return `
      <svg viewBox="0 0 20 20">
        ${icons[iconName]}
      </svg>
    `;
  }


  connectedCallback(){
    this.shadowRoot.innerHTML = this.style()+this.html();
  }

  disconnectedCallback(){
  }

}
customElements.define('icon-block',IconBlock);