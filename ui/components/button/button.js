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
    if(attribute === 'busy'){
      if(this.#busy !== newValue) this.#busy = newValue;
      this.#syncBusy();
    }
    if(attribute === 'disabled'){
      if(this.#disabled !== newValue) this.#disabled = newValue;
      this.#syncDisabled();
    }
  }

  get busy(){return this.#busy;}
  set busy(value){
    const newValue = !!value;
    if(this.#busy === newValue) return;
    this.#busy = newValue;
    this.ariaBusy = newValue;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    const newValue = !!value;
    if(this.#disabled === newValue) return;
    this.#disabled = newValue;
    this.ariaDisabled = newValue;
  }

  connectedCallback(){
    this.role = 'button';
    this.tabIndex = 0;

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #syncBusy = () =>{
    if(this.#busy && !this.#spinner){
      this.#spinner = document.createElement('ui-spinner');
      this.append(this.#spinner);
      this.disabled = true;
      this.ariaBusy = true;
    }
    else if(!this.#busy && this.#spinner){
      this.#spinner?.remove();
      this.#spinner = null;
      this.disabled = false;
      this.ariaBusy = null;
    }
  }

  #syncDisabled = () =>{
    this.ariaDisabled = this.#disabled ? true : null;
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  #onClick = (e) =>{
    if(this.#disabled) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    this.#onAction(e);
  }

  #onKeyDown = (e) =>{
    if(this.#disabled) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      if(e.repeat) return;
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