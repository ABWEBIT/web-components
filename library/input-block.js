import uuid from '../helpers/uuid.js';

class InputBlock extends HTMLElement{
  //#label = 'Label';
  //#hint = 'This is the hint for input field';
  //#validator = this.validation.bind(this);

  connectedCallback(){
    //this.setAttribute('data-uuid',uuid());

    //this.shadowRoot.querySelector('.input').addEventListener('input',this.validator);
  }

  disconnectedCallback(){
    //this.shadowRoot.querySelector('.input').removeEventListener('input',this.validator);
  }

  validation(){
    //console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-block',InputBlock);