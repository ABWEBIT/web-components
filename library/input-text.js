class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = true;
    this.disabled = false;
    this.label = 'Label';
    this.helper = 'Helper';
    this.render();
  }

  render(){
    // fragment
    const fragment = document.createDocumentFragment();

    // css
    this.cssBlock =`
    <style>
      :host,:host div{
        position:relative;box-sizing:border-box;width:100%;}

      :host{
        display:inline-flex;
        flex-direction:column;
        row-gap:6px;
        max-width:100%;}

      :host > .label,:host > .helper{-webkit-user-select:none;user-select:none;}
      :host > .label{font-size:110%;color:var(--rgb-255-255-255);}
      :host > .helper{font-size:85%;color:var(--rgb-155-155-155);}

      :host > .field{
        overflow:hidden;
        border-radius:5px;
        padding:0 10px;
        background-color:var(--rgb-255-255-255);}

      :host > .field > .input{
        display:block;
        padding:10px 0;
        overflow:hidden;
        border:none;
        outline:none;}
    </style>`;

    // label
    if(this.label?.trim()){
      this.labelBlock = `
        <div class="label">${this.label.trim()}</div>`;
    };

    // input
    this.inputBlock = `
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>`;

    // helper
    if(this.helper?.trim()){
      this.helperBlock = `<div class="helper">${this.helper.trim()}</div>`;
    };

    // build
    let component =`
      ${this.cssBlock}
      ${this.labelBlock}
      ${this.inputBlock}
      ${this.helperBlock}`;

    // insert
    this.shadowRoot.innerHTML = component;

    this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.changeInput());
  }

  changeInput(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-text',InputText);