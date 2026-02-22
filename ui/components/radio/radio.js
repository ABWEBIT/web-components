import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UIRadio extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    checked:{type:Boolean, reflect:true},
    name:{type:String, reflect:true},
    value:{type:String}
  };

  createRenderRoot(){return this;}

  #onChange(e){
    const input = e.target;
    this.checked = input.checked;
  }

  render(){
    return html`
    <input type="radio"
      name=${this.name || nothing}
      value=${this.value || nothing}
      .checked=${this.checked}
      .disabled=${this.disabled}
      .required=${this.required}
      @change=${this.#onChange}
    />
    <ui-icon name="circle"></ui-icon>`;
  }
}
customElements.define('ui-radio',UIRadio);