import {UIBase} from '../ui-base.js';

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
    this.shape();
    this.size();
    this.theme();

    if(!this.hasAttribute('non-closable')){
      const button = document.createElement('ui-button');
      button.setAttribute('ui','alert-close');

      button.setAttribute('size','none');
      button.setAttribute('shape','circle');

      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('icon','close');
      button.append(uiIcon);

      button.onAction = (e) => {
        this.#onAction();
      }

      this.append(button);
    }

  }

  #render(){
    const d = this.#data;
    if(!d) return;

    const fragment = document.createDocumentFragment();

    if(d.icon){
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
      description.textContent = d.description;
      fragment.append(description);
    }

    if(!this.hasAttribute('non-closable')){
      const button = document.createElement('ui-button');
      button.setAttribute('ui','alert-close');
      button.setAttribute('size','none');
      button.setAttribute('shape','circle');

      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('icon','close');
      button.append(uiIcon);

      button.onAction = (e) => {
        this.#onAction();
      }

      fragment.append(button);
    }

    this.replaceChildren(fragment);
  }

  #onAction = (e) => {
    this.remove();
  }

}
customElements.define('ui-alert',UIAlert);