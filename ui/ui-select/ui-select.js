import {UIBase} from '../ui-base/ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UISelect extends UIBase{
  #uuid = uuid();
  #listbox;
  #text = '-';
  #iconCombobox = 'arrow-down-small';
  #expanded = false;
  #disabled = false;

  #listboxToggle = this.listboxToggle.bind(this);
  #listboxPosition = this.listboxPosition.bind(this);

  static properties = Object.freeze({
    'text':{name:'text',type:String},
    'icon-combobox':{name:'iconCombobox',type:String,reflect:true},
    'expanded':{name:'expanded',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
  });

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
    this.height(32);

    this.setAttributes(this,{
      'type': 'select',
      'role': 'combobox',
      'aria-haspopup': 'listbox',
      'aria-expanded': this.#expanded ? 'true' : 'false',
      'tabindex': this.#disabled ? '-1' : '0',
      'uuid': this.#uuid
    });

    const fragment = document.createDocumentFragment();

    if(this.#text){
      const span = document.createElement('span');
      fragment.appendChild(span);
    }

    if(this.#iconCombobox){
      const icon = document.createElement('ui-icon');
      this.setAttributes(icon,{
        'icon': this.#iconCombobox
      });
      fragment.appendChild(icon);
    }

    this.appendChild(fragment);

    this.addEventListener('click',this.#listboxToggle);
    //window.addEventListener('resize', () => this.hideListbox());
    //window.addEventListener('scroll', () => this.hideListbox(), true);

  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#listboxToggle);
  }

  createListbox(){
    this.#listbox = document.createElement('ui-listbox');
    this.#listbox.style.position = 'absolute';

    this.setAttributes(this.#listbox,{
      'type': 'select',
      'uuid': this.#uuid
    });

    // static
    ['Option 1', 'Option 2', 'Option 3'].forEach((text, i) => {
      const opt = document.createElement('div');
      opt.setAttribute('role', 'option');
      opt.textContent = text;
      opt.addEventListener('click', () => {
        this.text = text;
        this.expanded = false;
      });
      this.#listbox.appendChild(opt);
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
    this.#listbox.style.top = `${rect.bottom + window.scrollY + 4}px`;
    this.#listbox.style.left = `${rect.left + window.scrollX}px`;
    this.#listbox.style.minWidth = `${rect.width}px`;
  }

  #onDocumentClick = (e) =>{
    if(!this.contains(e.target) && !this.#listbox.contains(e.target)) {
      this.expanded = false;
    }
  }

}
customElements.define('ui-select',UISelect);