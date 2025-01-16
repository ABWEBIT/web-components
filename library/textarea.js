class TextareaDefault extends HTMLElement{
  constructor(){
    super();
    this.elementRendered = false;
    this.elementRequired = false;
    this.elementLabel = '';
    this.heightMin = 0;
    this.heightMax = 0;
    this.lengthMin = 0;
    this.lengthMax = 0;
    this.addEventListener('input',()=>this.changeInput());
  }

  renderElement(){
    this.contentEditable = 'true';
    this.elementRendered = true;
  }

  updateElement(){
  }

  changeInput(){
    console.log(this.textContent.length);
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
customElements.define('textarea-default',TextareaDefault);

class TextareaExtended extends TextareaDefault{
  constructor(){
    super();
  }
}
customElements.define('textarea-extended',TextareaExtended);