class UISeparator extends HTMLElement{
  connectedCallback(){
    this.role = 'separator';
    const orientation = this.getAttribute('orientation') || 'horizontal';
    this.setAttribute('orientation',orientation);
    this.ariaOrientation = orientation;
  }
}
customElements.define('ui-separator',UISeparator);