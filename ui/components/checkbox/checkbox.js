class UICheckbox extends HTMLElement{
  #listeners = null;
  #checkbox = null;
  #button = null;
  #icon = null;
  #disabled = false;
  #checked = false;
  #indeterminate = false;

  constructor(){
    super();
    // checkbox
    this.#checkbox = document.createElement('input');
    this.#checkbox.type = 'checkbox';
    //this.#checkbox.hidden = true;

    // button
    this.#button = document.createElement('button');
    this.#button.type = 'button';
    this.#button.role = 'checkbox';

    // icon
    this.#icon = document.createElement('ui-icon');
    this.#button.append(this.#icon);

    this.#disabled = this.hasAttribute('disabled');
    this.#checked = this.hasAttribute('checked');
    this.#indeterminate = this.hasAttribute('indeterminate');

    this.#checkbox.disabled = this.#disabled;
    this.#button.disabled = this.#disabled;

    this.#update();
    this.append(this.#button,this.#checkbox);

    this.#button.addEventListener('click', () => {
      if(this.#disabled) return;

      if(this.#indeterminate){
        this.#indeterminate = false;
        this.#checked = true;
      }
      else{
        this.#checked = !this.#checked;
      }

      this.#update();
      this.dispatchEvent(new Event('change',{
        bubbles: true
      }));
    });
  }

  #update(){
    if(this.#indeterminate){
      this.#checkbox.indeterminate = true;
      this.#checkbox.checked = false;
      this.#button.ariaChecked = 'mixed';
      this.removeAttribute('checked');
      this.#icon.setAttribute('name','check-indeterminate');
    }
    else{
      this.#checkbox.indeterminate = false;
      this.removeAttribute('indeterminate');
      this.#checkbox.checked = this.#checked;
      this.#button.ariaChecked = this.#checked ? 'true' : 'false';
      this.toggleAttribute('checked',this.#checked);
      this.#icon.setAttribute('name','check');
    }
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
    this.#button.disabled = this.#disabled;
  }

  get indeterminate(){return this.#indeterminate;}
  set indeterminate(value){
    const isIndeterminate = Boolean(value);
    if(this.#indeterminate === isIndeterminate || this.#disabled) return;
    this.#indeterminate = isIndeterminate;
    this.ariaChecked = this.#checked ? true : null;
    this.toggleAttribute('indeterminate',this.#indeterminate);
  }

  get checked(){return this.#checked;}
  set checked(value){
    const isChecked = Boolean(value);
    if(this.#checked === isChecked || this.#disabled) return;
    this.#checked = isChecked;
    this.ariaChecked = this.#checked ? true : null;
    this.toggleAttribute('checked',this.#checked);
  }

  connectedCallback(){

  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

}
customElements.define('ui-checkbox',UICheckbox);