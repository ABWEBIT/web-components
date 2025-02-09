class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.label = 'Label';
    this.hint = 'This is the hint for input field';
    this.validator = this.validation.bind(this);
  }

  /* name,type,minlength,maxlength,pattern,readonly,disabled */

  style(){
    return `
    <style>
      :host,:host *:not(style){box-sizing:border-box;}

      :host,:host > div{
        position:relative;
        width:100%;
        max-width:100%;
        overflow:hidden;}

      :host{
        display:inline-flex;
        flex-direction:column;
        row-gap:10px;}

      label,.hint{
        text-overflow:ellipsis;
        -webkit-user-select:none;
        user-select:none;
        color:var(--rgb-255-255-255);}

      label > span{color:rgb(185,65,65);padding-left:5px;}
      .hint{font-size:75%;}

      .field{
        display:inline-flex;
        border-radius:5px;
        padding:0 10px;
        background-color:var(--rgb-255-255-255);}

      .input{
        display:block;
        color:rgb(0,0,0);
        flex-grow:1;
        line-height:30px;
        overflow:hidden;
        white-space:nowrap;
        border:none;
        outline:none;}
    </style>
    `;
  }

  html(){
    let asterisk = this.hasAttribute('required') ? '<span>*</span>' : '';

    return `
      ${this.label?.trim() ? `<label>${this.label.trim()}${asterisk}</label>` : ''}
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>
      ${this.hint?.trim() ? `<div class="hint">${this.hint.trim()}</div>` : ''}
    `;
  }

  connectedCallback(){
    this.shadowRoot.innerHTML = this.style()+this.html();
    this.shadowRoot.querySelector('.input').addEventListener('input',this.validator);
  }

  disconnectedCallback(){
    this.shadowRoot.querySelector('.input').removeEventListener('input',this.validator);
  }

  validation(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-text',InputText);