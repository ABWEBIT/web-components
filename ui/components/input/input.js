import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UIInput extends LitElement{
  #input = null;

  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    clearable:{type:Boolean},
    config:{type:Object}
  };

  static list = ['id','class','type','name','value','placeholder'];

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

    this.clearable = this.hasAttribute('clearable');
  }

  firstUpdated(){
    this.#input = this.querySelector('input');
  }

  onClear(){
    this.#input.value = '';
  }

  render(){
    const config = this.config;

    return html`
    <input
      type=${config.type || 'text'}
      id=${config.id || nothing}
      class=${config.class || nothing}
      name=${config.name || nothing}
      value=${config.value || nothing}
      placeholder=${config.placeholder || nothing}

      .disabled=${this.disabled}
      .required=${this.required}
    >

      ${this.clearable ?
      html`
        <button
          config='{"type":"button"}'
          variant="text"
          color="gray"
          radius="full"
          @click=${this.onClear}
        >
        <ui-icon name="close"></ui-icon>
        </button>` : nothing}
      `;
  }
}
customElements.define('ui-input',UIInput);