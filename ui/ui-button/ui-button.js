import {UIBase} from '../ui-base/ui-base.js';

class UIButton extends UIBase{
  #label = '';
  #iconLeading = '';
  #iconTrailing = '';
  #shape = 'rounded';
  #shapeTypes = ['rounded','pill','square'];
  #disabled = false;

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'label':{name:'label',type:String,reflect:true},
    'icon-leading':{name:'iconLeading',type:String,reflect:true},
    'icon-trailing':{name:'iconTrailing',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('span',this.#label);
    this.reflect('label',this.#label);
    this.setAttributes(this,{
      'aria-label': this.#label
    });
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
    this.setAttributes(this,{
      'tabindex': this.#disabled ? '-1' : '0',
      'aria-disabled': this.#disabled ? 'true' : 'false'
    });
  }

  connectedCallback(){
    super.connectedCallback();

    this.setAttributes(this,{
      'role': 'button'
    });

    this.checked = this.hasAttribute('checked');
    this.disabled = this.hasAttribute('disabled');

    const shapeAttr = this.getAttribute('shape');
    if(!shapeAttr || !this.#shapeTypes.includes(shapeAttr)){
      this.setAttribute('shape',this.#shape);
    }

    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      ${this.#iconLeading ? `<ui-icon height="${height}" leading></ui-icon>` : ''}
      ${this.#label ? `<span></span>` : ''}
      ${this.#iconTrailing ? `<ui-icon height="${height}" trailing></ui-icon>` : ''}
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
    console.log(e.type);
  }

}
customElements.define('ui-button',UIButton);