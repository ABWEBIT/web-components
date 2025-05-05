import {UIBase} from '../ui-base/ui-base.js';

class UIButton extends UIBase{
  #label = '';
  #iconLeading = '';
  #iconTrailing = '';
  #disabled = false;

  #onClick = this.onClick.bind(this);

  static properties = Object.freeze({
    'icon-leading':{name:'iconLeading',type:String,reflect:true},
    'icon-trailing':{name:'iconTrailing',type:String,reflect:true},
    'label':{name:'label',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('ui-text',this.#label);
    this.reflect('label',this.#label);
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
  }

  connectedCallback(){
    super.connectedCallback();
    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.setProperty('--ui-object-height',`${height}px`);

    this.innerHTML = `
      ${this.#iconLeading && '<ui-icon leading></ui-icon>'}
      ${this.#label && '<ui-text></ui-text>'}
      ${this.#iconTrailing && '<ui-icon trailing></ui-icon>'}
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
customElements.define('ui-button',UIButton);