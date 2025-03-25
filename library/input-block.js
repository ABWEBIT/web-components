import uuid from '../helpers/uuid.js';

class InputBlock extends HTMLElement{
  #before = '';
  #after = '';
  #type = '';

  static get observedAttributes(){
    return ['before','after'];
  }

  get _before(){return this.#before;}
  set _before(value){this.#before = value;}

  get _after(){return this.#after;}
  set _after(value){this.#after = value;}

  connectedCallback(){
    const iconBlock = (name) => /^[A-Za-z][A-Za-z0-9]*$/.test(name) ? `<icon-block name="${name}"></icon-block>` : '';

    this.innerHTML = `
      ${iconBlock(this.#before)}
      <input>
      ${iconBlock(this.#after)}`;


    //this.setAttribute('data-uuid',uuid());

    //this.shadowRoot.querySelector('.input').addEventListener('input',this.validator);
  }

  disconnectedCallback(){
    //this.shadowRoot.querySelector('.input').removeEventListener('input',this.validator);
  }

  validation(){
    //console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'before':this._before = newValue; break;
        case 'after':this._after = newValue; break;
      }
    }
  }

}
customElements.define('input-block',InputBlock);