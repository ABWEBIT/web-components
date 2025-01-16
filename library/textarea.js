class TextareaDefault extends HTMLElement{
  constructor(){
    super();
    this.elementRendered = false;
    this.elementRequired = false;
    this.elementLabel = '';
    this.addEventListener('input',()=>this.changeInput());
  }

  renderElement(){
    // class
    this.classList.add('TextareaDefault');


    // label
    if(this.elementLabel && typeof this.elementLabel === 'string') {
      this.elementLabelHTML = `
        <label>${this.elementLabel}</label>`;
    }
    this.elementLabelHTML = this.elementLabelHTML || '';


    // build
    this.innerHTML = `
      ${this.elementLabelHTML}
    `;

    //this.contentEditable = 'true';

    // status
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