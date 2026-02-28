class UIBreadcrumb extends LitElement{
  #items = [];

  connectedCallback(){
    this.role = 'navigation';

    this.#items = this.querySelectorAll('li');
    
    const direction = (this.dir || document.documentElement.dir || getComputedStyle(this).direction);
    const separator = direction === 'rtl' ? 'arrow-left' : 'arrow-right';

    const icon = document.createElement('ui-icon');
    icon.role = 'presentation';
    icon.setAttribute('name',separator);

    this.#items.forEach((item,index) =>{
      if(index < this.#items.length - 1){
        item.append(icon.cloneNode(true));
      }
    });

  }
}

customElements.define('ui-breadcrumb',UIBreadcrumb);