import uuid from '../helpers/uuid.js';

class TextBlock extends HTMLElement{

  connectedCallback(){
    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('text-block',TextBlock); 