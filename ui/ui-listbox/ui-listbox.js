import {UIBase} from '../ui-base/ui-base.js';

class UIListbox extends UIBase{
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
      opt.textContent = text;
      opt.addEventListener('click', () => {
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

}
customElements.define('ui-listbox',UIListbox);