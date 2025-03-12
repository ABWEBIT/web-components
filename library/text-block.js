class TextBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #nameData = '';
  #widthData = '';
  #heightData = '';
  #colorData = '';

  static get observedAttributes(){return ['name','width','height','color'];}

  get nameProp(){return this.#nameData;}
  set nameProp(value){
    if(/^[A-Za-z][A-Za-z0-9]*$/.test(value) && icons[value]){
      this.#nameData = value;
      const svg = this.#shadow.querySelector('svg');
      if(svg) svg.innerHTML = icons[this.#nameData];
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
    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}

    :host{
      position:relative;
      display:block;
      flex-grow:1;}
    </style>
    <slot></slot>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue !== newValue){
      switch(name){
        case 'name':this.nameProp = newValue; break;
        case 'width':this.widthProp = newValue; break;
        case 'height':this.heightProp = newValue; break;
        case 'color':this.colorProp = newValue; break;
      }
    }
  }

}
customElements.define('text-block',TextBlock);