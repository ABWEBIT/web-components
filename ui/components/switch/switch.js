import {LitElement,html,nothing} from '../../lit-core.min.js';

class UISwitch extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    checked: {type:Boolean, reflect:true},
    name:    {type:String,  reflect:true},
    value:   {type:String}
  };

  createRenderRoot(){return this;}

  #onChange(e){
    const input = e.target;
    this.checked = input.checked;

    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
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
    />`;
  }
}
customElements.define('ui-switch',UISwitch);