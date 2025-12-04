class UISwitch extends HTMLElement{
  #listeners = null;
  #checked = false;
  #disabled = false;

  static get observedAttributes(){
    return ['checked','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'checked') this.checked = this.hasAttribute('checked');
    if(attribute === 'disabled') this.disabled = this.hasAttribute('disabled');
  }

  get checked(){return this.#checked;}
  set checked(value){
    const newValue = Boolean(value);
    if(this.#checked === newValue || this.#disabled) return;
    this.#checked = newValue;
    this.#checked ? this.setAttribute('checked','') : this.removeAttribute('checked');
    this.ariaChecked = this.#checked ? true : null;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    const newValue = Boolean(value);
    if(this.#disabled === newValue) return;
    this.#disabled = newValue;
    this.#disabled ? this.setAttribute('disabled','') : this.removeAttribute('disabled');
    this.ariaDisabled = this.#disabled ? true : null;
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  connectedCallback(){
    this.replaceChildren();
    this.role = 'switch';
    this.tabIndex = this.#disabled ? -1 : 0;

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #onClick = (e) =>{
    if(this.disabled) return;
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
    this.checked = !this.#checked;
    this.dispatchEvent(new CustomEvent('switch-action',{
      detail:{originalEvent:e},
      bubbles:true,
      composed:true
    }));
  }

}
customElements.define('ui-switch',UISwitch);