import {UIBase} from '../ui-base/ui-base.js';

class UISelect extends UIBase{
  #listbox;
  #text = '';
  #placeholder = '-';
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
      'role': 'combobox',
      'aria-haspopup': 'listbox',
      'aria-expanded': this.#expanded ? 'true' : 'false',
      'tabindex': this.#disabled ? '-1' : '0',
    });

    this.innerHTML = `
      <span>${this.#placeholder}</span>
      <ui-icon icon="${this.#iconCombobox}"></ui-icon>
    `;

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

    // static
    ['Option 1', 'Option 2', 'Option 3'].forEach((text, i) => {
      const opt = document.createElement('div');
      opt.setAttribute('role', 'option');
      opt.textContent = text;
      opt.addEventListener('click', () => {
        //this.selectOption(text);
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