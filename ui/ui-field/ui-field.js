import {UIBase} from '../ui-base.js';
import {uuid} from '../../utils/index.js';

class UIField extends UIBase{
  #uuid = uuid();

  static elements = [
    'ui-label',
    'ui-checkbox',
    'ui-input',
    'ui-select',
    'ui-switch',
    'ui-textarea',
  ];

  connectedCallback(){
    super.connectedCallback();

    if(this.hasAttribute('required')) this.#addRequired();

    const label = this.querySelector('ui-label');

    const labelPosition = this.getAttribute('label-position');
    if(!['start','end'].includes(labelPosition)){
      this.setAttribute('label-position','start');
    };

    if(labelPosition === 'start') this.prepend(label);
    else if(labelPosition === 'end') this.append(label);

    const controls = UIField.elements.filter(tag => tag !== 'ui-label');
    const control = this.querySelector(controls.join(','));

    if(!control || !label){
      if(!label) console.warn('[ui-field] Label not found');
      if(!control) console.warn('[ui-field] Control not found');
      this.textContent = 'Missing required child elements';
      return;
    }

    if(!label.id) label.id = this.#uuid;
    control.setAttribute('aria-labelledby',label.id);

    if(!label.hasAttribute('passive')){
      label.addEventListener('click',() => {
        const tag = control.tagName.toLowerCase();

        if(['ui-checkbox','ui-switch','ui-select'].includes(tag)){
          control.click?.();
        }
        else if(['ui-input','ui-textarea'].includes(tag)){
          control.focus?.();
        }
      });
    }
  }

  #addRequired(){
    UIField.elements.forEach(tag => {
      this.querySelectorAll(tag).forEach(element => element.setAttribute('required',''));
    });
  }

}
customElements.define('ui-field',UIField);