import {LRUCache} from '../../utils/index.js';

class UIIcon extends HTMLElement{
  #name = 'undefined';

  static #iconCache = new LRUCache(100);

  static properties = {
    name:{attribute:'name',type:String,reflect:true}
  };

  static get observedAttributes(){
    return ['name'];
  }

  attributeChangedCallback(attribute,oldValue,newValue){
    if(oldValue === newValue) return;
    if(attribute === 'name'){
      this.name = newValue;
    }
  }

  get name(){return this.#name;}
  set name(value){
    const newValue = String(value);
    if(this.#name === newValue) return;
    this.#name = newValue;
    this.setAttribute('name',this.#name);
    this.#render();
  }

  connectedCallback(){
    this.ariaHidden = 'true';
  }

  async #render(){
    if(!this.#name) return;
    this.replaceChildren();

    try{
      let svg = UIIcon.#iconCache.get(this.#name);

      if(!svg){
        const module = await import(`../../icons/${this.#name}.js`);
        svg = module.default;

        if(typeof svg !== 'string'){
          console.warn(`Icon "${this.#name}" is not a valid SVG string.`);
          return;
        }
        UIIcon.#iconCache.set(this.#name,svg);
      }
      this.innerHTML = svg;
    }
    catch(e){
      console.warn(`Icon "${this.#name}" does not exist.`, e?.message || e);
    }
  }
}
customElements.define('ui-icon',UIIcon);