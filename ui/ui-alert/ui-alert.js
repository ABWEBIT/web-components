import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  #data = [];

  get data(){return this.#data;}
  set data(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttribute('role','alert');
  }

  #render(){
    const fragment = document.createDocumentFragment();

    this.#data.forEach(item => {

      if(item.icon) {
        const icon = document.createElement('ui-icon');
        icon.setAttribute('icon', item.icon);
        fragment.append(icon);
      }

      if(item.title) {
        const title = document.createElement('ui-title');
        title.textContent = item.title;
        fragment.append(title);
      }

      if(item.content) {
        const content = document.createElement('ui-content');
        content.innerHTML = item.content;
        fragment.append(content);
      }

      if(item.closable === true){
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

    });

    this.replaceChildren(fragment);
  }

  #onAction = (e) => {
    this.remove();
  }

}
customElements.define('ui-alert',UIAlert);