import {UIBase} from '../../base.js';

class UISpinner extends UIBase{

  connectedCallback(){
    const svg = document.createElement('ui-icon');
    svg.ariaHidden = 'true';
    svg.setAttribute('icon','progress-activity');
    this.append(svg);
  }
}
customElements.define('ui-spinner',UISpinner);