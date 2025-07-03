import {UIBase} from '../ui-base/ui-base.js';

class UIListbox extends UIBase{
  #selectedValue = null;
  #options = [];

  get options(){return this.#options;}
  set options(value){
    if(!Array.isArray(value)) {
      throw new Error('Options must be an array');
    }
    this.#options = value;
    this.setOptions(this.#options);
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

    this.setAttributes(this,{
      'role': 'listbox'
    });
  }

  setOptions(options = []){
    this.replaceChildren();

    options.forEach(text => {
      const opt = document.createElement('div');
      opt.setAttribute('role','option');
      
      this.setAttributes(opt,{
        'aria-selected': text === this.#selectedValue ? 'true' : 'false'
      });


      opt.textContent = text;
      opt.addEventListener('click', () => {
        this.#selectedValue = text;
        this.highlightSelected();
        this.dispatchEvent(new CustomEvent('option-selected',{
          detail: {
            uuid: this.getAttribute('uuid'),
            value: text
          },
          bubbles: true,
          composed: true
        }));
      });
      this.appendChild(opt);
    });
  }

  highlightSelected() {
    [...this.children].forEach(child => {
      if(child.getAttribute('role') === 'option') {
        child.setAttribute('aria-selected', child.textContent === this.#selectedValue ? 'true' : 'false');
      }
    });
  }

}
customElements.define('ui-listbox',UIListbox);