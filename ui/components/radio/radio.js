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

  updated(changed){
    if(changed.has('checked')){
      const input = this.querySelector('input');
      if(input) input.checked = this.checked;
    }
  }

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
    ></input>
    <span></span>`;
  }
}
customElements.define('ui-radio',UIRadio);