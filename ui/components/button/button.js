class UIButton extends HTMLElement{
  #disabled = false;
  #busy = false;
  #button = null;
  #spinner = null;

  constructor(){
    super();
    this.#button = document.createElement('button');

    this.#disabled = this.hasAttribute('disabled');
    this.#busy = this.hasAttribute('busy');

    this.#button.disabled = this.#disabled || this.#busy;

    this.#button.replaceChildren(...this.childNodes);
    this.append(this.#button);
  }

  static get observedAttributes(){
    return ['busy','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'disabled') this.disabled = newValue !== null;
    if(attribute === 'busy') this.busy = newValue !== null;
  }

  get busy(){return this.#busy;}
  set busy(value){
    const isBusy = value === true;
    if(this.#busy === isBusy) return;
    this.#busy = isBusy;
    this.toggleAttribute('busy',this.#busy);
    this.ariaBusy = this.#busy || null;
    if(this.#button) this.#button.disabled = this.#disabled || this.#busy;

    if(this.#busy && !this.#spinner){
      this.#spinner = document.createElement('ui-spinner');
      this.append(this.#spinner);
    }
    else{
      this.#spinner?.remove();
      this.#spinner = null;
    }
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    const isDisabled = value === true;
    if(this.#disabled === isDisabled) return;
    this.#disabled = isDisabled;
    this.toggleAttribute('disabled',this.#disabled);
    if(this.#button) this.#button.disabled = this.#disabled || this.#busy;
  }

  connectedCallback(){

  }
}
customElements.define('ui-button',UIButton);