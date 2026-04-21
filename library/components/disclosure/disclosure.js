import {LitElement} from '../../lit-core.min.js';
import {uuid} from '../../utilities/index.js';

export class UIDisclosure extends LitElement{
  #button = null;
  #panel = null;

  static properties = {
    expanded:{type:Boolean, reflect:true},
    disabled:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  createRenderRoot(){return this;}

  updated(changed){
    if(changed.has('expanded') && this.#button && this.#panel){
      const isExpanded = this.expanded;

      this.#button.ariaExpanded = isExpanded;
      this.#panel.ariaHidden = !isExpanded;
      this.#panel.inert = !isExpanded;

      this.toggleAttribute('expanded', isExpanded);
    }

    if(changed.has('disabled') && this.#button){
      this.#button.disabled = this.disabled;
    }
  }

  connectedCallback(){
    super.connectedCallback();

    this.#button = this.firstElementChild;
    this.#panel = this.#button.nextElementSibling;

    if(!this.#button) throw new Error(`${this.constructor.name}: button not found`);
    if(!this.#panel) throw new Error(`${this.constructor.name}: panel not found`);

    const idBase = uuid();
    const idButton = `disclosure-button-${idBase}`;
    const idPanel = `disclosure-panel-${idBase}`;

    this.#button.id ||= idButton;
    this.#panel.id ||= idPanel;

    this.#button.setAttribute('aria-controls',idPanel);
    this.#panel.setAttribute('aria-labelledby',idButton);

    this.#button.addEventListener('click', () => {
      this.expanded = !this.expanded;
    });

    const icon = document.createElement('ui-icon');
    icon.setAttribute('name','arrow-down');
    icon.setAttribute('icon-expand','');
    this.#button.append(icon);
  }
}
customElements.define('ui-disclosure',UIDisclosure);