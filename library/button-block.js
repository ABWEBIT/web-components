import uuid from '../helpers/uuid.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{
      position:relative;
      display:inline-flex;
      border:none;
      border-radius:var(--border-radius);
      width:fit-content;
      height:40px;
      align-items:center;
      vertical-align:middle;
      column-gap:15px;
      padding:0 12px;
      background-color:rgb(30,30,30);
      text-align:center;
      color:rgb(175,175,175);
      cursor:pointer;
      -webkit-user-select:none;
      user-select:none;
      transition:background-color 0.2s,color 0.2s;}

    @media (hover:hover){
      :host(:hover){
        color:rgb(255,255,255);
        background-color:rgb(50,50,50);}
    }
    :host(:active){
      background-color:rgb(65,65,65);}
    </style>
    <slot></slot>
    `;
    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('button-block',ButtonBlock);