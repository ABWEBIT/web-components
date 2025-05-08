import {UIBase} from '../ui-base/ui-base.js';

class UIButton extends UIBase{
  #label = '';
  #iconLeading = '';
  #iconTrailing = '';
  #disabled = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'icon-leading':{name:'iconLeading',type:String,reflect:true},
    'icon-trailing':{name:'iconTrailing',type:String,reflect:true},
    'label':{name:'label',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('span',this.#label);
    this.reflect('label',this.#label);
    if(!this.hasAttribute('aria-label')) this.setAttribute('aria-label',this.#label);
  }

  get iconLeading(){return this.#iconLeading;}
  set iconLeading(value){
    if(!(this.#iconLeading = String(value || ''))) return;
    this.updateIcon('[leading]',this.#iconLeading);
    this.reflect('icon-leading',this.#iconLeading);
  }

  get iconTrailing(){return this.#iconTrailing;}
  set iconTrailing(value){
    if(!(this.#iconTrailing = String(value || ''))) return;
    this.updateIcon('[trailing]',this.#iconTrailing);
    this.reflect('icon-trailing',this.#iconTrailing);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
    this.tabindex();
  }

  connectedCallback(){
    super.connectedCallback();
    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      ${this.#iconLeading ? '<ui-icon leading></ui-icon>' : ''}
      ${this.#label ? '<span></span>' : ''}
      ${this.#iconTrailing ? '<ui-icon trailing></ui-icon>' : ''}
    `;

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);

    requestAnimationFrame(()=>{
      this.tabindex();
      this.setAttribute('animated','');
      this.setAttribute('role','button');
    });
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
    //console.log(e.type);
  }

}
customElements.define('ui-button',UIButton);