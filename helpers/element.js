/* Base Element */
class ElementDefault extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.elementRendered = false;
  }
  
  renderElement(){
    this.elementRendered = true;
  }

  updateElement(){
  }
  
  connectedCallback(){
    if(!this.elementRendered){
      this.renderElement();
    };
  }

  disconnectedCallback(){
    this.elementRendered = false;
  }

}
customElements.define('element-default',ElementDefault);

/* Extending Base Element */
class ElementExtended extends ElementDefault{
  constructor(){
    super();
  }
}
customElements.define('element-extended',ElementExtended);