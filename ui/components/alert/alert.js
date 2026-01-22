class UIAlert extends HTMLElement{

  connectedCallback(){
    this.role = 'alert';

    if(!this.hasAttribute('non-closable')){
      const _button = document.createElement('ui-button');
      _button.setAttribute('shape','circle');
      _button.setAttribute('size','small');
      _button.setAttribute('variant','ghost');
      const button = document.createElement('button');

      const icon = document.createElement('ui-icon');
      icon.setAttribute('name','close');
      button.append(icon);
      _button.append(button);

      button.addEventListener('button-action',() => this.remove());

      this.append(_button);
    }
    else this.removeAttribute('non-closable');

  }
}
customElements.define('ui-alert',UIAlert);