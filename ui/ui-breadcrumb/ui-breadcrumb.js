import {UIBase} from '../ui-base.js';

class UIBreadcrumb extends UIBase{
  #items = [];
  #iconSeparatorLTR = 'arrow-right-small';
  #iconSeparatorRTL = 'arrow-left-small';

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new TypeError('Items must be an array');
    if(this.#items === value) return;
    this.#items = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.size();
    this.color();
  }

  #render(){
    const isRTL = this.dir === 'rtl' || document.documentElement.dir === 'rtl' || getComputedStyle(this).direction === 'rtl';

    const separatorIcon = isRTL ? this.#iconSeparatorRTL : this.#iconSeparatorLTR;

    const breadcrumb = document.createElement('nav');
    this.setAttributes(breadcrumb,{
      'data-ui': 'breadcrumb',
      'aria-label': 'Breadcrumb'
    });

    const ol = document.createElement('ol');
    ol.setAttribute('data-ui', 'breadcrumb-list');

    const separatorTemplate = document.createElement('ui-icon');
    this.setAttributes(separatorTemplate,{
      'data-ui': 'breadcrumb-separator',
      'aria-hidden': 'true',
      'icon': separatorIcon
    });

    this.#items.forEach((item,index) => {
      if(!item.label && !item.icon){
        console.warn(`Breadcrumb item at index ${index} has no "label" or "icon".`);
      }

      const li = document.createElement('li');
      li.setAttribute('data-ui','breadcrumb-item');

      const isLast = index === this.#items.length - 1;
      const itemContent = isLast ? document.createElement('span') : document.createElement('a');

      if(isLast){
        this.setAttributes(itemContent,{
          'data-ui': 'breadcrumb-current',
          'aria-current': 'page'
        });
      }
      else{
        itemContent.setAttribute('data-ui','breadcrumb-link');
        itemContent.href = item.href || '';
      }

      if(item.icon){
        const iconContent = document.createElement('ui-icon');
        this.setAttributes(iconContent,{
          'data-ui': 'breadcrumb-icon',
          'aria-hidden': 'true',
          'icon': item.icon
        });
        itemContent.appendChild(iconContent);
      }

      if(item.label){
        const textContent = document.createElement('span');
        textContent.textContent = item.label;
        itemContent.appendChild(textContent);
      }

      li.appendChild(itemContent);

      if(!isLast){
        li.appendChild(separatorTemplate.cloneNode(true));
      }

      ol.appendChild(li);
    });

    breadcrumb.appendChild(ol);
    this.replaceChildren(breadcrumb);
  }
}

customElements.define('ui-breadcrumb',UIBreadcrumb);