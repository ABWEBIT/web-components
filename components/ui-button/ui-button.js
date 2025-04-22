import {UIBase,UIBaseStyle} from '../ui-base/index.js';
import {UIButtonStyle} from './ui-button-style.js';

class UIButton extends UIBase{
  #shadow;
  #label = '';
  #iconStart = '';
  #iconEnd = '';
  #disabled = false;
  #onClick = this.onClick.bind(this);

  static properties = Object.freeze({
    'icon-start':{name:'iconStart',type:String,reflect:true},
    'icon-end':{name:'iconEnd',type:String,reflect:true},
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
    this.updateText('ui-text',this.#label);
    this.reflect('label',this.#label);
  }

  get iconStart(){return this.#iconStart;}
  set iconStart(value){
    if(!(this.#iconStart = String(value || ''))) return;
    this.#updateIcon('[data-leading]',this.#iconStart);
    this.reflect('icon-start',this.#iconStart);
  }

  get iconEnd(){return this.#iconEnd;}
  set iconEnd(value){
    if(!(this.#iconEnd = String(value || ''))) return;
    this.#updateIcon('[data-trailing]',this.#iconEnd);
    this.reflect('icon-end',this.#iconEnd);
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
      ${this.#iconStart && '<ui-icon data-leading></ui-icon>'}
      ${this.#label && '<ui-text></ui-text>'}
      ${this.#iconEnd && '<ui-icon data-trailing></ui-icon>'}
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