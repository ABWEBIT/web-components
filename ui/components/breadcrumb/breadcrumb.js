class UIBreadcrumb extends HTMLElement{
  #data = null;
  #iconSeparatorLTR = 'keyboard-arrow-right';
  #iconSeparatorRTL = 'keyboard-arrow-left';

  get data(){return this.#data;}
  set data(value){
    if(!Array.isArray(value)) throw new TypeError('Data must be an array');
    if(this.#data === value) return;
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    this.role = 'navigation';
    this.ariaLabel = 'Breadcrumb';
  }

  #render(){
    const isRTL = this.dir === 'rtl' || document.documentElement.dir === 'rtl' || getComputedStyle(this).direction === 'rtl';

    const separatorIcon = isRTL ? this.#iconSeparatorRTL : this.#iconSeparatorLTR;

    const ol = document.createElement('ol');
    ol.role = 'list';

    const separatorTemplate = document.createElement('ui-icon');
    separatorTemplate.role = 'presentation';
    separatorTemplate.setAttribute('name',separatorIcon);

    this.#data.forEach((item,index) => {
      if(!item.label && !item.name){
        console.warn(`Breadcrumb item at index ${index} has no "label" or "icon".`);
      }

      const li = document.createElement('li');
      li.role = 'listitem';

      const isLast = index === this.#data.length - 1;
      const itemContent = isLast ? document.createElement('span') : document.createElement('a');

      if(isLast){
        itemContent.ariaCurrent = 'page';
      }
      else{
        itemContent.href = item.href || '';
      }

      if(item.name){
        const iconContent = document.createElement('ui-icon');
        iconContent.ariaHidden = 'true';
        iconContent.setAttribute('name',item.name);
        itemContent.append(iconContent);
      }

      if(item.label){
        const textContent = document.createElement('span');
        textContent.textContent = item.label;
        itemContent.append(textContent);
      }

      li.append(itemContent);

      if(!isLast){
        li.append(separatorTemplate.cloneNode(true));
      }

      ol.append(li);
    });

    this.replaceChildren(ol);
  }
}

customElements.define('ui-breadcrumb',UIBreadcrumb);