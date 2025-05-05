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
    super.connectedCallback();
    let axis = this.getAttribute('axis');
    if(!['x', 'y'].includes(axis)){
      axis = 'x';
      this.setAttribute('axis',axis);
    }

    if(this.#label){
      const label = document.createElement('span');
      label.textContent = this.#label;
      this.appendChild(label);
    }

  }
}
customElements.define('ui-divider',UIDivider);