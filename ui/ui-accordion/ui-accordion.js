import {UIBase} from '../ui-base.js';

class UIAccordion extends UIBase{
  #disabled = false;
  #items = [];

  #onClick = this.onClick.bind(this);
  #onKeyDown = this.onKeyDown.bind(this);

  static properties = Object.freeze({
    'disabled':{name:'disabled',type:Boolean,reflect:true}
  });

  get items(){return this.#items;}
  set items(value){
    if(!Array.isArray(value)) throw new Error('Items must be an array');
    this.#items = value;
    this.render();
  }

  connectedCallback(){
    super.connectedCallback();
    this.size();
    this.color();

    this.addEventListener('click',this.#onClick);
    this.addEventListener('keydown',this.#onKeyDown);
  }

  disconnectedCallback(){
    this.removeEventListener('click',this.#onClick);
    this.removeEventListener('keydown',this.#onKeyDown);
  }

  render(){
    this.replaceChildren();

    this.#items.forEach((item,index) => {
      const accordionItem = document.createElement('div');
      const accordionTitle = document.createElement('div');
      const accordionContent = document.createElement('div');

      accordionItem.setAttribute('data-ui','accordion-item');
      this.setAttributes(accordionTitle,{
        'tabindex': '0',
        'data-ui': 'accordion-title'
      });

      accordionContent.setAttribute('data-ui','accordion-content');

      accordionTitle.textContent = item.title ?? '';
      accordionContent.textContent = item.content ?? '';
      
      accordionItem.dataset.index = index;

      accordionItem.append(accordionTitle,accordionContent);
      this.appendChild(accordionItem);
    });
  }


  onClick(e){
    if(this.disabled) return;
    if(typeof this.onAction === 'function') this.onAction(e);
  }

  onKeyDown(e){
    if(e.code !== 'Tab') e.preventDefault();
    if(this.#disabled) return;
    if(e.repeat) return;
    if(e.code === 'Enter' || e.code === 'Space'){
      if(typeof this.onAction === 'function') this.onAction(e);
    }
  }

  onAction(e){
    //console.log(e.type);
  }

}
customElements.define('ui-accordion',UIAccordion);