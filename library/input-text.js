class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = false;
    this.disabled = false;
    this.label = '';
    this.helper = '';
    this.render();
  }

  render(){
    this.component
    // css
    let cssBlock =`
    <style>
      :host,:host div{
        position:relative;box-sizing:border-box;width:100%;}

      :host{
        display:inline-flex;
        flex-direction:column;
        row-gap:6px;
        max-width:100%;}

      :host > .label,:host > .helper{-webkit-user-select:none;user-select:none;}
      :host > .label{font-size:105%;color:var(--rgb-255-255-255);}
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
    let labelBlock ='';
    if(this.label?.trim()){
      labelBlock = `
        <div class="label">${this.label.trim()}${this.required ? '*':''}</div>`;
    };

    // input
    let inputBlock = `
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>`;

    // helper
    let helperBlock ='';
    if(this.helper?.trim()){
      helperBlock = `<div class="helper">${this.helper.trim()}</div>`;
    };

    // build
    let component =`
      ${cssBlock}
      ${labelBlock}
      ${inputBlock}
      ${helperBlock}`;

    // insert
    this.shadowRoot.innerHTML = component;

    this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.changeInput());
  }

  changeInput(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-text',InputText);