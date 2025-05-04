import {UIBase} from '../ui-base/ui-base.js';

class UIDivider extends UIBase{
  #label = '';

  static properties = Object.freeze({
    'label':{name:'label',type:String,reflect:true}
  });

  get label(){return this.#label;}
  set label(value){
    if(!(this.#label = String(value || ''))) return;
    this.updateText('ui-text',this.#label);
    this.reflect('label',this.#label);
  }

  connectedCallback(){
    let axis = this.getAttribute('axis');
    if(!['x', 'y'].includes(axis)){
      axis = 'x';
      this.setAttribute('axis',axis);
    }

    const fragment = document.createDocumentFragment();
    fragment.appendChild(document.createElement('ui-shape'));

    if(this.#label){
      fragment.appendChild(document.createElement('ui-text'));
      fragment.appendChild(document.createElement('ui-shape'));
    }
    
    this.appendChild(fragment);
  }
}
customElements.define('ui-divider',UIDivider);