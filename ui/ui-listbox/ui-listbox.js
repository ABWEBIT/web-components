import {UIBase} from '../ui-base/ui-base.js';

class UIListbox extends UIBase{
  #options = [];
  #indexActive = -1;
  #indexCurrent = null;
  #componentListenerController = null;

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

    requestAnimationFrame(() => this.focus());

    this.#componentListenerController = new AbortController();

    this.addEventListener('keydown',this.#onKeyDown,{
      signal: this.#componentListenerController.signal
    });
  }

  disconnectedCallback(){
    this.#componentListenerController?.abort();
    this.#componentListenerController = null;
  }

  setOptions(options = []){
    if(!Array.isArray(options)){
      throw new Error('Options must be an array');
    }

    this.replaceChildren();
    this.#options = options;
    this.#indexActive = -1;
    this.#indexCurrent = null;

    options.forEach((item, index) => {
      if(typeof item !== 'object' || item === null){
        throw new Error('Each option must be an object with {label, value}');
      }

      const {label,value,selected,disabled} = item;

      const opt = document.createElement('div');
      this.setAttributes(opt,{
        'role': 'option',
        'tabindex': '-1',
        'aria-disabled': disabled ? 'true' : 'false'
      });
      opt.textContent = label;
      opt.dataset.value = value;

      if(selected && !disabled){
        this.#indexActive = index;
      }

      opt.addEventListener('click', () => {
        if(disabled) return;

        this.#indexActive = index;
        this.selectedHighlight();

        this.dispatchEvent(new CustomEvent('option-selected', {
          detail: {
            uuid: this.getAttribute('uuid'),
            value: item.label
          },
          bubbles: true,
          composed: true
        }));
      });

      this.appendChild(opt);
    });

    this.selectedHighlight();
  }

  selectedHighlight(){
    const newActive = this.children[this.#indexActive];
    
    if(this.#indexCurrent !== newActive){
      this.#indexCurrent?.setAttribute('aria-selected', 'false');
      newActive?.setAttribute('aria-selected', 'true');
      this.#indexCurrent = newActive ?? null;
    }
  }

  #onKeyDown = (e) => {
    const indexMax = this.#options.length - 1;
    if(indexMax < 0) return;

    const moveTo = (direction) => {
      let index = this.#indexActive;
      do{
        index += direction;
        if(index < 0 || index > indexMax) break;

        const item = this.#options[index];
        if(item.disabled !== true){
          this.#indexActive = index;
          this.selectedHighlight();
          break;
        }
      }
      while(true);
    };

    if(e.key === 'ArrowDown'){
      e.preventDefault();
      moveTo(1);
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault();
      moveTo(-1);
    }

    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      const item = this.#options[this.#indexActive];
      if (!item || item.disabled === true) return;

      this.selectedHighlight();

      this.dispatchEvent(new CustomEvent('option-selected', {
        detail: {
          uuid: this.getAttribute('uuid'),
          value: item.label
        },
        bubbles: true,
        composed: true
      }));

    }
  }

}
customElements.define('ui-listbox',UIListbox);