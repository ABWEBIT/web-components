import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  #listeners = null;

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttribute('role','alert')
  }

  setData({label,content,icon = null,closable = true} = {}){
    if(!label) throw new Error('UIAlert: required "label" is missing.');

    this.#listeners?.abort();
    this.#listeners = null;

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    const fragment = document.createDocumentFragment();

    if(icon){
      const iconWrapper = document.createElement('div');
      iconWrapper.setAttribute('data-ui','alert-icon');

      const alertIcon = document.createElement('ui-icon');
      alertIcon.setAttribute('icon',icon);
      iconWrapper.appendChild(alertIcon);

      fragment.appendChild(iconWrapper);
    }

    const alertBody = document.createElement('div');
    alertBody.setAttribute('data-ui','alert-body');

    const alertHeader = document.createElement('div');
    alertHeader.setAttribute('data-ui','alert-header');

    const alertLabel = document.createElement('div');
    alertLabel.setAttribute('data-ui','alert-label');
    alertLabel.textContent = label;

    alertHeader.appendChild(alertLabel);

    if(closable){
      const closeButton = document.createElement('button');
      closeButton.setAttribute('data-ui','alert-close');
      closeButton.setAttribute('aria-label','Close alert');
      closeButton.setAttribute('type','button');

      closeButton.addEventListener('click', () => this.remove(),{signal});

      const closeIcon = document.createElement('ui-icon');
      closeIcon.setAttribute('icon','close');
      closeButton.appendChild(closeIcon);

      alertHeader.appendChild(closeButton);
    }

    alertBody.appendChild(alertHeader);

    if(content){
      const alertContent = document.createElement('div');
      alertContent.setAttribute('data-ui', 'alert-content');
      alertContent.textContent = content;
      alertBody.appendChild(alertContent);
    }

    fragment.appendChild(alertBody);
    this.replaceChildren(fragment);
  }

}
customElements.define('ui-alert',UIAlert);