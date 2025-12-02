class UIFocus extends HTMLElement{
  connectedCallback(){
    this.tabIndex = '0';
    this.ariaHidden = 'true';
  }
}
customElements.define('ui-focus',UIFocus);