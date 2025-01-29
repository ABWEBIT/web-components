class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = false;
    this.disabled = false;
    this.label = 'Label';
    this.helper = '';
    this.render();
  }

  render(){
    // style
    let style =`
      <style>
      :host{
        position:relative;
        display:inline-flex;
        flex-direction:column;
        row-gap:5px;}

      :host > label{
        color:rgb(255,255,255)}

      :host > .wrap{
        overflow:hidden;
        border-radius:10px;
        padding-left:10px;
        padding-right:10px;
        background-color:rgb(255,255,255);}

      :host > .wrap > .input{
        max-height:100px;
        display:block;

        border:0;
        outline:none;}

      :host > .wrap > .input::-webkit-scrollbar{width:6px;}
      :host > .wrap > .input::-webkit-scrollbar-track{background-color:transparent;}
      :host > .wrap > .input::-webkit-scrollbar-thumb{
        border-radius:6px;
        background-color:rgb(115,115,115);}

      </style>`;

    // label
    if(this.label && typeof this.label === 'string'){
      this.labelHTML = `
        <label>${this.label}${this.required === true ? '*' : ''}</label>`;
    }
    else this.labelHTML = '';

    // input
    this.inputHTML = `
      <div class="wrap">
        <div class="input" contenteditable="true"></div>
      </div>`;

    // helper
    this.helperHTML = `<div class="helper"></div>`;

    // build
    this.shadowRoot.innerHTML = `
      ${style}
      ${this.labelHTML}
      ${this.inputHTML}
      ${this.helperHTML}
    `;

    this.addEventListener('input',()=>this.changeInput());
  }

  changeInput(){
    console.log(this.textContent.length);
  }


}
customElements.define('input-text',InputText);