import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UICheckbox extends LitElement{
  static properties = {
    checked:{type:Boolean, reflect:true},
    indeterminate:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    disabled:{type:Boolean, reflect:true},
    options:{type:Object}
  };

  static list = ['id','name','value','class'];

  createRenderRoot(){return this;}

  connectedCallback(){
    super.connectedCallback();
    const options = this.getAttribute('options');
    if(!options){
      this.options = {};
      return;
    }
    try{
      const parsed = JSON.parse(options);
      const allowed = new Set(this.constructor.list);
      const filtered = {};

      for(const key in parsed){
        if(allowed.has(key)) filtered[key] = parsed[key];
      }

      this.options = filtered;
    }
    catch(e){
      console.warn('UICheckbox: invalid JSON in options', e);
      this.options = {};
    }
  }

  willUpdate(changed){
    if(changed.has('checked') && this.checked) this.indeterminate = false;
    else if(changed.has('indeterminate') && this.indeterminate) this.checked = false;
  }

  #onChange(e){
    this.checked = e.target.checked;
    this.indeterminate = false;
  }

  render(){
    const options = this.options;

    return html`
    <input type="checkbox"
      id=${options.id || nothing}
      class=${options.class || nothing}
      name=${options.name || nothing}
      value=${options.value || nothing}

      .checked=${this.checked}
      .indeterminate=${this.indeterminate}
      .disabled=${this.disabled}
      .required=${this.required}
      @change=${this.#onChange}
    />
    <span></span>`;
  }
}
customElements.define('ui-checkbox',UICheckbox);