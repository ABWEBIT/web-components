class UITablist extends HTMLElement{
  connectedCallback(){
    this.role = 'tablist';
  }
}
customElements.define('ui-tablist',UITablist);