//import uuid from '../helpers/uuid.js';

class ButtonBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #before = '';
  #after = '';
  #type = 'text';

  connectedCallback(){
    this.#shadow.innerHTML = `
      <style>
      :host *{box-sizing:border-box;outline:none;}

      :host{
        position:relative;
        display:inline-flex;
        border:none;
        border-radius:var(--border-radius);
        width:300px;
        height:40px;
        align-items:center;
        vertical-align:middle;
        column-gap:15px;
        padding:0 12px;
        background-color:rgb(25,25,25);
        text-align:center;
        color:rgb(175,175,175);
        cursor:pointer;
        -webkit-user-select:none;
        user-select:none;
        transition:background-color 0.2s,color 0.2s;}

      :host > icon-block{
        height:inherit;}

      :host::after{
        position:absolute;
        display:block;
        inset:0;
        content:'';}

      @media (hover:hover){
        :host(:hover),
        :host(:hover) > icon-block{
          color:rgb(255,255,255);}

        :host(:hover){
          background-color:rgb(35,35,35);}
      }

      :host:active{
        background-color:rgb(45,45,45);}

      :host > text-block{flex-grow:1;}
      </style>`;


    //this.setAttribute('data-uuid',uuid());
  }

}
customElements.define('button-block',ButtonBlock);