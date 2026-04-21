export class UIBreadcrumb extends HTMLElement{
  #items = [];

  connectedCallback(){
    this.role = 'navigation';
  }
}

customElements.define('ui-breadcrumb',UIBreadcrumb);