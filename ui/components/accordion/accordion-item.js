import {uuid} from '../../utilities/index.js';

class UIAccordionItem extends HTMLElement{
  #disabled = false;
  #expanded = false;
  #button = null;
  #panel = null;

  static get observedAttributes(){
    return ['disabled','expanded'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'disabled') this.disabled = newValue !== null;
    if(attribute === 'expanded') this.expanded = newValue !== null;
  }

  get disabled(){return this.#disabled;}
  set disabled(value){
    const isDisabled = value === true;
    if(this.#disabled === isDisabled) return;
    this.#disabled = isDisabled;
    this.toggleAttribute('disabled',this.#disabled);
    if(this.#button) this.#button.disabled = this.#disabled;
  }

  get expanded(){return this.#expanded;}
  set expanded(value){
    if(this.#disabled) return;
    const isExpanded = value === true;
    if(this.#expanded === isExpanded) return;
    this.#expanded = isExpanded;
    this.toggleAttribute('expanded',this.#expanded);
    if(this.#button){
      this.#button.ariaExpanded = this.#expanded;
    }
    if(this.#panel){
      this.#panel.ariaHidden = !this.#expanded;
      this.#panel.inert = !this.#expanded;
    }
  }

  connectedCallback(){
    const id = uuid();
    const idButton = `button-${id}`;
    const idPanel = `panel-${id}`;

    this.#disabled = this.hasAttribute('disabled');
    this.#expanded = this.hasAttribute('expanded');

    this.#button = this.querySelector(':scope > :first-child > button');
    if(!this.#button){
      throw new Error('Accordion Button (button) not found');
    }

    this.#panel = this.querySelector(':scope > div');
    if(!this.#panel){
      throw new Error('Accordion Panel (div) not found in item');
    }
    this.#panel.role = 'region';

    this.#button.id ||= idButton;
    this.#panel.id ||= idPanel;

    this.#button.setAttribute('aria-controls',this.#panel.id);
    this.#panel.setAttribute('aria-labelledby',this.#button.id);

    this.#button.disabled = this.#disabled;
    this.#button.ariaExpanded = this.#expanded;

    this.#panel.ariaHidden = !this.#expanded;
    this.#panel.inert = !this.#expanded;

    this.#button.addEventListener('click',() => {
      this.dispatchEvent(new CustomEvent('accordion-item-toggle',{
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
}
customElements.define('ui-accordion-item',UIAccordionItem);