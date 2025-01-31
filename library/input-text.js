class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = true;
    this.disabled = false;
    this.label = 'Label';
    this.hint = 'Hint';
    this.validator = this.validation.bind(this);
  }

  styles(){
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

      .hint{font-size:80%;}

      .field{
        display:inline-flex;
        border-radius:5px;
        padding:0 10px;
        background-color:var(--rgb-255-255-255);}

      .input{
        display:block;
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
    return `
      ${this.label?.trim() ? `<label>${this.label.trim()}${this.required ? '*' : ''}</label>` : ''}
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>
      ${this.hint?.trim() ? `<div class="hint">${this.hint.trim()}</div>` : ''}
    `;
  }

  render(){
    this.shadowRoot.innerHTML = this.styles()+this.html();
  }

  validation(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

  connectedCallback(){
    this.render();
    this.shadowRoot.querySelector('.input').addEventListener('input',this.validator);
  }

  disconnectedCallback(){
    this.shadowRoot.querySelector('.input').removeEventListener('input',this.validator);
  }

}
customElements.define('input-text',InputText);