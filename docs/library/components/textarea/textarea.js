import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UITextarea extends LitElement{
  #textarea = null;

  static properties = {
    disabled:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    readonly:{type:Boolean, reflect:true},
    value:{type:String, reflect:true},
    config:{type:Object}
  };

  static list = [
    'id',
    'class',
    'name',
    'placeholder',
    'rows',
    'cols',
    'maxlength',
    'minlength',
    'wrap',
    'autocomplete',
    'inputmode',
    'spellcheck',
    'autofocus'
  ];

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
    this.#textarea = this.getElementsByTagName('textarea')[0];
  }

  render(){
    const config = this.config;

    return html`
    <textarea
      id=${config.id || nothing}
      class=${config.class || nothing}
      name=${config.name || nothing}
      placeholder=${config.placeholder || nothing}

      rows=${config.rows || nothing}
      cols=${config.cols || nothing}
      maxlength=${config.maxlength || nothing}
      minlength=${config.minlength || nothing}
      wrap=${config.wrap || nothing}
      autocomplete=${config.autocomplete || nothing}
      inputmode=${config.inputmode || nothing}
      spellcheck=${config.spellcheck || nothing}
      ?autofocus=${config.autofocus ?? nothing}

      value=${config.value || nothing}
      ?disabled=${this.disabled}
      ?required=${this.required}
      ?readonly=${this.readonly}
    >${this.value || nothing}</textarea>`;
  }
}
customElements.define('ui-textarea',UITextarea);