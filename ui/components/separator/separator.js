class UISeparator extends HTMLElement{
  connectedCallback(){
    const orientation = this.getAttribute('orientation') || 'horizontal';
    this.setAttribute('orientation',orientation);
    this.ariaOrientation = orientation;
    this.role = 'separator';
  }
}
customElements.define('ui-separator',UISeparator);