import {UIBase} from '../ui-base.js';
import DOMPurify from '../../utils/purify.es.mjs';

class UIAlert extends UIBase{
  #data = null;

  get data(){return this.#data;}
  set data(value){
    if(typeof value !== 'object' || !value || Array.isArray(value)) throw new TypeError('Data must be an array');
    if(this.#data === value) return;
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.role = 'alert';
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

    if(d.content){
      const content = document.createElement('div');
      content.role = 'note';
      content.innerHTML = DOMPurify.sanitize(d.content);
      fragment.append(content);
    }

    if(!this.hasAttribute('non-closable')){
      const button = document.createElement('ui-button');
      button.setAttribute('shape','circle');
      button.setAttribute('close','');
      button.setAttribute('icon-only','');

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