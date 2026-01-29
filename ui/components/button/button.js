class UIButton extends HTMLElement{
  #disabled = false;
  #busy = false;
  #button = null;
  #spinner = null;

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
    this.#button = this.querySelector('button');
    if(!this.#button) throw new Error('Not found <button>');
    if(this.#disabled || this.#busy) this.#button.disabled = true;
  }
}
customElements.define('ui-button',UIButton);