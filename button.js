'use strict';
class Button extends HTMLElement{
  constructor(){
    super();
    this.rendered = false;
  };

  render(){
    this._prefix = String(this.getAttribute('_prefix')).trim();
    this._text   = String(this.getAttribute('_text')).trim();
    this._suffix = String(this.getAttribute('_suffix')).trim();

    // prefix icon
    if(this._prefix && this._prefix !== 'null'){
      this._prefixHTML =`
        <div class="_prefix">
          <svg><use href="#${this._prefix}"/></svg>
        </div>`;}
    else this._prefixHTML = '';

    // core text
    if(this._text && this._text !== 'null'){
      this._textHTML =`
        <div class="_text">
          <span>${this._text}</span>
        </div>`;}
    else this._textHTML = '';

    // suffix icon
    if(this._suffix && this._suffix !== 'null'){
      this._suffixHTML =`
        <div class="_suffix">
          <svg><use href="#${this._suffix}"/></svg>
        </div>`;}
    else this._suffixHTML = '';

    // build
    this.innerHTML =`
      ${this._prefixHTML}
      ${this._textHTML}
      ${this._suffixHTML}
    `;
  };

  connectedCallback(){
    if(!this.rendered){
      this.render();
      this.rendered = true;
    }
  };

  disconnectedCallback(){
    this.rendered = false;
  };

  static get observedAttributes(){
    return ['_prefix', '_text', '_suffix'];
  };

  attributeChangedCallback(name, oldValue, newValue){
    this.render();
  };

};

customElements.define('button-',Button);