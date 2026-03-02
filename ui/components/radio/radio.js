import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UIRadio extends LitElement{
  static properties = {
    checked:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    disabled:{type:Boolean, reflect:true},
    name:{type:String, reflect:true},
    value:{type:String}
  };

  createRenderRoot(){return this;}

  #onChange(e){
    this.checked = e.target.checked;
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
    ></input>
    <span></span>`;
  }
}
customElements.define('ui-radio',UIRadio);