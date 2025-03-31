class TextBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host *{box-sizing:border-box;outline:none;}
    :host{
      position:relative;
      display:block;}
    </style>
    <slot></slot>`;
  }

}
customElements.define('text-block',TextBlock); 