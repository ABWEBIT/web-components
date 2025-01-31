import { html, css, LitElement } from 'lit';

class InputText extends LitElement {
  static properties = {
    required: { type: Boolean },
    disabled: { type: Boolean },
    label: { type: String },
    hint: { type: String },
  };

  constructor() {
    super();
    this.required = true;
    this.disabled = false;
    this.label = 'Label';
    this.hint = 'Hint';
    this.validator = this.validation.bind(this);
  }

  static styles = css`
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
  `;

  html() {
    return html`
      ${this.label?.trim()
        ? html`<label>${this.label.trim()}${this.required ? '*' : ''}</label>`
        : ''}
      <div class="field">
        <div class="input" contenteditable="true"></div>
      </div>
      ${this.hint?.trim()
        ? html`<div class="hint">${this.hint.trim()}</div>`
        : ''}
    `;
  }

  validation() {
    const inputElement = this.shadowRoot.querySelector('.input');
    console.log(inputElement.textContent.length);
  }

  firstUpdated() {
    this.shadowRoot.querySelector('.input').addEventListener('input', this.validator);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
  }

  render() {
    return this.html();
  }
}

customElements.define('input-text', InputText);
