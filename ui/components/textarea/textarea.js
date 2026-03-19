import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UITextarea extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  static list = ['id','class','name','value','placeholder'];

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

  render(){
    const config = this.config;

    return html`
    <textarea
      id=${config.id || nothing}
      class=${config.class || nothing}
      name=${config.name || nothing}
      value=${config.value || nothing}
      placeholder=${config.placeholder || nothing}

      .disabled=${this.disabled}
      .required=${this.required}>${this.value || nothing}</textarea>`;
  }
}
customElements.define('ui-textarea',UITextarea);