import {UIBase} from '../ui-base/ui-base.js';

class UISwitch extends UIBase{
  #input;
  #button;
  #label = '';
  #disabled = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'label':{name:'label',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('span',this.#label);
    this.reflect('label',this.#label);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.tabindex();
  }

  connectedCallback(){
    super.connectedCallback();
    this.tabindex();
    this.setAttribute('role','switch');
    this.setAttribute('animated','');

    let height = parseInt(this.getAttribute('height'),10) || 24;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <div></div>
      ${this.#label ? '<span></span>' : ''}
    `;

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  tabindex(){
    if(this.#disabled) this.setAttribute('tabindex','-1');
    else this.setAttribute('tabindex','0');
  }

  onClick(e){
    if(this.#disabled) return;
    this.doAction(e);
  }

  onKeyDown(e){
    if(e.code !== 'Tab') e.preventDefault();
    if(this.#disabled) return;
    if(e.repeat) return;
    if(e.code === 'Enter' || e.code === 'Space'){
      this.doAction(e);
    }
  }

  doAction(e){
    console.log(e.type);
  }

}
customElements.define('ui-switch',UISwitch);