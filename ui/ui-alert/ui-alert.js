import {UIBase} from '../ui-base.js';

class UIAlert extends UIBase{
  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();

    this.setAttribute('role','alert')
  }

  setData({label,content} = {}){
    if(!label) throw new Error('UIAlert: required "label" is missing.');

    const alertBody = document.createElement('div');
    alertBody.setAttribute('data-ui','alert-body');

    const alertHeader = document.createElement('div');
    alertHeader.setAttribute('data-ui','alert-header');

    const closeButton = document.createElement('button');
    closeButton.setAttribute('data-ui','alert-close');

    closeButton.addEventListener('click',() => {
      this.remove();
    });

    const closeIcon = document.createElement('ui-icon');
    closeIcon.setAttribute('icon','close');
    closeButton.appendChild(closeIcon);

    const alertLabel = document.createElement('div');
    alertLabel.setAttribute('data-ui','alert-label');
    alertLabel.textContent = label;

    alertHeader.append(alertLabel,closeButton);

    alertBody.appendChild(alertHeader);

    if(content){
      const uiAlertContent = document.createElement('div');
      uiAlertContent.setAttribute('data-ui','alert-content');
      uiAlertContent.textContent = content;
      alertBody.appendChild(uiAlertContent);
    }

    this.replaceChildren(alertBody);
  }


}
customElements.define('ui-alert',UIAlert);