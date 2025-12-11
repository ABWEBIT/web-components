import {uuid} from '../../utils/index.js';

class UITabs extends HTMLElement{
  #tabs = [];
  #panels = [];
  #activeIndex = 0;

  connectedCallback(){
    const tablist = this.querySelector(':scope > div');
    if(!tablist){
      throw new Error('Error: "tablist" element is missing.');
    }
    tablist.role = 'tablist';

    this.#tabs = tablist.querySelectorAll('button');
    this.#panels = this.querySelectorAll(':scope > div + div');

    if(this.#tabs.length !== this.#panels.length){
      throw new Error(`Error: the number of tabs (${this.#tabs.length}) does not match the number of panels (${this.#panels.length}).`);
    };

    this.#tabs.forEach((tab,index) =>{
      tab.role = 'tab';

      const id = uuid();
      const idTab = `id-tab-${id}`;
      const idPanel = `id-panel-${id}`;

      const panel = this.#panels[index];
      panel.role = 'tabpanel';

      const isSelected = index === this.#activeIndex;

      tab.id ||= idTab;
      panel.id ||= idPanel;

      tab.setAttribute('aria-controls',panel.id);
      panel.setAttribute('aria-labelledby',tab.id);

      tab.tabIndex = isSelected ? 0 : -1;
      tab.ariaSelected = isSelected ? 'true' : 'false';

      if(isSelected){
        tab.setAttribute('data-selected','');
      }
      else{
        tab.removeAttribute('data-selected');
      }

      //tab.ariaDisabled = isDisabled ? true : null;
      panel.ariaHidden = !isSelected;
      panel.hidden = !isSelected;

      tab.addEventListener('keydown',(e) => this.#onKeyDown(e,index));

      tab.addEventListener('click',() =>{
        if(tab.disabled === true) return;
        this.#activateTab(index);
      });
    });
  }

  #updateTabState = (tab,panel,isActive) =>{
    if(!tab || !panel) return;

    tab.ariaSelected = isActive ? 'true' : 'false';
    tab.tabIndex = isActive ? 0 : -1;

    if(isActive) tab.setAttribute('data-selected','');
    else tab.removeAttribute('data-selected');

    panel.hidden = !isActive;
    panel.ariaHidden = isActive ? 'false' : 'true';
  }

  #activateTab = (newIndex) =>{
    const oldIndex = this.#activeIndex;
    if(newIndex === oldIndex) return;

    this.#updateTabState(this.#tabs[oldIndex],this.#panels[oldIndex],false);

    const newTab = this.#tabs[newIndex];
    if(newTab && !newTab.disabled){
      this.#updateTabState(newTab,this.#panels[newIndex],true);
      this.#activeIndex = newIndex;
    }
  }

  #onKeyDown = (e,index) =>{
    if(e.repeat) return;
    const total = this.#tabs.length;
    let newIndex = index;

    const isDisabled = i => this.#tabs[i]?.disabled;
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
        e.preventDefault();
        newIndex = 0;
        while (isSkippable(newIndex)){
          newIndex = (newIndex + 1) % total;
        }
        break;
      case 'End':
        e.preventDefault();
        newIndex = total - 1;
        while (isSkippable(newIndex)){
          newIndex = (newIndex - 1 + total) % total;
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isDisabled(index)) this.#activateTab(index);
        return;
      default:
        return;
    }

    this.#tabs[newIndex]?.focus();
  }
}
customElements.define('ui-tabs',UITabs);