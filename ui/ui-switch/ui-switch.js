import {UIBase} from '../ui-base/ui-base.js';

class UISwitch extends UIBase{
  #input;
  #button;
  #label = '';
  #disabled = false;

  #onChange = this.onChange.bind(this);

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
    let height = parseInt(this.getAttribute('height'),10) || 24;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <label>
        <input type="checkbox">
      </label>
    `;

    this.#button = this.querySelector('label');

    this.#button.addEventListener('click',this.#onChange);
    requestAnimationFrame(()=>{
      this.setAttribute('animated','');
      this.setAttribute('role','button');
      if(this.#disabled) this.setAttribute('tabindex','-1');
      else this.setAttribute('tabindex','0');

      this.#input = this.querySelector('input');
      if(!this.#input) return;
      this.#input.setAttribute('tabindex','-1');
    });
  }

  disconnectedCallback(){
    this.#button.removeEventListener('click',this.#onChange);
  }

  tabindex(){
    if(this.#disabled) this.setAttribute('tabindex','-1');
    else this.setAttribute('tabindex','0');
  }

  onChange(){
    if(this.#disabled) return;
    if(this.#input.checked) this.#input.setAttribute('checked','');
    else this.#input.removeAttribute('checked');
  }

}
customElements.define('ui-switch',UISwitch);