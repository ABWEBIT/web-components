import {textNormalize,variableName,inputTypes,htmlEscape} from '../helpers/utils.js';

class InputBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #required = false;
  #before = '';
  #after = '';
  #handler = this.operation.bind(this);

  static get observedAttributes(){return ['before','after'];}

  get _before(){return this.#before;}
  set _before(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#before = value;
      this.#updateIcon('before',this.#before);
    }
  }

  get _after(){return this.#after;}
  set _after(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#after = value;
      this.#updateIcon('after',this.#after);
    }
  }

  #updateIcon(position,name){
    name = htmlEscape(name);
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`icon-block[position="${position}"]`);
      if(block) block.setAttribute('name',name);
    });
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host *{box-sizing:border-box;outline:none;}
    :host{
      position:relative;
      display:inline-flex;
      vertical-align:middle;
      width:fit-content;
      height:40px;
      border:none;
      border-radius:var(--border-radius);
      overflow:hidden;
      color:rgb(175,175,175);
      background-color:rgb(25,25,25);
      transition:background-color 0.2s,color 0.2s;}

    :host > input{
      height:100%;
      flex-grow:1;
      width:100%;
      min-width:70px;
      padding-left:15px;
      padding-right:15px;
      border:none;
      color:rgb(255,255,255);
      font-size:90%;
      background-color:transparent;
      transition:color 0.2s;}

    :host > input::-ms-reveal{display:none;}

    :host > icon-block{
      height:100%;
      width:40px;
      min-width:40px;}

    @media (hover:hover){
      :host(:hover),
      :host:has(> input:focus){
        background-color:rgb(35,35,35);}
      :host(:hover) > icon-block,
      :host:has(> input:focus) > icon-block{color:rgb(225,225,225);}
    }

    :host:has(> icon-block[position="before"]) input{padding-left:0;}
    :host:has(> icon-block[position="after"]) input{padding-right:0;}
    </style>
    ${this.#before && `<icon-block position="before" name=""></icon-block>`}
    <input type="">
    ${this.#after && `<icon-block position="after" name=""></icon-block>`}`;

    let inputObject = this.#shadow.querySelector('input');
    if(inputObject){
      inputObject.addEventListener('input',this.#handler);

      let inputType = textNormalize(this.getAttribute('type'));
      inputType = inputTypes(inputType) ? inputType : 'text';
      inputObject.type = htmlEscape(inputType);
      
      let inputPlaceholder = textNormalize(this.getAttribute('placeholder'));
      if(inputPlaceholder){
        inputObject.setAttribute('placeholder',htmlEscape(inputPlaceholder));
      }

      let inputRequired = this.hasAttribute('required');
      if(inputRequired === true) inputObject.required = true;
    }
  }

  disconnectedCallback(){
    let inputObject = this.#shadow.querySelector('input');
    if(inputObject) inputObject.removeEventListener('input',this.#handler);
  }

  operation(){
    //console.log(this.#shadow.querySelector('input').value.length);
    //this.dispatchEvent(new CustomEvent('input-change',{detail:value}));
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'before':this._before = newValue; break;
        case 'after':this._after = newValue; break;
      }
    }
  }

}
customElements.define('input-block',InputBlock);