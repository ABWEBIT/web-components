class UIHeading extends HTMLElement{
  connectedCallback(){
    if(!this.hasAttribute('role')){
      this.role = 'heading';
    }

    if(this.getAttribute('role') === 'heading'){
      this.ariaLevel ||= '6';
    }
  }
}
customElements.define('ui-heading',UIHeading);