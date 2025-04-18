import {UIBase} from '../components/ui-base.js';
import {UIBaseStyle,UIButtonStyle} from '../helpers/styles.js';

class UIButton extends UIBase{
  #shadow;
  #label = '';
  #iconLeft = '';
  #iconRight = '';
  #disabled = false;
  #onClick = this.onClick.bind(this);

  static properties = Object.freeze({
    'icon-left':{name:'iconLeft',type:String,reflect:true},
    'icon-right':{name:'iconRight',type:String,reflect:true},
    'label':{name:'label',type:String,reflect:true},
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.adoptedStyleSheets = [UIBaseStyle,UIButtonStyle];
  }

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('.label',this.#label);
    this.reflect('label',this.#label);
  }

  get iconLeft(){return this.#iconLeft;}
  set iconLeft(value){
    if(!(this.#iconLeft = String(value || ''))) return;
    this.#updateIcon(':first-child',this.#iconLeft);
    this.reflect('icon-left',this.#iconLeft);
  }

  get iconRight(){return this.#iconRight;}
  set iconRight(value){
    if(!(this.#iconRight = String(value || ''))) return;
    this.#updateIcon(':last-child',this.#iconRight);
    this.reflect('icon-right',this.#iconRight);
  }

  #updateIcon(position,name){
    queueMicrotask(()=>{
      let obj = this.#shadow.querySelector(`ui-icon${position}`);
      if(!obj) return;
      obj.setAttribute('icon',name);
    });
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    this.reflect('disabled',this.#disabled);
  }

  connectedCallback(){
    let height = parseInt(this.getAttribute('height'),10) || 32;
    this.style.height = `${height}px`;
    this.style.setProperty('--height',`${height}px`);

    this.#shadow.innerHTML = `
      ${this.#iconLeft && '<ui-icon></ui-icon>'}
      ${this.#label && '<div class="label"></div>'}
      ${this.#iconRight && '<ui-icon></ui-icon>'}
    `;

    this.addEventListener('click',this.#onClick);
    requestAnimationFrame(()=>this.setAttribute('transition','active'));
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