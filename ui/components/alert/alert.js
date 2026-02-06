class UIAlert extends HTMLElement{
  constructor(){
    super();
    this.role = 'alert';

    const isClosable = this.hasAttribute('closable');
    if(isClosable){
      const button = document.createElement('ui-button');
      button.setAttribute('shape','circle');
      button.setAttribute('size','small');
      button.setAttribute('variant','ghost');

      const icon = document.createElement('ui-icon');
      icon.setAttribute('name','close');
      button.append(icon);
      this.append(button);

      button.addEventListener('button-action',() => this.remove());
    }
    else this.removeAttribute('closable');

  }
}
customElements.define('ui-alert',UIAlert);