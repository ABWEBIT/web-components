class ElementDefault extends HTMLElement {
  constructor(){
    super();
    this.elementRendered = false;
  }
  
  renderElement(){
    this.elementRendered = true;
  };

  updateElement(){
  };
  
  connectedCallback(){
    if(!this.elementRendered){
      this.renderElement();
    };
  };

  disconnectedCallback(){
    this.elementRendered = false;
  };

}

customElements.define('element-default',ElementDefault);