class UIAlert extends HTMLElement{

  connectedCallback(){
    this.role = 'alert';

    const label = this.querySelector('ui-label');
    if(label){
      label.role = 'heading';
      label.ariaLevel = "6";
    }

    if(!this.hasAttribute('non-closable')){
      const button = document.createElement('ui-button');
      button.setAttribute('shape','circle');
      button.setAttribute('icon-only','');

      const uiIcon = document.createElement('ui-icon');
      uiIcon.setAttribute('name','close');
      button.append(uiIcon);

      button.addEventListener('button-action',() => this.remove());

      this.append(button);
    }
    else this.removeAttribute('non-closable');

  }
}
customElements.define('ui-alert',UIAlert);