import {UIBase} from '../ui-base/ui-base.js';

class UIListbox extends UIBase{
  #options = [];
  #selectedValue = null;
  #activeIndex = -1;
  #activeElement = null;

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

    this.addEventListener('keydown',this.#onKeyDown);
    requestAnimationFrame(() => {
      this.focus();
    });
  }

  setOptions(options = []){
    if(!Array.isArray(options)){
      throw new Error('Options must be an array');
    }

    this.replaceChildren();
    this.#options = options;
    this.#activeIndex = -1;
    this.#activeElement = null;
    this.#selectedValue = null;

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

      if (selected && !disabled) {
        this.#selectedValue = value;
        this.#activeIndex = index;
      }

      opt.addEventListener('click', () => {
        if (disabled) return;

        this.#selectedValue = value;
        this.#activeIndex = index;
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
    const newActive = this.children[this.#activeIndex];
    
    if(this.#activeElement !== newActive){
      this.#activeElement?.setAttribute('aria-selected', 'false');
      newActive?.setAttribute('aria-selected', 'true');
      this.#activeElement = newActive ?? null;
    }
  }

  #onKeyDown = (e) => {
    const maxIndex = this.#options.length - 1;
    if(maxIndex < 0) return;

    const moveTo = (direction) => {
      let index = this.#activeIndex;
      do{
        index += direction;
        if(index < 0 || index > maxIndex) break;

        const item = this.#options[index];
        if(item.disabled !== true){
          this.#activeIndex = index;
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
      const item = this.#options[this.#activeIndex];
      if (!item || item.disabled === true) return;

      this.#selectedValue = item.value;
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