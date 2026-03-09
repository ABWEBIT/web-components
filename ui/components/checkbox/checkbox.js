import {LitElement,html,nothing} from '../../lit-core.min.js';

export class UICheckbox extends LitElement{
  #children = [];
  #isParent = null;
  #isChild = null;

  static properties = {
    checked:{type:Boolean, reflect:true},
    indeterminate:{type:Boolean, reflect:true},
    required:{type:Boolean, reflect:true},
    disabled:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  static list = ['id','class','name','value'];

  createRenderRoot(){return this;}

  connectedCallback(){
    super.connectedCallback();
    this.#isParent = this.hasAttribute('parent');
    this.#isChild = this.hasAttribute('child');

    if(this.#isParent && this.#isChild){
      console.warn('ui-checkbox cannot have both "parent" and "child" attributes',this);
    }

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

  willUpdate(changed){
    if(changed.has('checked') && this.checked) this.indeterminate = false;
    else if(changed.has('indeterminate') && this.indeterminate) this.checked = false;
  }

  #onChange(e){
    this.checked = e.target.checked;
    this.indeterminate = false;

    if(this.#isParent) this.#updateChildren();
    else if(this.#isChild) this.#updateParent();
  }

  firstUpdated(){
    if(this.#isParent){
      const parentName = this.getAttribute('parent');
      if(!parentName) return;

      document.addEventListener('register-child',e =>{
        const child = e.detail.this;
        const childName = child.getAttribute('child');
        if(childName === parentName && !this.#children.includes(child)){
          this.#children.push(child);
          const childInput = child.getElementsByTagName('input')[0];
          childInput.addEventListener('change',() => this.#updateParent());
          this.#updateParent();
        }
      });
    }
    else if(this.#isChild){
      this.dispatchEvent(new CustomEvent('register-child',{
        detail:{this:this},
        bubbles:true,
        composed:true
      }));
    }
  }

  #updateParent(){
    if(!this.#children.length) return;

    const allChecked = this.#children.every(c => c.checked);
    const someChecked = this.#children.some(c => c.checked || c.indeterminate);

    this.checked = allChecked;
    this.indeterminate = !allChecked && someChecked;
  };

  #updateChildren(){
    this.#children.forEach(child =>{
      child.checked = this.checked;
      child.indeterminate = false;
    });
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
      .indeterminate=${this.indeterminate}
      .disabled=${this.disabled}
      .required=${this.required}
      @change=${this.#onChange}
    />
    <span></span>`;
  }
}
customElements.define('ui-checkbox',UICheckbox);