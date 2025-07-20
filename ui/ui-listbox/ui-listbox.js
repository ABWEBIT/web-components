import {UIBase} from '../ui-base.js';

class UIListbox extends UIBase{
  #listeners = null;
  #options = [];
  #indexActive = -1;
  #indexCurrent = null;


  get options(){return this.#options;}
  set options(value){
    this.setOptions(value);
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

    this.setAttributes(this,{
      'role': 'listbox'
    });

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('keydown',this.#onKeyDown,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  setOptions(options = []){
    if(!Array.isArray(options)){
      throw new Error('Options must be an array');
    }

    this.replaceChildren();
    this.#options = options;
    this.#indexActive = -1;
    this.#indexCurrent = null;

    options.forEach((item,index) => {
      if(typeof item !== 'object' || item === null){
        throw new Error('Each option must be an object with {label, value}');
      }

      const {label,value,selected,disabled} = item;
      const option = document.createElement('div');

      const id = `${this.id}--option-${index}`;

      this.setAttributes(option,{
        'role': 'option',
        'tabindex': '-1',
        'aria-disabled': disabled ? 'true' : 'false',
        'aria-selected': selected ? 'true' : 'false',
        'data-active': 'false',
        'id': id
      });

      option.dataset.value = value;

      const optionText = document.createElement('span');
      optionText.textContent = label;
      option.appendChild(optionText);

      if(selected){
        const optionSelectedIcon = document.createElement('ui-icon');
        optionSelectedIcon.setAttribute('icon','check');
        option.appendChild(optionSelectedIcon);
      }

      if(selected && !disabled){
        this.#indexActive = index;
      }

      option.addEventListener('click', () => {
        if(disabled) return;

        this.#indexActive = index;
        this.selectedHighlight();

        this.dispatchEvent(new CustomEvent('option-selected', {
          detail: {
            label: item.label,
            value: item.value,
            id
          },
          bubbles: true,
          composed: true
        }));
      });

      this.appendChild(option);
    });

    this.selectedHighlight();
  }

  selectedHighlight(){
    const newActive = this.children[this.#indexActive];
    
    if(this.#indexCurrent !== newActive){
      this.#indexCurrent?.setAttribute('data-active','false');
      newActive?.setAttribute('data-active','true');
      this.#indexCurrent = newActive ?? null;
    }
  }

  onKeyDownExternal(e){
    this.#onKeyDown(e);
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
      if(!item || item.disabled === true) return;

      this.selectedHighlight();

      const optionElement = this.children[this.#indexActive];
      const id = optionElement?.id ?? '';

      this.dispatchEvent(new CustomEvent('option-selected',{
        detail: {
          label: item.label,
          value: item.value,
          id
        },
        bubbles: true,
        composed: true
      }));

    }
  }

}
customElements.define('ui-listbox',UIListbox);