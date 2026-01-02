class UICheckbox extends HTMLElement{
  #listeners = null;
  #checked = false;
  #disabled = false;

  static get observedAttributes(){
    return ['checked','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'checked') this.checked = newValue !== null;
    if(attribute === 'disabled') this.disabled = newValue !== null;
  }

  get checked(){return this.#checked;}
  set checked(value){
    const newValue = Boolean(value);
    if(this.#checked === newValue || this.#disabled) return;
    this.#checked = newValue;
    this.ariaChecked = this.#checked ? true : null;
    this.toggleAttribute('checked',this.#checked);
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    const newValue = Boolean(value);
    if(this.#disabled === newValue) return;
    this.#disabled = newValue;
    this.tabIndex = this.#disabled ? -1 : 0;
    this.ariaDisabled = this.#disabled ? true : null;
    this.toggleAttribute('disabled',this.#disabled);
  }

  connectedCallback(){
    this.replaceChildren();
    this.role = 'checkbox';
    this.tabIndex = this.#disabled ? -1 : 0;

    const icon = document.createElement('ui-icon');
    icon.setAttribute('name','check');
    this.append(icon);

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
    this.checked = !this.#checked;
    this.dispatchEvent(new CustomEvent('checkbox-action',{
      detail:{originalEvent:e},
      bubbles:true,
      composed:true
    }));
  }

}
customElements.define('ui-checkbox',UICheckbox);