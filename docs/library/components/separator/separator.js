export class UISeparator extends HTMLElement{
  connectedCallback(){
    const orientation = this.getAttribute('orientation');
    if(!orientation) this.setAttribute('orientation','horizontal');
    this.ariaOrientation = orientation || 'horizontal';
    this.role = 'separator';
  }
}
customElements.define('ui-separator',UISeparator);