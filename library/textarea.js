class TextareaDefault extends HTMLElement{
  constructor(){
    super();
    this._required = false;
    this._label = '';
    this._help = '';
    this.addEventListener('input',()=>this.changeInput());
  }

  render(){
    // class
    this.classList.add(this.constructor.name);

    // label
    if(this.elementLabel && typeof this.elementLabel === 'string'){
      this.elementLabelHTML = `
        <label>${this.elementLabel}</label>`;
    }
    this.elementLabelHTML = this.elementLabelHTML || '';

    // build
    this.innerHTML = `
      ${this.elementLabelHTML}
    `;

    //this.contentEditable = 'true';
  }

  updateElement(){
  }

  changeInput(){
    console.log(this.textContent.length);
  }

  connectedCallback(){
    this.render();
  }

  disconnectedCallback(){
  }

}
customElements.define('textarea-default',TextareaDefault);