class UIAlert extends HTMLElement{

  connectedCallback(){
    this.role = 'alert';

    if(!this.hasAttribute('non-closable')){
      const button = document.createElement('ui-button');
      button.setAttribute('shape','circle');
      button.setAttribute('size','small');
      button.setAttribute('varian','ghost');

      const icon = document.createElement('ui-icon');
      icon.setAttribute('name','close');
      button.append(icon);

      button.addEventListener('button-action',() => this.remove());

      this.append(button);
    }
    else this.removeAttribute('non-closable');

  }
}
customElements.define('ui-alert',UIAlert);