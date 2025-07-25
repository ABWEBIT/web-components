import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UISelect extends UIBase{
  #listboxListenerController = null;
  #componentListenerController = null;
  #listbox = null;
  #listboxId = `id-${uuid()}`;
  #items = [];
  #text = '';
  #textDefault = '-';
  #iconExpand = 'arrow-down-small';
  #expanded = false;
  #disabled = false;

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'expanded':{name:'expanded',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
  });

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');

    let selected = null;

    this.#items = value.map((item, index) => {
      const itemNew = {
        ...item,
        id: `${this.#listboxId}--option-${index}`
      };
      if(itemNew.selected){
        if(selected) throw new Error('Only one item can be selected');
        selected = itemNew;
      }
      return itemNew;
    });

    if(this.#listbox) this.#listbox.options = this.#items;

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
    const valueNew = value === true;
    if(this.#disabled === valueNew) return;
    this.#disabled = valueNew;

    this.reflect('disabled',this.#disabled);
    this.setAttributes(this,{
      'tabindex': this.#disabled ? '-1' : '0',
      'aria-disabled': this.#disabled ? 'true' : 'false'
    });
  }

  get expanded(){return this.#expanded;}
  set expanded(value){
    const valueNew = value === true;
    if(this.#expanded === valueNew) return;
    this.#expanded = valueNew;

    this.reflect('expanded',this.#expanded);
    this.setAttributes(this,{
      'aria-expanded': this.#expanded ? 'true' : 'false'
    });

    if(this.#expanded){
      this.#listboxCreate();

      this.#listboxListenerController = new AbortController();

      document.addEventListener('click',this.#onDocumentClick,{
        capture: true,
        signal: this.#listboxListenerController?.signal,
      });

      document.addEventListener('keydown',this.#onEscapeDocument,{
        capture: true,
        signal: this.#listboxListenerController?.signal,
      });

      window.addEventListener('resize',this.#listboxPosition,{
        signal: this.#listboxListenerController?.signal,
      });

    }
    else{
      this.#listboxListenerController?.abort();
      this.#listboxListenerController = null;

      if(this.#listbox){
        this.#listbox.remove();
        this.#listbox = null;
      }
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttributes(this,{
      'role': 'combobox',
      'tabindex': this.#disabled ? '-1' : '0',
      'aria-haspopup': 'listbox',
      'aria-expanded': this.#expanded ? 'true' : 'false',
      'aria-controls': this.#listboxId
    });

    const fragment = document.createDocumentFragment();

    const selectText = document.createElement('div');
    selectText.setAttribute('data-ui','select-text');
    selectText.textContent = this.getAttribute('placeholder') || this.#textDefault;
    fragment.appendChild(selectText);

    const selectIconExpand = document.createElement('div');
    selectIconExpand.setAttribute('data-ui','select-icon-expand');

    const iconName = this.getAttribute('icon') || this.#iconExpand;

    const icon = document.createElement('ui-icon');
    icon.setAttribute('icon',iconName);
    selectIconExpand.appendChild(icon);

    fragment.appendChild(selectIconExpand);
    this.removeAttribute('icon');

    this.appendChild(fragment);

    this.#componentListenerController = new AbortController();
    const signal = this.#componentListenerController.signal;

    window.addEventListener('popstate',this.#onPopState,{signal});
    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});
/*
    this.addEventListener('focusout',this.#onFocusOut,{signal});
*/
  }

  disconnectedCallback(){
    this.#listboxListenerController?.abort();
    this.#listboxListenerController = null;
    this.#componentListenerController?.abort();
    this.#componentListenerController = null;

    if(this.#listbox){
      this.#listbox.remove();
      this.#listbox = null;
    }
  }

  #listboxCreate = () =>{
    this.#listbox = document.createElement('ui-listbox');

    this.setAttributes(this.#listbox,{
      'tabindex': '-1',
      'id': this.#listboxId
    });

    const items = this.#items.map(item => ({
      ...item,
      selected: item.label === this.#text
    }));

    this.#listbox.options = items;

    this.#listbox.addEventListener('option-selected', e => {
      this.text = e.detail.label;
      this.setAttribute('aria-activedescendant',e.detail.id);
      this.expanded = false;
    });

    this.#listbox.addEventListener('active-descendant-change', e => {
      this.setAttribute('aria-activedescendant', e.detail.id || '');
    });

    document.body.appendChild(this.#listbox);
    this.#listboxPosition();

    return this.#listbox;
  }

  #listboxToggle = () => {
    this.expanded = !this.expanded;
  }

  #listboxPosition = () => {
    if(!this.#listbox) return;
    const rect = this.getBoundingClientRect();

    Object.assign(this.#listbox.style, {
      top: `${rect.bottom + window.scrollY + 4}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`
    });
  }

  #onDocumentClick = (e) => {
    const clickInside = this.contains(e.target) || this.#listbox?.contains(e.target);
    if(!clickInside){
      this.expanded = false;
    }
  }

  #onEscapeDocument = (e) => {
    if(e.key === 'Escape'){
      e.preventDefault();
      this.expanded = false;
    }
  }

  #onFocusOut = (e) => {
    const related = e.relatedTarget;
    const inside = this.contains(related) || this.#listbox?.contains(related);

    if(!inside){
      this.expanded = false;
    }
  }

  #onPopState = () => {
    this.expanded &&= false;
  }

  #onClick = (e) => {
    if(this.disabled) return;
    e.preventDefault();
    this.#listboxToggle();
  }

  #onKeyDown = (e) => {
    if(this.#disabled) return;

    if(!this.#expanded && (e.key === 'Enter' || e.key === ' ')){
      e.preventDefault();
      this.#listboxToggle();
    }
    else if(this.#expanded && this.#listbox?.onKeyDownExternal){
      this.#listbox.onKeyDownExternal(e);
    }
  }

}
customElements.define('ui-select',UISelect);