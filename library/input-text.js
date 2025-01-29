class InputText extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.required = true;
    this.disabled = false;
    this.label = 'Label';
    this.helper = 'Helper';
    this.render();
  }

  render(){
    // fragment
    const fragment = document.createDocumentFragment();

    // css
    this.cssBlock = document.createElement('style');
    this.cssBlock.textContent =`
      :host,:host div{
        position:relative;box-sizing:border-box;width:100%;}

      :host{
        display:inline-flex;
        flex-direction:column;
        row-gap:6px;
        max-width:100%;}

      :host > .label,:host > .helper{-webkit-user-select:none;user-select:none;}
      :host > .label{font-size:110%;color:var(--rgb-255-255-255);}
      :host > .helper{font-size:85%;color:var(--rgb-155-155-155);}

      :host > .field{
        overflow:hidden;
        border-radius:5px;
        padding:10px;
        background-color:var(--rgb-255-255-255);}

      :host > .field > .input{
        display:block;
        overflow:hidden;
        border:none;
        outline:none;}`;

    // label
    if(this.label?.trim()){
      this.labelBlock = document.createElement('div');
      this.labelBlock.classList.add('label');
      this.labelBlock.textContent = `${this.label.trim()}`;
    };

    // required
    if(this.required === true){
      this.labelBlock.textContent += '*';
    };

    //this.labelHTML = (this.label?.trim()) ? 
    //  `<div class="label">${this.label.trim()}</div>`:'';

    // input
    this.fieldBlock = document.createElement('div');
    this.fieldBlock.classList.add('field');
    this.inputBlock = document.createElement('div');
    this.inputBlock.classList.add('input');
    this.inputBlock.contentEditable = true;
    this.fieldBlock.appendChild(this.inputBlock);

    // helper
    if(this.helper?.trim()){
      this.helperBlock = document.createElement('div');
      this.helperBlock.classList.add('helper');
      this.helperBlock.textContent = `${this.helper.trim()}`;
    }

    // build
    fragment.appendChild(this.cssBlock);
    fragment.appendChild(this.labelBlock);
    fragment.appendChild(this.fieldBlock);
    fragment.appendChild(this.helperBlock);

    // append
    this.shadowRoot.appendChild(fragment);

    //this.shadowRoot.querySelector('.input').addEventListener('input',()=>this.changeInput());
  }

  changeInput(){
    console.log(this.shadowRoot.querySelector('.input').textContent.length);
  }


}
customElements.define('input-text',InputText);