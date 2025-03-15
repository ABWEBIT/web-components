class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #widthData = '';
  #heightData = '';
  #colorData = '';

  static get observedAttributes(){return ['width','height','color'];}

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
    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host{
      position:relative;
      display:flex;
      column-gap:10px;
      width:fit-content;

      border:0;
      border-radius:var(--border-radius);
      cursor:pointer;
      -webkit-user-select:none;
      user-select:none;
      background-color:rgb(25,25,25);
      overflow:hidden;
      transition:background-color 0.2s;}

    :host slot::after{
      position:absolute;
      inset:0;
      content:"";
      background-color:rgb(255,255,255);
      opacity:0;
      transition:opacity 0.2s;}

    @media (hover:hover){
      :host slot:hover::after{opacity:0.05;}
    }

    text-block{
      display:flex;
      align-items:center!important;
      white-space:nowrap!important;}

    </style>
    <slot></slot>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue !== newValue){
      switch(name){
        case 'width':this.widthProp = newValue; break;
        case 'height':this.heightProp = newValue; break;
        case 'color':this.colorProp = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);