import {UIBase} from '../ui-base/ui-base.js';

class UISwitch extends UIBase{
  #label = '';
  #labelPosition = '';
  #disabled = false;

  #onClick = this.onClick.bind(this);

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
  }

  connectedCallback(){
    super.connectedCallback();
    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      <input type="checkbox" checked>
      <span class="slider round"></span>
      ${this.#label ? '<span></span>' : ''}
    `;

    this.addEventListener('click',this.#onClick);
    requestAnimationFrame(()=>this.setAttribute('animated',''));
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
  }

  onClick(){
    if(this.#disabled) return;
    //console.log('click');
  }

}
customElements.define('ui-switch',UISwitch);