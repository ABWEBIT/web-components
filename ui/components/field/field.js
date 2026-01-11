import {uuid} from '../../utilities/index.js';

class UIField extends HTMLElement{
  #requiredIndicator = '*';

  static elements = [
    'ui-checkbox',
    'ui-input',
    'ui-select',
    'ui-switch',
    'ui-textarea',
  ];

  connectedCallback(){
    const id = uuid();
    const idLabel = `label-${id}`;
    const idControl = `control-${id}`;

    if(this.hasAttribute('required')) this.#addRequired();

    const label = this.querySelector('label');

    const controls = UIField.elements.filter(tag => tag);
    const control = this.querySelector(controls.join(','));

    if(!control || !label){
      if(!label) console.warn('[ui-field] Label not found');
      if(!control) console.warn('[ui-field] Control not found');
      this.textContent = 'Missing required child elements';
      return;
    }

    if(!label.id) label.id = idLabel;
    control.setAttribute('aria-labelledby',idLabel);

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

    if(label.hasAttribute('required')){
      const indicator = document.createElement('span');
      indicator.textContent = this.getAttribute('indicator') ?? this.#requiredIndicator;
      this.append(indicator);
    }
  }

  #addRequired(){
    UIField.elements.forEach(tag => {
      this.querySelectorAll(tag).forEach(element => element.setAttribute('required',''));
    });
  }

}
customElements.define('ui-field',UIField);