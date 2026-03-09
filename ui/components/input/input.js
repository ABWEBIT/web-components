import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UIInput extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    placeholder:{type:String, reflect:true},
    ariaLabelledby:{type:String, reflect:true,attribute:'aria-labelledby'},
    clearable:{type:Boolean},
    name:{type:String, reflect:true},
    value:{type:String}
  };

  createRenderRoot(){return this;}

  render(){
    return html`
    <input
      type=${this.name || 'text'}
      name=${this.name || nothing}
      value=${this.value || nothing}
      placeholder=${this.placeholder || nothing}
      aria-labelledby=${this.ariaLabelledby || nothing}
      .disabled=${this.disabled}
      .required=${this.required}></textarea>`;
  }
}
customElements.define('ui-input',UIInput);