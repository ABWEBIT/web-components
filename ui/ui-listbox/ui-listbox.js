import {UIBase} from '../ui-base/ui-base.js';

class UIListbox extends UIBase{
  #options = [];
  #selectedValue = null;
  #activeIndex = -1;

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
  }

  setOptions(options = []) {
    this.replaceChildren();
    this.#options = options;
    this.#activeIndex = -1;

    options.forEach(text => {
      const opt = document.createElement('div');
      opt.setAttribute('role', 'option');
      opt.setAttribute('tabindex', '-1'); // управляем фокусом вручную
      opt.textContent = text;

      opt.addEventListener('click', () => {
        this.#selectedValue = text;
        this.#activeIndex = [...this.children].indexOf(opt);
        this.highlightSelected();
        this.dispatchEvent(new CustomEvent('option-selected', {
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

    // При отрисовке ищем выбранное значение
    if (this.#selectedValue) {
      this.#activeIndex = options.indexOf(this.#selectedValue);
    }

    this.highlightSelected();
  }

  highlightSelected(){
    [...this.children].forEach((child, index) => {
      const isSelected = child.textContent === this.#selectedValue;
      const isActive = index === this.#activeIndex;

      child.setAttribute('aria-selected', isSelected ? 'true' : 'false');

      if(isActive){
        child.focus();
      }
    });
  }

  #onKeyDown = (e) => {
    const options = [...this.children];
    if(!options.length) return;

    if(e.key === 'ArrowDown'){
      e.preventDefault();
      this.#activeIndex = Math.min(this.#activeIndex + 1, options.length - 1);
      this.highlightSelected();
    }

    if(e.key === 'ArrowUp'){
      e.preventDefault();
      this.#activeIndex = Math.max(this.#activeIndex - 1, 0);
      this.highlightSelected();
    }

    if(e.key === 'Enter'){
      e.preventDefault();
      const active = options[this.#activeIndex];
      if (active) {
        const text = active.textContent;
        this.#selectedValue = text;
        this.highlightSelected();
        this.dispatchEvent(new CustomEvent('option-selected', {
          detail: {
            uuid: this.getAttribute('uuid'),
            value: text
          },
          bubbles: true,
          composed: true
        }));
      }
    }

    if(e.key === 'Escape'){
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('close-listbox', {
        detail: { uuid: this.getAttribute('uuid') },
        bubbles: true,
        composed: true
      }));
    }
  };

}
customElements.define('ui-listbox',UIListbox);