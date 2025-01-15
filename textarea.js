class Textarea extends HTMLElement{
  constructor(){
    super();
    this.rendered = false;
    this.required = false;
    this.heightMin = 0;
    this.heightMax = 0;
    this.lengthMin = 0;
    this.lengthMax = 0;
    this.label = '';
    this.addEventListener('input',()=>this.changeInput());
    //window.addEventListener('resize',()=>this.update());
  };

  renderElement(){
    this.rendered = true;
  };

  changeInput(){
    console.log(this.textContent.length);
  };

  connectedCallback(){
    if(!this.rendered) this.renderElement();
  };

  disconnectedCallback(){
    this.rendered = false;
  };


  updateElement(){
    console.log('+');
  };

}

customElements.define('textarea-',Textarea);