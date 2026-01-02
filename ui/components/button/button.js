class UIButton extends HTMLElement{
  #listeners = null;
  #busy = false;
  #disabled = false;
  #spinner = null;

  static get observedAttributes(){
    return ['busy','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'busy') this.busy = newValue !== null;
    if(attribute === 'disabled') this.disabled = newValue !== null;
  }

  get busy(){return this.#busy;}
  set busy(value){
    const newValue = Boolean(value);
    if(this.#busy === newValue) return;
    this.#busy = newValue;
    this.tabIndex = this.#busy ? -1 : 0;
    this.ariaBusy = this.#busy || null;
    this.toggleAttribute('busy',this.#busy);

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
    const newValue = Boolean(value);
    if(this.#disabled === newValue) return;
    this.#disabled = newValue;
    this.tabIndex = this.#disabled ? -1 : 0;
    this.ariaDisabled = this.#disabled || null;
    this.toggleAttribute('disabled',this.#disabled);
  }

  connectedCallback(){
    this.role = 'button';
    this.tabIndex = this.#disabled || this.#busy ? -1 : 0;

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});
    this.addEventListener('keyup',this.#onKeyUp,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #onClick = (e) =>{
    if(this.#disabled || this.#busy) return;
    this.#onAction(e);
  }

  #onKeyDown = (e) =>{
    if(this.#disabled || this.#busy) return;

    if(e.key === ' '){
      e.preventDefault();
    }

    if(e.key === 'Enter' && !e.repeat){
      this.#onAction(e);
    }
  }

  #onKeyUp = (e) =>{
    if(this.#disabled || this.#busy) return;

    if(e.key === ' '){
      e.preventDefault();
      this.#onAction(e);
    }
  }

  #onAction = (e) =>{
    this.dispatchEvent(new CustomEvent('button-action',{
      detail:{originalEvent:e},
      bubbles:true,
      composed:true
    }));
  }
}
customElements.define('ui-button',UIButton);