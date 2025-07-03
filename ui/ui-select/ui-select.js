import {UIBase} from '../ui-base/ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UISelect extends UIBase{
  #uuid = uuid();
  #listbox;
  #items = [];
  #text = '-';
  #iconCombobox = 'arrow-down-small';
  #expanded = false;
  #disabled = false;

  #listboxToggle = this.listboxToggle.bind(this);
  #listboxPosition = this.listboxPosition.bind(this);

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'icon-combobox':{name:'iconCombobox',type:String,reflect:true},
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
    if(!(this.#text = String(value || ''))) return;
    this.updateText('span',this.#text);
    this.reflect('text',this.#text);
  }

  get iconCombobox(){return this.#iconCombobox;}
  set iconCombobox(value){
    if(!(this.#iconCombobox = String(value || ''))) return;
    this.updateIcon('ui-icon',this.#iconCombobox);
    this.reflect('icon-combobox',this.#iconCombobox);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.setAttributes(this,{
      'tabindex': this.#disabled ? '-1' : '0',
      'aria-disabled': this.#disabled ? 'true' : 'false'
    });
  }

  get expanded(){return this.#expanded;}
  set expanded(value){
    this.#expanded = value === true;
    this.reflect('expanded',this.#expanded);
    this.setAttributes(this,{
      'aria-expanded': this.#expanded ? 'true' : 'false'
    });

    if(this.#expanded){
      this.#listbox ??= this.createListbox();
      this.#listbox.hidden = false;

      this.listboxPosition();

      document.addEventListener('click',this.#onDocumentClick,true);
      window.addEventListener('resize',this.#listboxPosition);
    }
    else if(this.#listbox){
      this.#listbox.hidden = true;

      document.removeEventListener('click',this.#onDocumentClick,true);
      window.removeEventListener('resize',this.#listboxPosition);
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

    if(this.#iconCombobox){
      const icon = document.createElement('ui-icon');
      icon.setAttribute('icon',this.#iconCombobox);
      fragment.appendChild(icon);
    }

    this.appendChild(fragment);

    this.addEventListener('click',this.#listboxToggle);
    window.addEventListener('popstate', this.#onPopState);

  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#listboxToggle);
    window.removeEventListener('popstate', this.#onPopState);
  }

  createListbox(){
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
        //this.expanded = false;
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

  listboxToggle(){
    this.expanded = !this.expanded;
  }

  listboxPosition(){
    if(!this.#listbox) return;
    const rect = this.getBoundingClientRect();

    Object.assign(this.#listbox.style, {
      top: `${rect.bottom + window.scrollY + 4}px`,
      left: `${rect.left + window.scrollX}px`,
      width: `${rect.width}px`
    });
  }

  #onDocumentClick = (e) =>{
    if(!this.contains(e.target) && !this.#listbox.contains(e.target)) {
      this.expanded = false;
    }
  }

  #onPopState = () =>{
    if(this.#expanded){
      this.expanded = false;
    }
  }

}
customElements.define('ui-select',UISelect);