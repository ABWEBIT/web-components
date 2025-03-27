//import uuid from '../helpers/uuid.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #before = '';
  #after = '';
  #text = '';

  static get observedAttributes(){return ['before','after','text'];}

  get _before(){return this.#before;}
  set _before(value){
    this.#before = this.#checkName(value) ? value : '';}

  get _after(){return this.#after;}
  set _after(value){
    this.#after = this.#checkName(value) ? value : '';}

  #checkName(name){
    return /^[A-Za-z][A-Za-z0-9]*$/.test(name);
  }

  get _text(){return this.#text;}
  set _text(value){this.#text = value;}

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
        border:none;
        border-radius:var(--border-radius);
        overflow:hidden;
        background-color:rgb(25,25,25);
        color:rgb(175,175,175);
        cursor:pointer;
        -webkit-user-select:none;
        user-select:none;
        transition:background-color 0.2s,color 0.2s;}

      :host > text-block{
        text-align:center;
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
          color:rgb(255,255,255);}

        :host(:hover){
          background-color:rgb(35,35,35);}
      }

      :host(:active){
        background-color:rgb(45,45,45);}

      :host:has(> icon-block:nth-child(2)) text-block{padding-left:0;}
      :host:has(> icon-block:nth-child(4)) text-block{padding-right:0;}
      </style>
      ${this.#before ? `<icon-block name="${this.#before}"></icon-block>` : ''}
      ${this.#text ? `<text-block>${this.#text}</text-block>` : ''}
      ${this.#after ? `<icon-block name="${this.#after}"></icon-block>` : ''}`;

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