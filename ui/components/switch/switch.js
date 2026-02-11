class UISwitch extends HTMLElement{
  #button = null;
  #input = null;

  constructor(){
    super();
    const isChecked = this.hasAttribute('checked');
    const isDisabled = this.hasAttribute('disabled');
    const fragment = document.createDocumentFragment();

    this.#button = document.createElement('button');
    this.#button.role = 'switch';

    this.#input = document.createElement('input');
    this.#input.type = 'checkbox';
    this.#input.hidden = true;

    if(isChecked){
      this.#button.ariaChecked = true;
      this.#input.checked = true;
    }
    if(isDisabled){
      //this.#button.disabled = true;
      this.#button.ariaDisabled = true;
      this.#input.disabled = true;
    }

    fragment.append(this.#button);
    this.append(fragment);
  }

  static get observedAttributes(){
    return ['checked','disabled'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'disabled') this.disabled = newValue !== null;
    if(attribute === 'checked') this.checked = newValue !== null;
  }

  get checked(){return this.#input.checked;}
  set checked(value){
    const isChecked = value === true;
    if(this.#input.checked === isChecked || this.#button.disabled) return;
    this.#input.checked = isChecked;
    this.sync();
  }

  get disabled(){return this.#button.disabled;}
  set disabled(value){
    const isDisabled = value === true;
    if(this.#button.disabled === isDisabled) return;
    this.#button.disabled = isDisabled;
    this.toggleAttribute('disabled',isDisabled);
  }

  connectedCallback(){
    this.#button.addEventListener('click',() => {
      this.#input.checked = !this.#input.checked;
      this.sync();
    });
  }
 
  sync(){
    const isChecked = this.#input.checked;
    const isDisabled = this.#button.disabled;

    this.#button.ariaChecked = isChecked ? true : null;
    this.#button.ariaDisabled = isDisabled ? true : null;
    this.#button.disabled = isDisabled;

    this.#input.toggleAttribute('checked',isChecked);
    this.#input.toggleAttribute('disabled',isDisabled);
    this.#input.disabled = isDisabled;

    this.toggleAttribute('checked',isChecked);
    this.toggleAttribute('disabled',isDisabled);
  }

}
customElements.define('ui-switch',UISwitch);