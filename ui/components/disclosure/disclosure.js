import {LitElement} from '../../lit-core.min.js';
import {uuid} from '../../utilities/index.js';

export class UIDisclosure extends LitElement{
  #button = null;
  #div = null;

  static properties = {
    expanded:{type:Boolean, reflect:true},
    disabled:{type:Boolean, reflect:true},
    config:{type:Object}
  };

  connectedCallback(){
    this.#button = this.firstElementChild;
    this.#div = this.#button.nextElementSibling;

    if(!this.#button){
      throw new Error(`${this.constructor.name}: button not found`);
    }

    if(!this.#div){
      throw new Error(`${this.constructor.name}: panel not found`);
    }

    const idBase = uuid();
    const idButton = `disclosure-button-${idBase}`;
    const idDiv = `disclosure-div-${idBase}`;

    this.#button.disabled = this.hasAttribute('disabled');
    this.#button.ariaExpanded = this.hasAttribute('expanded');

    this.#button.id ||= idButton;
    this.#div.id ||= idDiv;

    this.#button.setAttribute('aria-controls',idDiv);
    this.#div.setAttribute('aria-labelledby',idButton);

    this.#button.disabled = this.hasAttribute('disabled');
    this.#button.ariaExpanded = this.hasAttribute('expanded');

    this.#button.addEventListener('click',() => {
      this.expanded = !this.expanded;

      this.toggleAttribute('expanded',this.expanded);
      this.#button.ariaExpanded = this.expanded;
      this.#div.ariaHidden = !this.expanded;
      this.#div.inert = !this.expanded;

      this.dispatchEvent(new CustomEvent('disclosure-toggle',{
        bubbles: true,
        composed: true,
        detail: { item: this}
      }));
    });

    const icon = document.createElement('ui-icon');
    icon.setAttribute('name','arrow-down');
    icon.setAttribute('expand-icon','');
    this.#button.append(icon);
  }

  updated(changed){
    if(changed.has('expanded')){
      this.expanded = !this.expanded;
    }
  }
}
customElements.define('ui-disclosure',UIDisclosure);