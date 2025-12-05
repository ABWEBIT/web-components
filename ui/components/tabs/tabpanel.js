class UITabpanel extends HTMLElement{
  connectedCallback(){
    this.role = 'tabpanel';
  }
}
customElements.define('ui-tabpanel',UITabpanel);