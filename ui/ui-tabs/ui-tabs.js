import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UITabs extends UIBase{
  #items = [];
  #activeIndex = 0;

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#items = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.color();
  }

  #render(){
    this.replaceChildren();

    const tablist = document.createElement('div');
    this.setAttributes(tablist, {
      'data-ui': 'tabslist',
      'role': 'tablist'
    });

    const panelsContainer = document.createElement('div');
    panelsContainer.setAttribute('data-ui', 'tabs-panels');

    this.#items.forEach((item,index) => {
      const id = uuid();
      const idControl = `id-controls-${id}`;
      const idTab = `id-tab-${id}`;

      const tab = document.createElement('button');
      this.setAttributes(tab, {
        'data-ui': 'tab',
        'role': 'tab',
        'type': 'button',
        'tabindex': index === this.#activeIndex ? '0' : '-1',
        'aria-selected': index === this.#activeIndex ? 'true' : 'false',
        'id': idTab,
        'aria-controls': idControl
      });
      tab.textContent = item.header ?? '';
      tab.addEventListener('click', () => this.#activateTab(index));
      tab.addEventListener('keydown', (e) => this.#onKeyDown(e, index));

      tablist.appendChild(tab);

      // Panel
      const panel = document.createElement('div');
      this.setAttributes(panel, {
        'data-ui': 'tabpanel',
        'role': 'tabpanel',
        'id': idControl,
        'aria-labelledby': idTab
      });
      panel.hidden = index !== this.#activeIndex;
      panel.innerHTML = item.panel ?? '';

      panelsContainer.appendChild(panel);
    });
    this.append(tablist, panelsContainer);
  }

  #activateTab(index) {
    this.#activeIndex = index;
    //this.#render();
  }

  #onKeyDown(e, index) {
    const total = this.#items.length;
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % total;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + total) % total;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = total - 1;
        break;
      case 'Enter':
      case ' ':
        this.#activateTab(index);
        return;
      default:
        return;
    }

    e.preventDefault();
    this.#focusTab(newIndex);
  }

  #focusTab = (index) => {
    const tabs = this.querySelectorAll('[role="tab"]');
    tabs[index]?.focus();
  }

  #onAction = (e) => {

  }

}
customElements.define('ui-tabs',UITabs);