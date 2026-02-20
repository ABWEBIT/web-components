import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UICheckbox extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    checked:{type:Boolean, reflect:true},
    indeterminate:{type:Boolean, reflect:true},
    name:{type:String, reflect:true},
    value:{type:String}
  };

  createRenderRoot(){return this;}

  willUpdate(changed){
    if(changed.has('checked') && this.checked) this.indeterminate = false;
    else if(changed.has('indeterminate') && this.indeterminate) this.checked = false;
  }

  #onChange(e){
    const input = e.target;
    this.checked = input.checked;
    this.indeterminate = false;

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  get #iconName(){
    if(this.indeterminate) return 'check-indeterminate';
    if(this.checked) return 'check';
    return '';
  }

  render(){
    return html`
    <input type="checkbox"
      name=${this.name || nothing}
      value=${this.value || nothing}
      .checked=${this.checked}
      .indeterminate=${this.indeterminate}
      .disabled=${this.disabled}
      .required=${this.required}
      @change=${this.#onChange}
    />
    <ui-icon name="${this.#iconName}"></ui-icon>`;
  }
}
customElements.define('ui-checkbox',UICheckbox);