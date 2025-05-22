import {UIBase} from '../ui-base/ui-base.js';

class UISelect extends UIBase{
  #text = '';
  #shape = 'rounded';
  #shapeTypes = ['rounded','pill','square'];
  #disabled = false;

  static properties = Object.freeze({
    'text':{name:'text',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true},
  });

  get text(){return this.#text;}
  set text(value){
    if(!(this.#text = String(value || ''))) return;
    this.updateText('ui-button',this.#text);
    this.reflect('text',this.#text);
    this.setAttributes(this,{
      'aria-label': this.#text
    });
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

  connectedCallback(){
    super.connectedCallback();

    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    const shape = this.getAttribute('shape');
    if(!shape || !this.#shapeTypes.includes(shape)){
      this.setAttribute('shape',this.#shape);
    }

    const buttonId = 'ui-select-trigger';
    const listboxId = 'ui-select-options';

    this.innerHTML = `
      <ui-button id="${buttonId}" text="Select" height="${height}"></ui-button>
      <div id="${listboxId}" role="listbox">
        <div id="opt1" role="option" aria-selected="true">Option 1</div>
        <div id="opt2" role="option" aria-selected="false">Option 2</div>
      </div>
    `;

    const button = this.querySelector('ui-button');
    const listbox = this.querySelector(`#${listboxId}`);

    this.setAttributes(button, {
      'role': 'combobox',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
      'aria-controls': listboxId,
      'aria-activedescendant': 'opt1',
      'tabindex': this.#disabled ? '-1' : '0'
    });

  }
}
customElements.define('ui-select',UISelect);