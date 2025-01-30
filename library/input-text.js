class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = false;
    this.disabled = false;
    this.label = 'Label';
    this.hint = 'Hint';
    this.render();
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
        row-gap:5px;}

      .label,.hint{
        text-overflow:ellipsis;
        -webkit-user-select:none;
        user-select:none;
        color:var(--rgb-255-255-255);}

      .label,.hint{font-size:90%;}

      .field{
        display:inline-flex;
        border-radius:5px;
        padding:0 10px;
        background-color:var(--rgb-255-255-255);}

      .field > .input{
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

  render(){
    let html = '';

    // label
    html += this.label?.trim() ? `
      <div class="label">${this.label.trim()}${this.required ? '*' : ''}</div>` : '';

    // input
    html += `
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>`;

    // hint
    html += this.hint?.trim() ? `
      <div class="hint">${this.hint.trim()}</div>` : '';

    // insert
    this.shadowRoot.innerHTML = this.styles()+html;

    // listeners
    this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.inputValidation());
  }

  inputValidation(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-text',InputText);