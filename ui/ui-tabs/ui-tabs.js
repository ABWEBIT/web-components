import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/uuid.js';
import DOMPurify from '../../utils/purify.es.mjs';

class UITabs extends UIBase{
  #data = null;
  #tabs = null;
  #panels = null;
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
  }

  #render(){
    this.#tabs = [];
    this.#panels = [];

    const tablist = document.createElement('div');
    tablist.role = 'tablist';

    const panels = document.createDocumentFragment();

    this.#data.forEach((item,index) => {
      const id = uuid();
      const idTab = `id-tab-${id}`;
      const idControl = `id-controls-${id}`;

      const isActive = index === this.#activeIndex && !item.disabled;

      // tab
      const tab = document.createElement('div');
      tab.role = 'tab';
      tab.tabIndex = isActive ? 0 : -1;
      tab.ariaSelected = isActive ? 'true' : 'false';
      tab.ariaDisabled = item.disabled;
      tab.id = idTab;
      tab.setAttribute('aria-controls',idControl);
      if(item.disabled) tab.setAttribute('disabled','');

      tab.textContent = item.title ?? '';

      tab.addEventListener('click',() =>{
        if(item.disabled) return;
        this.#activateTab(index);
      });

      tab.addEventListener('keydown',(e) => this.#onKeyDown(e,index));

      tablist.append(tab);
      this.#tabs.push(tab);

      // panel
      const panel = document.createElement('div');
      panel.role = 'tabpanel';
      panel.ariaHidden = !isActive;
      panel.hidden = !isActive;
      panel.id = idControl;
      panel.setAttribute('aria-labelledby',idTab);

      panel.innerHTML = DOMPurify.sanitize(item.content ?? '');

      panels.append(panel);
      this.#panels.push(panel);
    });

    this.replaceChildren(tablist,panels);
  }

  #activateTab = (newIndex) =>{
    const oldIndex = this.#activeIndex;
    if (newIndex === oldIndex) return;

    const oldTab = this.#tabs[oldIndex];
    const oldPanel = this.#panels[oldIndex];
    if(oldTab && oldPanel){
      oldTab.ariaSelected = 'false';
      oldTab.tabIndex = -1;
      oldPanel.hidden = true;
      oldPanel.ariaHidden = 'true';
    }

    const newTab = this.#tabs[newIndex];
    const newPanel = this.#panels[newIndex];
    if(newTab && newPanel && !this.#data[newIndex].disabled){
      newTab.ariaSelected = 'true';
      newTab.tabIndex = 0;
      newPanel.hidden = false;
      newPanel.ariaHidden = 'false';
      this.#activeIndex = newIndex;
    }
  }

  #onKeyDown = (e,index) =>{
    e.preventDefault();
    const total = this.#data.length;
    let newIndex = index;

    switch(e.key){
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

    this.#tabs[newIndex]?.focus();
  }
}
customElements.define('ui-tabs',UITabs);