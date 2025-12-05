class UITab extends HTMLElement{
  #disabled = false;
  static get observedAttributes(){
    return ['disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'disabled') this.disabled = this.hasAttribute('disabled');
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
    this.role = 'tab';
  }
}
customElements.define('ui-tab',UITab);