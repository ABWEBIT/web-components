import uuid from '../helpers/uuid.js';

class InputText extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  //#label = 'Label';
  //#hint = 'This is the hint for input field';
  //#validator = this.validation.bind(this);

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host{
      position:relative;
      display:inline-flex;
      border:none;
      border-radius:var(--border-radius);
      width:100%;
      max-width:100%;
      height:40px;
      align-items:center;
      vertical-align:middle;
      column-gap:15px;
      background-color:rgb(30,30,30);
      color:rgb(175,175,175);
      cursor:pointer;
      white-space:pre-wrap;
      transition:background-color 0.2s,color 0.2s;}

    @media (hover:hover){
      :host(:hover){
        color:rgb(255,255,255);
        background-color:rgb(50,50,50);}
    }
    :host(:active){
      background-color:rgb(65,65,65);}

    text-block{height:40px;}

    label,.hint{
      text-overflow:ellipsis;
      -webkit-user-select:none;
      user-select:none;}

    label > span{color:rgb(185,65,65);padding-left:5px;}
    .hint{font-size:75%;}

    .input{
      display:block;
      color:var(--rgb-0-0-0);
      background-color:transparent;
      line-height:30px;
      overflow:hidden;
      white-space:nowrap;
      border:none;
      outline:none;}

    </style>
    <slot></slot>
    `;
    //this.setAttribute('data-uuid',uuid());

    //this.shadowRoot.querySelector('.input').addEventListener('input',this.validator);
  }

  disconnectedCallback(){
    //this.shadowRoot.querySelector('.input').removeEventListener('input',this.validator);
  }

  validation(){
    //console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }

}
customElements.define('input-text',InputText);