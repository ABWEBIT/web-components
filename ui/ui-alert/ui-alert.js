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
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-ui','alert-body');

    if(label){
      const uiAlertLabel = document.createElement('div');
      uiAlertLabel.setAttribute('data-ui','alert-label');
      uiAlertLabel.textContent = label;
      wrapper.appendChild(uiAlertLabel);
    }

    if(content){
      const uiAlertContent = document.createElement('div');
      uiAlertContent.setAttribute('data-ui','alert-content');
      uiAlertContent.innerHTML = content;
      wrapper.appendChild(uiAlertContent);
    }

    this.replaceChildren(wrapper);
  }


}
customElements.define('ui-alert',UIAlert);