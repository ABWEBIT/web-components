import {UIBase} from '../ui-base/ui-base.js';
import {uuid} from '../../utils/uuid.js';

class UIField extends UIBase{
  #uuid = uuid();

  static controls = {
    'ui-checkbox': {click: null},
    'ui-input': {focus: 'input'},
    'ui-textarea': {click: null},
    'ui-select': {focus: null},
    'ui-switch': {click: 'button'},
  };

  connectedCallback(){
    super.connectedCallback();

    const label = this.querySelector('ui-label');
    const control = this.querySelector('ui-checkbox,ui-switch,ui-input,ui-textarea,ui-select');

    if(!control || !label){
      if(!label) console.warn('[ui-field] Label not found');
      if(!control) console.warn('[ui-field] Control not found');
      return;
    }

    if(!label.id) label.id = this.#uuid;
    control.setAttribute('aria-labelledby',label.id);

    label.addEventListener('click',() => {
      if (!control) return;
      const tag = control.tagName.toLowerCase();

      if(['ui-checkbox','ui-switch'].includes(tag)){
        control.click?.();
      }
      else if(['ui-input','ui-textarea','ui-select'].includes(tag)) {
        const focusTarget = control.querySelector('input, select') || control;
        focusTarget.focus?.();
      }
    });

  }
}
customElements.define('ui-field',UIField);