import {LitElement,html,nothing} from '../../lit-core.min.js';

class UITextarea extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    placeholder:{type:String, reflect:true},
    ariaLabelledby:{type:String, reflect:true,attribute:'aria-labelledby'},
    name:{type:String, reflect:true},
    value:{type:String}
  };

  createRenderRoot(){return this;}

  render(){
    return html`
    <textarea
      name=${this.name || nothing}
      placeholder=${this.placeholder || nothing}
      aria-labelledby=${this.ariaLabelledby || nothing}
      .disabled=${this.disabled}
      .required=${this.required}>${this.value || nothing}</textarea>`;
  }
}
customElements.define('ui-textarea',UITextarea);