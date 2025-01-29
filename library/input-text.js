class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = false;
    this.disabled = false;
    this.label = 'Label';
    this.helper = 'Helper';
    this.render();
  }

  render(){
    // style
    let style =`
      <style>
      :host,:host div{
        position:relative;
        box-sizing:border-box;
        width:100%;}

      :host{
        display:inline-flex;
        flex-direction:column;
        row-gap:10px;
        max-width:100%;}

      :host > .label,:host > .helper{
        -webkit-user-select:none;
        user-select:none;}

      :host > .label{
        font-size:130%;
        color:var(--rgb-255-255-255);}

      :host > .helper{
        font-size:90%;
        color:rgb(155,155,155);}

      :host > .field{
        overflow:hidden;
        border-radius:5px;
        padding:10px;
        background-color:var(--rgb-255-255-255);}

      :host > .field > .input{
        display:block;
        overflow:hidden;
        border:none;
        outline:none;}
      </style>`;

    // label
    if(this.label && typeof this.label === 'string' && this.label.trim()){
      this.labelHTML = `
        <div class="label">${this.label.trim()}${this.required === true ? '*' : ''}</div>`;
    }
    else this.labelHTML = '';

    // input
    this.inputHTML = `
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>`;

    // helper
    if(this.helper && typeof this.helper === 'string' && this.helper.trim()){
      this.helperHTML = `
        <div class="helper">${this.helper.trim()}</div>`;
    }
    else this.helperHTML = '';

    // build
    this.shadowRoot.innerHTML = `
      ${style}
      ${this.labelHTML}
      ${this.inputHTML}
      ${this.helperHTML}
    `;

    this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.changeInput());
  }

  changeInput(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }


}
customElements.define('input-text',InputText);