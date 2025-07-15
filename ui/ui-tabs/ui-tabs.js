import {UIBase} from '../ui-base.js';

class UITabs extends UIBase{
  #componentListener = new AbortController();
  #items = [];
  #iconExpand = 'arrow-down-small';

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#items = value;
    this.render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();

    const opts = { signal: this.#componentListener.signal };
    this.addEventListener('click',this.#onClick,opts);
    this.addEventListener('keydown',this.#onKeyDown,opts);
  }

  disconnectedCallback(){
    this.#componentListener.abort();
    this.#componentListener = null;
  }

  render(){
    this.replaceChildren();

    this.#items.forEach((item,index) => {
      const accordionItem = document.createElement('div');
      this.setAttributes(accordionItem,{
        'data-ui': 'accordion-item',
        'data-ui-index': index
      });

      const accordionHeader = document.createElement('div');
      this.setAttributes(accordionHeader,{
        'data-ui': 'accordion-header',
        'role': 'button',
        'tabindex': '0',
        'aria-expanded': 'false'
      });

      const accordionHeaderText = document.createElement('div');
      accordionHeaderText.setAttribute('data-ui','accordion-header-text');
      accordionHeaderText.textContent = item.header ?? '';

      const accordionHeaderIcon = document.createElement('div');
      accordionHeaderIcon.setAttribute('data-ui','accordion-header-icon');

      const iconName = this.getAttribute('icon') || this.#iconExpand;

      const icon = document.createElement('ui-icon');
      icon.setAttribute('icon',iconName);
      accordionHeaderIcon.appendChild(icon);
      this.removeAttribute('icon');

      accordionHeader.append(accordionHeaderText,accordionHeaderIcon);
  
      const accordionBody = document.createElement('div');
      accordionBody.setAttribute('data-ui','accordion-body');
      accordionBody.innerHTML = item.body ?? '';
      
      accordionItem.append(accordionHeader,accordionBody);
      this.appendChild(accordionItem);
    });
  }

  #onClick = (e) => {
    if(typeof this.#onAction === 'function') this.#onAction(e);
  }

  #onKeyDown = (e) => {
    if(e.key !== 'Tab') e.preventDefault();
    if(e.repeat) return;
    if(e.key === 'Enter' || e.key === ' '){
      this.#onAction(e);
    }
  }

  #onAction = (e) => {
    const title = e.target.closest('[data-ui="accordion-header"]');
    if(!title) return;
    e.preventDefault();
    const expanded = title.getAttribute('aria-expanded') === 'true';
    title.setAttribute('aria-expanded',String(!expanded));
  }

}
customElements.define('ui-tabs',UITabs);