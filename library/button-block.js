//import uuid from '../helpers/uuid.js';
import Validator from '../helpers/validation.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #text = '';
  #before = '';
  #after = '';

  static get observedAttributes(){return ['before','after','text'];}

  get _before(){return this.#before;}
  set _before(value){
    value = String(value || '').trim();
    this.#before = Validator.iconName(value) ? value : '';
    this.#updateIcon('before',this.#before);
  }

  get _after(){return this.#after;}
  set _after(value){
    value = String(value || '').trim();
    this.#after = Validator.iconName(value) ? value : '';
    this.#updateIcon('after',this.#after);
  }

  #updateIcon(position,name){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`icon-block[position="${position}"]`);
      if(block) block.setAttribute('name',name);
    });
  }

  get _text(){return this.#text;}
  set _text(value){
    value = value.trim();
    this.#text = Validator.buttonText(value) ? value : '';
    this.#updateText('text',this.#text);
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`text-block[type="${type}"]`);
      if(block) block.textContent = text;
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
      align-items:center;
      width:fit-content;
      height:40px;
      min-height:40px;
      border:none;
      border-radius:var(--border-radius);
      overflow:hidden;
      color:rgb(175,175,175);
      background-color:rgb(25,25,25);
      cursor:pointer;
      -webkit-user-select:none;
      user-select:none;
      transition:background-color 0.2s,color 0.2s;}

    :host > text-block{
      text-align:center;
      font-size:95%;
      padding-left:15px;
      padding-right:15px;
      flex-grow:1;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;}

    :host > icon-block{
      height:100%;
      width:40px;
      min-width:40px;}

    :host::after{
      position:absolute;
      display:block;
      inset:0;
      content:'';
      border:none;
      border-radius:var(--border-radius);}

    @media (hover:hover){
      :host(:hover),
      :host(:hover) > icon-block{
        color:rgb(225,225,225);}

      :host(:hover){
        background-color:rgb(35,35,35);}
    }

    :host(:active){
      background-color:rgb(45,45,45);}

    :host:has(> icon-block[position="before"]) text-block{padding-left:0;}
    :host:has(> icon-block[position="after"]) text-block{padding-right:0;}
    </style>
    ${this.#before ? `<icon-block position="before" name=""></icon-block>` : ''}
    ${this.#text ? `<text-block type="text"></text-block>` : ''}
    ${this.#after ? `<icon-block position="after" name=""></icon-block>` : ''}`;

    //this.setAttribute('data-uuid',uuid());
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(!!newValue && oldValue !== newValue){
      switch(name){
        case 'before':this._before = newValue; break;
        case 'after':this._after = newValue; break;
        case 'text':this._text = newValue; break;
      }
    }
  }

}
customElements.define('button-block',ButtonBlock);