class UISeparator extends HTMLElement{
  connectedCallback(){
    this.role = 'separator';
  }
}
customElements.define('ui-separator',UISeparator);