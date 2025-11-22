import {UIBase} from '../../base.js';
import {LRUCache} from '../../utils/lru-cache.js';

class UIIcon extends UIBase{
  #icon = '';

  static #ICON_CACHE = new LRUCache(100);

  static properties = Object.freeze({
    'icon':{name:'icon',type:String,reflect:true}
  });

  get icon(){return this.#icon;}
  set icon(value){
    const newValue = String(value || '');
    if(this.#icon === newValue) return;
    this.#icon = newValue;
    queueMicrotask(() => this.#render());
    this.reflect('icon',this.#icon);
  }

  connectedCallback(){
    this.ariaHidden = 'true';
  }

  async #render(){
    const name = this.#icon;
    if(!name) return;

    this.replaceChildren();

    try{
      let svg = UIIcon.#ICON_CACHE.get(name);

      if(!svg){
        const module = await import(`../../icons/${name}.js`);
        svg = module.default;

        if(typeof svg !== 'string'){
          console.warn(`Icon "${name}" is not a valid SVG string.`);
          return;
        }
        UIIcon.#ICON_CACHE.set(name,svg);
      }
      this.innerHTML = svg;
    }
    catch(e){
      console.warn(`Icon "${name}" does not exist.`, e.message || e);
    }
  }
}
customElements.define('ui-icon',UIIcon);