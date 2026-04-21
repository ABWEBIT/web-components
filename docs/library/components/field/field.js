import {LitElement} from '../../lit-core.min.js';
import {uuid} from '../../utilities/index.js';

export class UIField extends LitElement{
  static elements = [
    'ui-checkbox',
    'ui-switch',
    'ui-radio',
    'ui-input',
    'ui-select',
    'ui-textarea',
  ];

  connectedCallback(){
    const id = uuid();
    const idLabel = `label-${id}`;
    const idControl = `control-${id}`;

    const label = this.querySelector('label');

    const controls = UIField.elements.filter(tag => tag);
    const control = this.querySelector(controls.join(','));

    if(!control || !label){
      if(!label) console.warn('[ui-field] Label not found');
      if(!control) console.warn('[ui-field] Control not found');
      this.textContent = 'Missing required child elements';
      return;
    }

    if(!this.hasAttribute('passive')){
      if(!label.hasAttribute('for')) label.setAttribute('for',idControl);
    }

    if(!control.hasAttribute('id')){
      control.setAttribute('config',`{"id":"${idControl}"}`);
    }
  }
}
customElements.define('ui-field',UIField);