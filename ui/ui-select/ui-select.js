import {UIBase} from '../ui-base/ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UISelect extends UIBase{
  #uuid = uuid();
  #listboxListenerController = null;
  #componentListenerController = null;
  #listbox = null;
  #items = [];
  #text = '-';
  #iconName = 'arrow-down-small';
  #expanded = false;
  #disabled = false;

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'expanded':{name:'expanded',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
  });

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)){
      throw new Error('Items must be an array');
    }
    this.#items = value;

    if(this.#listbox){
      this.#listbox.options = this.#items;
    }
  }

  get text(){return this.#text;}
  set text(value){
    const valueNew = String(value || '');
    if(this.#text === valueNew) return;
    this.#text = valueNew;

    this.updateText('span',this.#text);
    this.reflect('text',this.#text);
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
      this.#listbox ??= this.#listboxCreate();
      this.#listbox.hidden = false;

      this.#listbox.setAttribute('tabindex','0');
      this.#listboxPosition();

      requestAnimationFrame(() => {
        const options = this.#listbox.querySelectorAll('[role="option"]:not([aria-disabled="true"])');
        const firstOption = options[0];

        if(firstOption){
          firstOption.focus();
        }
      });

      this.#listboxListenerController = new AbortController();

      document.addEventListener('click',this.#onDocumentClick,{
        capture: true,
        signal: this.#listboxListenerController.signal,
      });
      window.addEventListener('resize',this.#listboxPosition,{
        signal: this.#listboxListenerController.signal,
      });
    }
    else if(this.#listbox){
      this.#listbox.hidden = true;

      this.#listboxListenerController?.abort();
      this.#listboxListenerController = null;

      console.log(this.#listboxListenerController);
    }
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

    this.setAttributes(this,{
      'type': 'select',
      'role': 'combobox',
      'aria-haspopup': 'listbox',
      'aria-expanded': this.#expanded ? 'true' : 'false',
      'tabindex': this.#disabled ? '-1' : '0',
      'text': this.#text,
      'uuid': this.#uuid
    });

    const fragment = document.createDocumentFragment();

    if(this.#text){
      const span = document.createElement('span');
      span.textContent = this.#text;
      fragment.appendChild(span);
    }

    const iconName = this.getAttribute('icon') || this.#iconName;

    const icon = document.createElement('ui-icon');
    icon.setAttribute('icon',iconName);
    fragment.appendChild(icon);
    this.removeAttribute('icon');

    this.appendChild(fragment);

    // listeners
    this.#componentListenerController = new AbortController();

    window.addEventListener('popstate',this.#onPopState,{
      signal: this.#componentListenerController.signal
    });

    this.addEventListener('click',this.#onClick,{
      signal: this.#componentListenerController.signal
    });

    this.addEventListener('keydown',this.#onKeyDown,{
      signal: this.#componentListenerController.signal
    });
  }

  disconnectedCallback(){
    this.#componentListenerController?.abort();
    this.#componentListenerController = null;

    if(this.#listbox){
      this.#listbox.remove();
      this.#listbox = null;
    }
  }

  #listboxCreate = () =>{
    this.#listbox = document.createElement('ui-listbox');
    this.#listbox.style.position = 'absolute';

    this.setAttributes(this.#listbox,{
      'type': 'select',
      'uuid': this.#uuid
    });

    this.#listbox.options = this.#items;

    this.#listbox.addEventListener('option-selected', e => {

      if(e.detail.uuid === this.#uuid){

        this.text = e.detail.value;
        this.expanded = false;
        this.dispatchEvent(new CustomEvent('select-changed',{
          detail: {
            uuid: this.#uuid,
            value: e.detail.value
          },
          bubbles: true,
          composed: true,
        }));

      }

    });

    document.body.appendChild(this.#listbox);

    return this.#listbox;
  }

  #listboxToggle = () =>{
    this.expanded = !this.expanded;
  }

  #listboxPosition = () =>{
    if(!this.#listbox) return;
    const rect = this.getBoundingClientRect();

    Object.assign(this.#listbox.style, {
      top: `${rect.bottom + window.scrollY + 4}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`
    });
  }

  #onDocumentClick = (e) =>{
    const сlickInside = this.contains(e.target) || this.#listbox?.contains(e.target);
    if(!сlickInside){
      this.expanded = false;
    }
  }

  #onPopState = () =>{
    if(this.#expanded){
      this.expanded = false;
    }
  }

  #onClick = (e) =>{
    if(this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this.#listboxToggle();
  }

  #onKeyDown = (e) =>{
    if(this.#disabled) return;

    if(e.key === 'Enter' || e.key === ' ' || e.code === 'Space'){
      e.preventDefault();
      this.#listboxToggle();
    }

    if(!this.#expanded && e.key === 'ArrowDown') {
      e.preventDefault();
      this.#listboxToggle();
    }
  };

}
customElements.define('ui-select',UISelect);