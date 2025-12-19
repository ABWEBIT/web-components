class UIWrapper extends HTMLElement{
  connectedCallback(){
    //console.log('wrapper');
  }
}
customElements.define('ui-wrapper',UIWrapper);