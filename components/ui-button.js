import {UIComponentsStyle,UIButtonStyle} from '../helpers/styles.js';

class UIButton extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #iconLeft = '';
  #iconRight = '';

  constructor(){
    super();
    this.#shadow.adoptedStyleSheets = [UIComponentsStyle,UIButtonStyle];
  }

  static get observedAttributes(){
    return ['icon-left','icon-right','label'];
  }

  get iconLeft(){return this.#iconLeft;}
  set iconLeft(value){
    value = String(value || '');
    if(value){
      this.#iconLeft = value;
      this.#updateIcon(':first-child',this.#iconLeft);
    }
  }

  get iconRight(){return this.#iconRight;}
  set iconRight(value){
    value = String(value || '');
    if(value){
      this.#iconRight = value;
      this.#updateIcon(':last-child',this.#iconRight);
    }
  }

  #updateIcon(position,name){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`ui-icon${position}`);
      if(block) block.setAttribute('icon',name);
    });
  }

  get label(){return this.#label;}
  set label(value){
    value = String(value || '');
    if(value){
      this.#label = value;
      this.#updateText('label',this.#label);
    }
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`.${type}`);
      if(block) block.textContent = text;
    });
  }

  connectedCallback(){
    let heightData = this.getAttribute('height');
    let height = parseInt(heightData,10) || 32;
    if(height !== heightData){
      this.style.height = `${height}px`;
      this.style.setProperty('--height',`${height}px`)
    };

    this.#shadow.innerHTML = `
      ${this.#iconLeft && '<ui-icon></ui-icon>'}
      ${this.#label && '<div class="label"></div>'}
      ${this.#iconRight && '<ui-icon></ui-icon>'}
    `;

    requestAnimationFrame(()=>this.setAttribute('transition','active'));
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'icon-left':this.iconLeft = newValue; break;
        case 'icon-right':this.iconRight = newValue; break;
        case 'label':this.label = newValue; break;
      }
    }
  }

}
customElements.define('ui-button',UIButton);