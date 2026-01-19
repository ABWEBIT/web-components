class UITextarea extends HTMLElement{
  #listeners = null;
  #textarea = null;
  #required = false;
  #disabled = false;

  static properties = {
    required:{attribute:'required',type:Boolean,reflect:true},
    disabled:{attribute:'disabled',type:Boolean,reflect:true}
  };

  static get observedAttributes(){
    return ['required','disabled'];
  }

  get required(){return this.#required;}
  set required(value){
    this.#required = value === true;
    if(this.#textarea) this.#textarea.required = this.#required;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    this.#disabled = value === true;
    if(this.#textarea) this.#textarea.disabled = this.#disabled;
  }

  connectedCallback(){
    this.#textarea = this.querySelector('textarea');

    this.#listeners = new AbortController();
    const signal = this.#listeners.signal;

    this.#textarea.addEventListener('input',this.#onInput,{signal});
  }

  disconnectedCallback(){
    this.#listeners?.abort();
    this.#listeners = null;
  }

  #onInput = (e) =>{
    if(this.#disabled) return;
    this.#onAction(e);
  }

  #onAction = (e) =>{
    console.log(e.type);
  }

}
customElements.define('ui-textarea',UITextarea);