import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UISelect extends UIBase {
  #data = null;
  #text = '';
  #textDefault = '-';
  #iconExpand = 'arrow-down-small';
  #expanded = false;
  #disabled = false;
  #listboxId = `id-${uuid()}`;
  #indexActive = -1;
  #indexCurrent = null;
  #listbox = null;
  #listboxListeners = null;

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'expanded':{name:'expanded',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
  });

  get data(){return this.#data;}
  set data(value){
    if(!Array.isArray(value)) throw new Error('Data must be an array');
    this.#data = value.map((item,index) =>({
      ...item,
      id:`${this.#listboxId}--option-${index}`
    }));

    this.#listboxRender();

    const selected = this.#data.find(i => i.selected);
    if(selected){
      this.text = selected.label;
      this.setAttribute('aria-activedescendant',selected.id);
    }
    else{
      this.text = this.getAttribute('placeholder') || this.#textDefault;
      this.removeAttribute('aria-activedescendant');
    }
  }

  get text(){return this.#text;}
  set text(value){
    const valueNew = String(value || '');
    if(this.#text === valueNew) return;
    this.#text = valueNew;
    this.updateText('[data-ui="select-text"]',this.#text);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.reflect('disabled', this.#disabled);
    this.#syncDisabled();
  }

  get expanded() { return this.#expanded; }
  set expanded(value) {
    const valueNew = value === true;
    if (this.#expanded === valueNew) return;
    this.#expanded = valueNew;

    this.reflect('expanded', this.#expanded);
    this.ariaExpanded = this.#expanded ? 'true' : 'false';

    if (!this.#listbox) return;

    if (this.#expanded) {
      this.#listbox.hidden = false;
      this.#listboxPosition();

      this.#listboxListeners = new AbortController();
      const signal = this.#listboxListeners.signal;

      document.addEventListener('click', this.#onDocumentClick, { capture: true, signal });
      document.addEventListener('keydown', this.#onDocumentKeydown, { capture: true, signal });
      window.addEventListener('resize', this.#onWindowResize, { signal });
      window.addEventListener('scroll', this.#onWindowResize, { capture: true, signal });

      if (this.#indexActive >= 0) this.#highlight();
    } else {
      this.#listbox.hidden = true; // 👈 теперь всегда прячем!
      this.#listboxListeners?.abort();
      this.#listboxListeners = null;
      try { this.focus(); } catch {}
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.role = 'combobox';
    this.tabIndex = this.#disabled ? '-1' : '0';
    this.ariaExpanded = this.#expanded ? 'true' : 'false';
    this.ariaHasPopup = 'listbox';
    this.setAttribute('aria-controls', this.#listboxId);

    const fragment = document.createDocumentFragment();

    const selectText = document.createElement('div');
    selectText.setAttribute('data-ui', 'select-text');
    selectText.textContent = this.getAttribute('placeholder') || this.#textDefault;
    fragment.append(selectText);

    const selectIconExpand = document.createElement('div');
    selectIconExpand.setAttribute('data-ui', 'select-icon-expand');
    const iconName = this.getAttribute('icon') || this.#iconExpand;
    const icon = document.createElement('ui-icon');
    icon.setAttribute('icon', iconName);
    selectIconExpand.append(icon);
    fragment.append(selectIconExpand);
    this.removeAttribute('icon');

    this.#listbox = document.createElement('div');
    this.#listbox.setAttribute('data-ui', 'listbox');
    this.#listbox.setAttribute('role', 'listbox');
    this.#listbox.id = this.#listboxId;
    this.#listbox.hidden = true;
    this.#listbox.style.position = 'absolute';

    this.#listbox.style.zIndex = '9999';
    document.body.append(this.#listbox);

    this.append(fragment);

    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.#listboxListeners?.abort();
    this.#listboxListeners = null;
    if (this.#listbox) {
      this.#listbox.remove();
      this.#listbox = null;
    }

    window.removeEventListener('resize', this.#onWindowResize);
    window.removeEventListener('scroll', this.#onWindowResize, true);
  }

  #syncDisabled = () =>{
    if(this.#disabled) this.ariaDisabled = true
    else this.ariaDisabled = null;
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  #listboxPosition() {
    if (!this.#listbox) return;
    const rect = this.getBoundingClientRect();

    Object.assign(this.#listbox.style,{
      top: `${rect.bottom + window.scrollY + 6}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`
    });
  }

  #listboxRender() {
    if (!this.#listbox) return;
    this.#listbox.replaceChildren();
    this.#indexActive = -1;
    this.#indexCurrent = null;

    this.#data.forEach((item, index) => {
      const {label = item.label ?? '', value = item.value, selected = item.selected, disabled = item.disabled, id = item.id } = item;
      const option = document.createElement('div');
      option.setAttribute('role', 'option');
      option.tabIndex = -1;
      option.setAttribute('aria-disabled', disabled ? 'true' : 'false');
      option.setAttribute('aria-selected', selected ? 'true' : 'false');
      option.id = id;
      option.dataset.active = 'false';
      if (value !== undefined) option.dataset.value = value;

      const text = document.createElement('span');
      text.textContent = label || String(item.label || '');
      option.append(text);

      if(selected){
        const check = document.createElement('ui-icon');
        check.setAttribute('icon','check');
        option.append(check);
        if(!disabled) this.#indexActive = index;
      }

      option.addEventListener('click',(ev) =>{
        if (disabled) return;
        this.#indexActive = index;
        this.#highlight();
        this.dispatchEvent(new CustomEvent('option-selected',{
          detail: {label: item.label, value: item.value, id},
          bubbles: true,
          composed: true
        }));
        this.text = item.label;
        this.setAttribute('aria-activedescendant',id);
        this.expanded = false;
      });

      this.#listbox.append(option);
    });

    this.#highlight();
  }

  #highlight(){
    if(!this.#listbox) return;

    const newActive = this.#listbox.children[this.#indexActive];
    if(this.#indexCurrent !== newActive) {
      this.#indexCurrent?.setAttribute('data-active','false');
      newActive?.setAttribute('data-active','true');
      this.#indexCurrent = newActive ?? null;
    }
  }

  #onClick = (e) =>{
    if(this.disabled) return;
    e.preventDefault();
    this.expanded = !this.expanded;
  }

  #onKeyDown = (e) =>{
    if(this.#disabled) return;

    const indexMax = this.#data.length - 1;
    const moveTo = (dir) =>{
      let index = this.#indexActive;
      do{
        index += dir;
        if(index < 0 || index > indexMax) break;
        if(!this.#data[index].disabled){
          this.#indexActive = index;
          this.#highlight();
          break;
        }
      }
      while(true);
    };

    if(!this.#expanded && (e.key === 'Enter' || e.key === ' ')){
      e.preventDefault();
      this.expanded = true;
    }
    else if(this.#expanded){
      const handleSelection = () =>{
        const item = this.#data[this.#indexActive];
        if (item && !item.disabled) {
          this.value = item.value;
          this.text = item.label;
          this.setAttribute('aria-activedescendant',item.id);
          this.expanded = false;

          this.dispatchEvent(new Event('input',{bubbles:true,composed:true}));
          this.dispatchEvent(new Event('change',{bubbles:true,composed:true}));
        }
      };

      switch(e.key){
        case 'ArrowDown':
          e.preventDefault();
          moveTo(1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveTo(-1);
          break;
        case 'Escape':
          e.preventDefault();
          this.expanded = false;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleSelection();
          break;
        default:
          return;
      }
    }
  }

  #onDocumentClick = (e) =>{
    const clickInside = this.contains(e.target) || this.#listbox?.contains(e.target);
    if(!clickInside){
      this.expanded = false;
    }
  }

  #onDocumentKeydown = (e) =>{
    if(e.key === 'Escape'){
      e.preventDefault();
      this.expanded = false;
    }
  }

  #onWindowResize = () => {
    if(this.#expanded) this.#listboxPosition();
  }
}

customElements.define('ui-select', UISelect);
