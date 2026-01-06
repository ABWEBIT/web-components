class UISeparator extends HTMLElement{
  connectedCallback(){
    const orientation = this.getAttribute('orientation') || 'horizontal';
    this.setAttribute('orientation',orientation);
    this.role = 'separator';
    this.ariaOrientation = orientation;
  }
}
customElements.define('ui-separator',UISeparator);