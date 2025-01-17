class TextareaDefault extends HTMLElement{
  constructor(){
    super();
    this._rendered = false;
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
      this.render();
    };
  }

  disconnectedCallback(){
    this.elementRendered = false;
  }

}
customElements.define('textarea-default',TextareaDefault);