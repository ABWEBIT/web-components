class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = true;
    this.disabled = false;
    this.label = 'Label';
    this.hint = 'Hint';
    this.render();
  }

  styles(){
    this.inputHeight = String(this.getAttribute('height') || '100%').trim();
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

      .label,.hint{
        text-overflow:ellipsis;
        -webkit-user-select:none;
        user-select:none;
        color:var(--rgb-255-255-255);}

      .text{font-size:100%;}
      .hint{font-size:80%;}
      .asterisk{color:var(--rgb-185-65-65)}

      .field{
        display:inline-flex;
        border-radius:5px;
        padding:0 10px;
        background-color:var(--rgb-255-255-255);}

      .input{
        display:block;
        flex-grow:1;
        line-height:${this.inputHeight};
        overflow:hidden;
        white-space:nowrap;
        border:none;
        outline:none;}
    </style>
    `;
  }

  html(){
    return `
      ${this.label?.trim() || this.required ? '<div class="label">' : ''}
      ${this.label?.trim() ? `<span class="text">${this.label.trim()}</span>` : ''}
      ${this.required ? '<span class="asterisk"> *</span>' : ''}
      ${this.label?.trim() || this.required ? '</div>' : ''}
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>
      ${this.hint?.trim() ? `<div class="hint">${this.hint.trim()}</div>` : ''}
    `;
  }

  render(){
    this.shadowRoot.innerHTML = this.styles()+this.html();

    this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.validation());
  }

  validation(){
    //
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-text',InputText);