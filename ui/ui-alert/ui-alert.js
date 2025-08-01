import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  #listeners = null;

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttribute('role','alert');

    if(!this.hasAttribute('no-close')){
      const button = document.createElement('ui-button');
      button.setAttribute('size','none');
      button.setAttribute('theme','transparent');
      button.setAttribute('shape','circle');

      this.#listeners = new AbortController();
      const signal = this.#listeners.signal;
      button.addEventListener('click', () => this.remove(),{signal});

      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('icon','close');
      button.append(uiIcon);

      this.append(button);
    }

  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

}
customElements.define('ui-alert',UIAlert);