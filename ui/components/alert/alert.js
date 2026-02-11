class UIAlert extends HTMLElement{
  constructor(){
    super();
    this.role = 'alert';

    const isClosable = this.hasAttribute('non-closable');
    if(isClosable) return;

    const button = document.createElement('button');
    button.dataset.radius = 'full';
    button.dataset.size = 'small';
    button.dataset.variant = 'invisible';

    const icon = document.createElement('ui-icon');
    icon.setAttribute('name','close');
    button.append(icon);

    this.append(button);

    button.addEventListener('click',() => this.remove());
  }
}
customElements.define('ui-alert',UIAlert);