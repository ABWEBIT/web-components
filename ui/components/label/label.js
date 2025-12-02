class UILabel extends HTMLElement{
  #indicator = '*';

  connectedCallback(){
    if(!this.hasAttribute('required')) return;

    const indicator = document.createElement('span');
    indicator.textContent = this.getAttribute('indicator') ?? this.#indicator;
    this.append(indicator);
  }
}
customElements.define('ui-label',UILabel);