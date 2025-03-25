import uuid from '../helpers/uuid.js';

class WrapperBlock extends HTMLElement{

  connectedCallback(){
    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('wrapper-block',WrapperBlock);