import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UISwitch extends LitElement{
  static properties = {
    checked:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    disabled:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  static list = ['id','class','name','value'];

  createRenderRoot(){return this;}

  connectedCallback(){
    super.connectedCallback();

    const config = this.getAttribute('config');
    if(!config){
      this.config = {};
      return;
    }
    try{
      const parsed = JSON.parse(config);
      const allowed = new Set(this.constructor.list);
      const filtered = {};

      for(const key in parsed){
        if(allowed.has(key)) filtered[key] = parsed[key];
      }

      this.config = filtered;
    }
    catch(e){
      console.warn(`${this.constructor.name}: invalid JSON in config.`,e);
      this.config = {};
    }
  }

  #onChange(e){
    const input = e.target;
    this.checked = input.checked;
  }

  render(){
    const config = this.config;

    return html`
    <input type="checkbox"
      id=${config.id || nothing}
      class=${config.class || nothing}
      name=${config.name || nothing}
      value=${config.value || nothing}

      .checked=${this.checked}
      .disabled=${this.disabled}
      .required=${this.required}
      @change=${this.#onChange}
    />
    <span></span>`;
  }
}
customElements.define('ui-switch',UISwitch);