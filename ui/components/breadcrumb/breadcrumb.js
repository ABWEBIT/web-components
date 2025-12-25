class UIBreadcrumb extends HTMLElement{
  #items = [];
  #separatorLTR = 'arrow-right';
  #separatorRTL = 'arrow-left';

  connectedCallback(){
    this.role = 'navigation';
    this.ariaLabel = 'Breadcrumb';

    this.#items = this.querySelectorAll('li');
    
    const direction = (this.dir || document.documentElement.dir || getComputedStyle(this).direction);
    const separatorIcon = direction === 'rtl' ? this.#separatorRTL : this.#separatorLTR;

    const icon = document.createElement('ui-icon');
    icon.role = 'presentation';
    icon.setAttribute('name',separatorIcon);

    this.#items.forEach((item,index) =>{
      if(index < this.#items.length - 1){
        item.append(icon.cloneNode(true));
      }
    });

  }
}

customElements.define('ui-breadcrumb',UIBreadcrumb);
