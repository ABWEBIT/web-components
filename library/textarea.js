class TextInput extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this._required = true;
    this._editable = true;
    this._label = 'Label';
    this._helper = '';
    this.addEventListener('input',()=>this.changeInput());
  }

  renderElement(){
    // label
    if(this._label && typeof this._label === 'string'){
      let asterisk = this._required === true ? ' *' : '';
      this._labelHTML = `<label>${this._label+asterisk}</label>`;
    }
    else this._labelHTML = '';

    // input
    this._inputHTML = `<div contenteditable="true"></div>`;

    // helper
    this._helperHTML = `<div></div>`;

    // build
    this.innerHTML = `
      ${this._labelHTML}
      ${this._inputHTML}
      ${this._helperHTML}
    `;
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
customElements.define('text-input',TextInput);