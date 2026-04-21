import {LitElement} from '../../lit-core.min.js';
import {uuid} from '../../utilities/index.js';

export class UIAccordion extends LitElement{
  #items = [];

  createRenderRoot(){return this;}

  connectedCallback() {
    super.connectedCallback();

    const nodes = [...this.children];

    this.#items = nodes.map((node) => {
      const button = node.firstElementChild.firstElementChild
      const panel = node.lastElementChild;

      console.log(button);
      console.log(panel);

      if(!button) throw new Error(`${this.constructor.name}: button not found`);
      if(!panel) throw new Error(`${this.constructor.name}: panel not found`);

      const id = uuid();

      const item = {
        el: node,
        button,
        panel,
        disabled: node.hasAttribute('disabled'),
        expanded: node.hasAttribute('expanded'),
        idButton: button.id || `button-${id}`,
        idPanel: panel.id || `panel-${id}`
      };

      button.id = item.idButton;
      panel.id = item.idPanel;

      button.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', button.id);
      panel.setAttribute('role', 'region');

      this.#applyState(item);

      button.addEventListener('click', () => this.#onToggle(item));

      if(!button.querySelector('[expand-icon]')){
        const icon = document.createElement('ui-icon');
        icon.setAttribute('name','arrow-down');
        icon.setAttribute('expand-icon','');
        button.append(icon);
      }

      return item;
    });
  }

  #onToggle(item){
    if(item.disabled) return;

    const isSingle = this.hasAttribute('single');

    if(isSingle){
      this.#items.forEach((i) =>{
        if(i.disabled) return;
        i.expanded = i === item ? !i.expanded : false;
        this.#applyState(i);
      });
    }
    else{
      item.expanded = !item.expanded;
      this.#applyState(item);
    }
  }

  #applyState(item){
    item.el.toggleAttribute('expanded',item.expanded);
    item.el.toggleAttribute('disabled',item.disabled);

    item.button.disabled = item.disabled;
    item.button.setAttribute('aria-expanded', String(item.expanded));

    item.panel.setAttribute('aria-hidden', String(!item.expanded));
    item.panel.inert = !item.expanded;
  }
}
customElements.define('ui-accordion',UIAccordion);