class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #textData = '';
  #widthData = '';
  #heightData = '';
  #colorData = '';
  #beforeData = '';
  #afterData = '';

  static get observedAttributes(){return ['text','width','height','color'];}

  get textProp(){return this.#textData;}
  set textProp(value){
    if(/^[A-Za-z][A-Za-z0-9]*$/.test(value) && icons[value]){
      this.#textData = value;
      const svg = this.#shadow.querySelector('svg');
      if(svg) svg.innerHTML = icons[this.#textData];
    }
    else console.warn(`invalid name: ${value}`);
  }

  get widthProp(){return this.#widthData;}
  set widthProp(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#widthData = value;
      this.#shadow.host.style.setProperty(`--width`,this.#widthData);
    }
    else console.warn(`invalid width: ${value}`);
  }

  get heightProp(){return this.#heightData;}
  set heightProp(value){
    if(/^\d+(\.\d+)?(px|%)$/.test(value)){
      this.#heightData = value;
      this.#shadow.host.style.setProperty(`--height`,this.#heightData);
    }
    else console.warn(`invalid height: ${value}`);
  }

  get colorProp(){return this.#colorData;}
  set colorProp(value){
    if(/^--[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(value)){
      this.#colorData = value;
      this.#shadow.host.style.setProperty(`--color`,`var(${this.#colorData})`);
    }
    else console.warn(`invalid color: ${value}`);
  }

  connectedCallback(){
    // before
    if(this.beforeData && this.beforeData !== 'null'){
      this.beforeHTML =`
        <div class="_prefix">
          <svg><use href="#${this.beforeData}"/></svg>
        </div>`;}
    else this.beforeHTML = '';

    // text
    if(this._text && this._text !== 'null'){
      this._textHTML =`
        <div class="_text">
          <span>${this._text}</span>
        </div>`;}
    else this._textHTML = '';

    // after
    if(this._suffix && this._suffix !== 'null'){
      this._suffixHTML =`
        <div class="_suffix">
          <svg><use href="#${this._suffix}"/></svg>
        </div>`;}
    else this._suffixHTML = '';



    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}

    :host{
      position:relative;
      display:flex;
      column-gap:10px;
      justify-content:center;
      width:var(--width,auto);
      height:var(--height,30px);
      border:0;
      border-radius:var(--border-radius);
      font-family:var(--font-default);
      cursor:pointer;
      -webkit-user-select:none;
      user-select:none;
      transition:background-color 0.2s;
      color:rgb(255,255,255);
      overflow:hidden;}
    </style>
    <slot></slot>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue !== newValue){
      switch(name){
        case 'text':this.textProp = newValue; break;
        case 'width':this.widthProp = newValue; break;
        case 'height':this.heightProp = newValue; break;
        case 'color':this.colorProp = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);