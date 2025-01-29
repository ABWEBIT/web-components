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
    // css
    let
    cssBlock = document.createElement('style');
    cssBlock.textContent =`
      :host,:host div{
        position:relative;box-sizing:border-box;width:100%;}

      :host{
        display:inline-flex;
        flex-direction:column;
        row-gap:10px;
        max-width:100%;}

      :host > .label,:host > .helper{-webkit-user-select:none;user-select:none;}

      :host > .label{
        font-size:120%;
        color:var(--rgb-255-255-255);}

      :host > .helper{
        font-size:90%;
        color:var(--rgb-155-155-155);}

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
    `;


    // label
    let
    labelBlock = document.createElement('div');
    labelBlock.classList.add('label');
    labelBlock.textContent = `${this.label.trim()}`;

    //this.shadowRoot.appendChild(labelHTML);
    //this.labelHTML = (this.label?.trim()) ? 
    //  `<div class="label">${this.label.trim()}${this.required ? '*':''}</div>`:'';


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
      ${cssBlock.outerHTML}
      ${labelBlock.outerHTML}
    `;

    //this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.changeInput());
  }

  changeInput(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }


}
customElements.define('input-text',InputText);