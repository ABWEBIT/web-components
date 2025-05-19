import {UIBase} from '../ui-base/ui-base.js';

class UICheckbox extends UIBase{
  #shape = 'rounded';
  #shapeTypes = ['rounded','circle','square'];
  #checked = false;
  #disabled = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'checked':{name:'checked',type:Boolean,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get checked(){return this.#checked;}
  set checked(value){
    this.#checked = value === true;
    this.reflect('checked',this.#checked);
    this.setAttributes(this,{
      'aria-checked': this.#checked ? 'true' : 'false'
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

    this.setAttributes(this,{
      'role': 'checkbox'
    });

    this.checked = this.hasAttribute('checked');
    this.disabled = this.hasAttribute('disabled');

    const shape = this.getAttribute('shape');
    if(!shape || !this.#shapeTypes.includes(shape)){
      this.setAttribute('shape',this.#shape);
    }

    let height = parseInt(this.getAttribute('height'),10) || 24;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <ui-icon height="${height}" icon="check"></ui-icon>
    `;

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  onKeyDown(e){
    if(e.code !== 'Tab') e.preventDefault();
    if(this.#disabled) return;
    if(e.repeat) return;
    if(e.code === 'Enter' || e.code === 'Space') this.doAction(e);
  }

  doAction(e){
    this.checked = !this.#checked;
    console.log(e.type);
  }

}
customElements.define('ui-checkbox',UICheckbox);