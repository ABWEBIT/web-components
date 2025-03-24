import uuid from '../helpers/uuid.js';

class ButtonBlock extends HTMLElement{

  connectedCallback(){
    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('button-block',ButtonBlock);