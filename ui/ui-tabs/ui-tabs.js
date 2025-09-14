import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UITabs extends UIBase{
  #data = [];
  #activeIndex = 0;

  get data(){return this.#data;}
  set data(value){
    if(!Array.isArray(value)) throw new Error('Data must be an array');
    if(this.#data === value) return;
    this.#data = value;
    this.#render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.shape();
    this.size();
    this.theme();
  }

  #render(){
    this.replaceChildren();

    const tablist = document.createElement('div');
    tablist.role = 'tablist';
    tablist.dataset.ui = 'tabs-list';

    const panelsContainer = document.createElement('div');
    panelsContainer.setAttribute('data-ui','tabs-panels');

    this.#data.forEach((item,index) => {
      const id = uuid();
      const idControl = `id-controls-${id}`;
      const idTab = `id-tab-${id}`;

      const tab = document.createElement('ui-button');
      this.setAttributes(tab,{
        'data-ui': 'tab',
        'role': 'tab',
        'tabindex': index === this.#activeIndex && !item.disabled ? '0' : '-1',
        'aria-selected': index === this.#activeIndex ? 'true' : 'false',
        'id': idTab,
        'aria-controls': idControl
      });
      tab.disabled = !!item.disabled
      tab.textContent = item.label ?? '';
      tab.addEventListener('click', () => {
        if(!tab.disabled){
          this.#activateTab(index);
        }
      });
      tab.addEventListener('keydown',(e) => this.#onKeyDown(e,index));

      tablist.appendChild(tab);

      // Panel
      const panel = document.createElement('div');
      this.setAttributes(panel,{
        'data-ui': 'tab-panel',
        'role': 'tabpanel',
        'id': idControl,
        'aria-labelledby': idTab
      });
      panel.hidden = index !== this.#activeIndex || item.disabled;
      panel.innerHTML = item.content ?? '';

      panelsContainer.appendChild(panel);
    });

    this.append(tablist,panelsContainer);
  }

  #activateTab = (index) => {
    const tabs = this.querySelectorAll('[role="tab"]');
    const panels = this.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab,idx) => {
      tab.setAttribute('aria-selected', idx === index ? 'true' : 'false');
      tab.setAttribute('tabindex', idx === index && !this.#data[idx].disabled ? '0' : '-1');
    });

    panels.forEach((panel,idx) => {
      panel.hidden = idx !== index || this.#data[idx].disabled;
    });

    this.#activeIndex = index;
  }

  #onKeyDown = (e,index) => {
    const total = this.#data.length;
    let newIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % total;
        while (this.#data[newIndex]?.disabled){
          newIndex = (newIndex + 1) % total;
        }
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + total) % total;
        while (this.#data[newIndex]?.disabled){
          newIndex = (newIndex - 1 + total) % total;
        }
        break;
      case 'Home':
        newIndex = 0;
        while (this.#data[newIndex]?.disabled){
          newIndex = (newIndex + 1) % total;
        }
        break;
      case 'End':
        newIndex = total - 1;
        while (this.#data[newIndex]?.disabled){
          newIndex = (newIndex - 1 + total) % total;
        }
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
}

customElements.define('ui-tabs',UITabs);