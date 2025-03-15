class TextBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'closed'});
  #color = '';

  static get observedAttributes(){
    return ['color'];
  }
  get _color(){return this.#color;}
  set _color(value){
    if(/^--[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(value)){
      this.#color = value;
      this.#shadow.host.style.setProperty(`--color`,`var(${this.#color})`);
    }
    else console.warn(`error in color: ${value}`);
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{all:initial;}
    :host,:host *:not(style){box-sizing:border-box;}
    :host{
      --font-family:var(--font-family-default);
      --font-size:100%;
      --color:var(--rgb-255-255-255);}
    slot{
      position:relative;
      line-height:var(--line-height);
      font-family:var(--font-family);
      font-size:var(--font-size);
      color:var(--color);}
    </style>
    <slot></slot>
    `;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'color':this._color = newValue; break;
      }
    }
  }

}
customElements.define('text-block',TextBlock);