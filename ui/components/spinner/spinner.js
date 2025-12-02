class UISpinner extends HTMLElement{
  connectedCallback(){
    const svg = document.createElement('ui-icon');
    svg.setAttribute('name','progress-activity');
    this.append(svg);
  }
}
customElements.define('ui-spinner',UISpinner);