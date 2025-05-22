import {UIBase} from '../ui-base/ui-base.js';

class UISelect extends UIBase{
  #text = '';
  #placeholder = '-';
  #shapeDefault = 'rounded';
  #shapeTypes = ['rounded','pill','square'];
  #iconCombobox = 'arrow-down-small';
  #expanded = true;
  #disabled = false;

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'icon-combobox':{name:'iconCombobox',type:String,reflect:true},
    'expanded':{name:'expanded',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
  });

  get text(){return this.#text;}
  set text(value){
    if(!(this.#text = String(value || ''))) return;
    this.updateText('[role="combobox"]',this.#text);
    this.reflect('text',this.#text);
  }

  get iconCombobox(){return this.#iconCombobox;}
  set iconCombobox(value){
    if(!(this.#iconCombobox = String(value || ''))) return;
    this.updateIcon('[icon-combobox]',this.#iconCombobox);
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
    this.setAttributes('[role="combobox"]',{
      'aria-expanded': this.#expanded ? 'true' : 'false'
    });
  }

  connectedCallback(){
    super.connectedCallback();

    const shape = this.getAttribute('shape');
    if(!shape || !this.#shapeTypes.includes(shape)){
      this.setAttribute('shape',this.#shapeDefault);
    }

    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <div role="combobox" aria-haspopup="listbox">
        <span></span>
        <ui-icon combobox-icon></ui-icon>
      </div>
      <div role="listbox">
        <div id="opt1" role="option" aria-selected="true">Option 1</div>
        <div id="opt2" role="option" aria-selected="false">Option 2</div>
        <div id="opt3" role="option" aria-selected="false">Option 3</div>
        <div id="opt4" role="option" aria-selected="false">Option 4</div>
      </div>
    `;

    const combobox = this.querySelector('[role="combobox"]');
    const listbox = this.querySelector('[role="listbox"]');

    this.updateIcon('[combobox-icon]',this.#iconCombobox);

    let placeholder = this.getAttribute('placeholder');
    const comboboxText = this.querySelector('[role="combobox"] span');

    
    comboboxText.textContent = this.#placeholder;






  }

}
customElements.define('ui-select',UISelect);