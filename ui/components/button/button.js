import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UIButton extends LitElement{
  #spinner = null;
  #button = null;

  static properties = {
    disabled:{type:Boolean, reflect:true},
    autofocus:{type:Boolean, reflect:true},
    busy:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  static list = [
    'id',
    'class',
    'type',
    'role',
    'name',
    'value',
    'accesskey',
    'aria-label'
  ];

  createRenderRoot(){return this;}

  connectedCallback(){
    super.connectedCallback();

    this.busy = this.hasAttribute('busy');

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

  updated(changed){
    if(changed.has('busy')){
      this.busyState(this.busy);
    }
  }

  busyState(isBusy){
    if(!this.#button) return;

    this.disabled = this.disabled || isBusy;

    if(isBusy){
      this.#spinner = document.createElement('ui-spinner');
      this.append(this.#spinner);
    }
    else{
      if(this.#spinner){
        this.#spinner.remove();
        this.#spinner = null;
      }
    }
  }

  firstUpdated(){
    this.#button = this.getElementsByTagName('button')[0];
    const fragment = document.createDocumentFragment();

    for(let i = this.childNodes.length - 1; i >= 0; i--){
      const node = this.childNodes[i];
      if(node !== this.#button) fragment.prepend(node);
    }
    this.#button.append(fragment);

    //if(!this.hasAttribute('variant')) this.setAttribute('variant','solid');
    if(!this.hasAttribute('color') && !this.disabled) this.setAttribute('color','white');
  }

  render(){
    const config = this.config;

    return html`
    <button
      type=${config.type || "button"}
      id=${config.id || nothing}
      class=${config.class || nothing}
      name=${config.name || nothing}
      value=${config.value || nothing}

      .autofocus=${this.autofocus}
      .disabled=${this.disabled}
    ></button>`;
  }
}
customElements.define('ui-button',UIButton);