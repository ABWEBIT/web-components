class TextInput extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.elementRequired = false;
    this.elementEditable = true;
    this.elementLabel = '';
    this.elementHelper = '';
    this.addEventListener('input',()=>this.changeInput());
  }

  renderElement(){
    // class
    this.classList.add(this.constructor.name);

    // label
    if(this.elementLabel && typeof this.elementLabel === 'string'){
      this.elementLabelHTML = `
        <label>${this.elementLabel}</label>`;
    }
    this.elementLabelHTML = this.elementLabelHTML || '';

    // Input
    this.elementInputHTML = `
        <div></div>`;

    // build
    this.innerHTML = `
      ${this.elementLabelHTML}
      <div></div>
    `;

    //
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