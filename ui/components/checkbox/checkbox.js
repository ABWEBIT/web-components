class UICheckbox extends HTMLElement{
  #checkbox = null;
  #icon = null;
  #disabled = false;
  #checked = false;
  #indeterminate = false;

  constructor(){
    super();
    this.#checkbox = document.createElement('input');
    this.#checkbox.type = 'checkbox';

    this.#icon = document.createElement('ui-icon');

    this.append(this.#checkbox,this.#icon);

    this.#checkbox.addEventListener('click', () => {
      this.checked = !this.#checked;
    });
  }

  static get observedAttributes(){
    return ['checked','indeterminate','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'disabled') this.disabled = newValue !== null;
    if(attribute === 'indeterminate') this.indeterminate = newValue !== null;
    if(attribute === 'checked') this.checked = newValue !== null;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    const isDisabled = value === true;
    if(this.#disabled === isDisabled) return;
    this.#disabled = isDisabled;
    this.toggleAttribute('disabled',this.#disabled);
    this.#checkbox.disabled = this.#disabled;
  }

  get indeterminate(){return this.#indeterminate;}
  set indeterminate(value){
    const isIndeterminate = value === true;
    if(this.#indeterminate === isIndeterminate || this.#disabled) return;
    this.#indeterminate = isIndeterminate;
    this.toggleAttribute('checked',!this.#indeterminate);
    this.#checkbox.checked = !this.#indeterminate;
    this.toggleAttribute('indeterminate',this.#indeterminate);
    this.#checkbox.indeterminate = this.#indeterminate;
    this.#icon.setAttribute('name','check-indeterminate');
  }

  get checked(){return this.#checked;}
  set checked(value){
    const isChecked = value === true;
    if(this.#checked === isChecked || this.#disabled) return;
    this.#checked = isChecked;
    this.toggleAttribute('indeterminate',false);
    this.#checkbox.indeterminate = false;
    this.toggleAttribute('checked',this.#checked);
    this.#checkbox.checked = this.#checked;
    this.#icon.setAttribute('name','check');
  }
}
customElements.define('ui-checkbox',UICheckbox);