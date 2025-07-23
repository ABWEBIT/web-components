import {UIBase} from '../ui-base.js';

class UIBreadcrumb extends UIBase{
  #items = [];
  #iconSeparatorLTR = 'arrow-right-small';
  #iconSeparatorRTL = 'arrow-left-small';

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#items = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.size();
    this.color();
  }

  #render(){
    this.replaceChildren();

    const breadcrumb = document.createElement('nav');
    this.setAttributes(breadcrumb,{
      'data-ui': 'breadcrumb',
      'aria-label': 'Breadcrumb'
    });

    const ol = document.createElement('ol');
    ol.setAttribute('data-ui','breadcrumb-list');

    const fragment = document.createDocumentFragment();
    const isRTL = this.#isRTL();
    const separatorIcon = isRTL ? this.#iconSeparatorRTL : this.#iconSeparatorLTR;

    this.#items.forEach((item,index) => {
      const li = document.createElement('li');
      li.setAttribute('data-ui','breadcrumb-item');

      const isLast = index === this.#items.length - 1;
      const hasIcon = !!item.icon;
      const hasLabel = !!item.label;

      let contentElement;
      if(!isLast && item.href){
        contentElement = document.createElement('a');
        contentElement.href = item.href;
        contentElement.setAttribute('data-ui','breadcrumb-link');
      }
      else{
        contentElement = document.createElement('span');
        contentElement.setAttribute('aria-current','page');
        contentElement.setAttribute('data-ui','breadcrumb-current');
      }

      if(hasIcon){
        const iconEl = document.createElement('ui-icon');
        this.setAttributes(iconEl,{
          icon: item.icon,
          'data-ui': 'breadcrumb-icon',
          'aria-hidden': 'true'
        });
        contentElement.appendChild(iconEl);
      }

      if(hasLabel){
        const textEl = document.createElement('span');
        textEl.textContent = item.label;
        contentElement.appendChild(textEl);
      }

      li.appendChild(contentElement);

      if(!isLast){
        const separator = document.createElement('ui-icon');
        this.setAttributes(separator, {
          'data-ui': 'breadcrumb-separator',
          'aria-hidden': 'true',
          icon: separatorIcon
        });
        li.appendChild(separator);
      }

      fragment.appendChild(li);
    });

    ol.appendChild(fragment);
    breadcrumb.appendChild(ol);
    this.appendChild(breadcrumb);
  }

  #isRTL(){
    return (
      this.dir === 'rtl' || getComputedStyle(this).direction === 'rtl' || document.documentElement.dir === 'rtl'
    );
  }
}

customElements.define('ui-breadcrumb',UIBreadcrumb);