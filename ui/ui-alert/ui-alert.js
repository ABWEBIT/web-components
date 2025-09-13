import {UIBase} from '../ui-base.js';
import DOMPurify from '../../utils/purify.es.mjs';

class UIAlert extends UIBase{
  #data = null;

  get data(){return this.#data;}
  set data(value){
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.setAttribute('role','alert');
  }

  #render(){
    const d = this.#data;
    if(!d) return;

    const fragment = document.createDocumentFragment();

    if(this.hasAttribute('icon')){
      const icon = document.createElement('ui-icon');
      icon.setAttribute('icon',this.getAttribute('icon'));
      fragment.append(icon);
    }

    if(d.title){
      const title = document.createElement('div');
      title.role = 'heading';
      title.ariaLevel = "6";
      title.textContent = d.title;
      fragment.append(title);
    }

    if(d.description){
      const description = document.createElement('div');
      description.role = 'note';
      description.innerHTML = DOMPurify.sanitize(d.description);
      fragment.append(description);
    }

    if(!this.hasAttribute('non-closable')){
      const button = document.createElement('ui-button');
      this.setAttributes(button,{
        'ui':'alert-close',
        'shape':'circle',
        'icon-only':''
      })

      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('icon','close');
      button.append(uiIcon);

      button.addEventListener('button-action',() => this.remove());

      fragment.append(button);
    }

    this.replaceChildren(fragment);
  }

}
customElements.define('ui-alert',UIAlert);