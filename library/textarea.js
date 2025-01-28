class TextareaElement extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.elementRequired = false;
    this.elementLabel = '';
    this.elementHelp = '';
    this.addEventListener('input',()=>this.changeInput());
  }

  renderElement(){
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
      <div></div>
    `;

    //this.contentEditable = 'true';
  }

  updateElement(){
  }

  changeInput(){
    console.log(this.textContent.length);
  }

  connectedCallback(){
    this.renderElement();
  }

  disconnectedCallback(){
  }

}
customElements.define('textarea-element',TextareaElement);