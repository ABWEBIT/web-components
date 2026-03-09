import {LitElement,html,nothing,render} from '../../lit-core.min.js';

export class UIButton extends LitElement{
  static properties = {
    disabled:{type:Boolean, reflect:true},
    autofocus:{type:Boolean, reflect:true},
    busy:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  static list = ['id','class','aria-label'];

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

  firstUpdated(){
    const button = this.querySelector(':scope > button');
    const fragment = document.createDocumentFragment();

    for(let i = this.childNodes.length - 1; i >= 0; i--){
      const node = this.childNodes[i];
      if(node !== button) fragment.prepend(node);
    }

    button.append(fragment);
  }

  #onClick(e){

  }

  render(){
    const config = this.config;

    return html`
    <button type="button"
      id=${config.id || nothing}
      class=${config.class || nothing}
      name=${config.name || nothing}
      value=${config.value || nothing}

      .busy=${this.busy}
      .autofocus=${this.autofocus}
      .disabled=${this.disabled}
      @click=${this.#onClick}
    ></button>`;
  }
}
customElements.define('ui-button',UIButton);