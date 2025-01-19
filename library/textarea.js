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
    if(this._label && typeof this._label === 'string'){
      this._labelHTML = `
        <label>${this._label}</label>`;
    }
    this._labelHTML = this._labelHTML || '';

    // build
    this.innerHTML = `
      ${this._labelHTML}
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