class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
  }
  
  connectedCallback(){
  }

  disconnectedCallback(){
  }

}
customElements.define('web-component',WebComponent);