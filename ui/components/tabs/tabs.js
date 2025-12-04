import {uuid} from '../../utils/index.js';

class UITablist extends HTMLElement{}
customElements.define('ui-tablist',UITablist);

class UITab extends HTMLElement{}
customElements.define('ui-tab',UITab);

class UITabpanel extends HTMLElement{}
customElements.define('ui-tabpanel',UITabpanel);

class UITabs extends HTMLElement{
  #tablist = null;
  #tabs = [];
  #panels = [];
  #activeIndex = 0;

  connectedCallback(){
    this.#tablist = this.querySelector('ui-tablist');
    if(!this.#tablist){
      throw new Error(`Error: <ui-tablist> element is missing.`);
    }
    this.#tablist.role = "tablist";

    this.#tabs = this.querySelectorAll('ui-tab');
    this.#panels = this.querySelectorAll('ui-tabpanel');

    if(this.#tabs.length !== this.#panels.length){
      throw new Error(`Error: the number of tabs (${this.#tabs.length}) does not match the number of panels (${this.#panels.length}).`);
    };

    this.#tabs.forEach((tab,index) =>{
      const id = uuid();
      const idTab = `id-tab-${id}`;
      const idPanel = `id-panel-${id}`;

      const panel = this.#panels[index];
      const isSelected = index === this.#activeIndex;
      const isDisabled = tab.hasAttribute('disabled');

      tab.role = 'tab';
      panel.role = 'tabpanel';

      if(!tab.id) tab.id = idTab;
      if(!panel.id) panel.id = idPanel;

      tab.setAttribute('aria-controls',idPanel);
      panel.setAttribute('aria-labelledby',idTab);

      tab.tabIndex = isSelected ? 0 : -1;
      tab.ariaSelected = isSelected ? 'true' : null;

      if(isSelected){
        tab.setAttribute('selected','');
      }
      else{
        tab.removeAttribute('selected');
      }

      tab.ariaDisabled = isDisabled ? true : null;
      panel.ariaHidden = !isSelected;
      panel.hidden = !isSelected;

      tab.addEventListener('keydown',(e) => this.#onKeyDown(e,index));

      tab.addEventListener('click',() =>{
        if(isDisabled) return;
        this.#activateTab(index);
      });
    });
  }

  #activateTab = (newIndex) =>{
    const oldIndex = this.#activeIndex;
    if (newIndex === oldIndex) return;

    const oldTab = this.#tabs[oldIndex];
    const oldPanel = this.#panels[oldIndex];
    if(oldTab && oldPanel){
      oldTab.ariaSelected = null;
      oldTab.removeAttribute('selected');
      oldTab.tabIndex = -1;
      oldPanel.hidden = true;
      oldPanel.ariaHidden = 'true';
    }

    const newTab = this.#tabs[newIndex];
    const newPanel = this.#panels[newIndex];
    if(newTab && newPanel && !newTab.disabled){
      newTab.ariaSelected = 'true';
      newTab.setAttribute('selected','');
      newTab.tabIndex = 0;
      newPanel.hidden = false;
      newPanel.ariaHidden = 'false';
      this.#activeIndex = newIndex;
    }
  }

  #onKeyDown = (e,index) =>{
    e.preventDefault();
    const total = this.#tabs.length;
    let newIndex = index;

    const isDisabled = i => this.#tabs[i]?.hasAttribute('disabled');
    const isSkippable = i => isDisabled(i) && i !== index;

    switch(e.key){
      case 'ArrowRight':
        newIndex = (index + 1) % total;
        while (isSkippable(newIndex)){
          newIndex = (newIndex + 1) % total;
        }
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + total) % total;
        while (isSkippable(newIndex)){
          newIndex = (newIndex - 1 + total) % total;
        }
        break;
      case 'Home':
        newIndex = 0;
        while (isSkippable(newIndex)){
          newIndex = (newIndex + 1) % total;
        }
        break;
      case 'End':
        newIndex = total - 1;
        while (isSkippable(newIndex)){
          newIndex = (newIndex - 1 + total) % total;
        }
        break;
      case 'Enter':
      case ' ':
        if (!isDisabled(index)) this.#activateTab(index);
        return;
      default:
        return;
    }

    this.#tabs[newIndex]?.focus();
  }
}
customElements.define('ui-tabs',UITabs);