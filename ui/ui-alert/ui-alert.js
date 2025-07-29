import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  #listeners = null;

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttribute('role','alert');

    const fragment = document.createDocumentFragment();

    const alertIcon = this.getAttribute('icon');
    if(alertIcon){
      const container = document.createElement('div');
      container.setAttribute('data-ui','alert-icon');
      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('icon',alertIcon);
      container.append(uiIcon);
      fragment.prepend(container);
      this.removeAttribute('icon');
    }

    const alertBody = document.createElement('div');
    alertBody.setAttribute('data-ui','alert-body');
    fragment.append(alertBody);

    const alertTitle = [...(this.querySelector('alert-title')?.childNodes || [])];

    if(alertTitle.length > 0){
      const container = document.createElement('div');
      container.setAttribute('data-ui','alert-title');
      container.append(...alertTitle);
      alertBody.append(container);
    }

    const alertDescription = [...(this.querySelector('alert-description')?.childNodes || [])];

    if(alertDescription.length > 0){
      const container = document.createElement('div');
      container.setAttribute('data-ui','alert-description');
      container.append(...alertDescription);
      alertBody.append(container);
    }
    
    if(!this.hasAttribute('no-close')){
      const button = document.createElement('button');
      button.setAttribute('data-ui','alert-close');
      button.setAttribute('aria-label','Close alert');
      button.setAttribute('type','button');

      this.#listeners = new AbortController();
      const signal = this.#listeners.signal;
      button.addEventListener('click', () => this.remove(),{signal});

      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('icon','close');
      button.append(uiIcon);

      fragment.append(button);
    }

    this.replaceChildren(fragment);

  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

}
customElements.define('ui-alert',UIAlert);