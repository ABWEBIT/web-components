class UICheckbox extends HTMLElement{
  #listeners = null;
  #disabled = false;
  #checked = false;

  static properties = {
    checked:{attribute:'checked',type:Boolean,reflect:true},
    disabled:{attribute:'disabled',type:Boolean,reflect:true}
  };

  static get observedAttributes(){
    return ['checked','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'checked'){
      this.checked = newValue;
    }
    if(attribute === 'disabled'){
      this.disabled = newValue;
    }
  }

  get checked(){return this.#checked;}
  set checked(value){
    if(this.#checked === (value === true)) return;
    this.#checked = value === true;
    this.#syncChecked();
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    if(this.#disabled === (value === true)) return;
    this.#disabled = value === true;
    this.#syncDisabled();
  }

  connectedCallback(){
    this.role = 'checkbox';

    const icon = document.createElement('ui-icon');
    icon.setAttribute('name','check');
    this.append(icon);

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.addEventListener('click',this.#onClick,{signal});
    this.addEventListener('keydown',this.#onKeyDown,{signal});

    this.#syncDisabled();
    this.#syncChecked();
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #syncDisabled = () =>{
    this.ariaDisabled = this.#disabled ? true : null;
    this.tabIndex = this.#disabled ? -1 : 0;
  }

  #syncChecked = () =>{
    this.ariaChecked = this.#checked ? true : false;
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
  }

}
customElements.define('ui-checkbox',UICheckbox);