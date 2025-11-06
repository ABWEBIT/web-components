import {UIBase} from '../../base.js';
import {camelCase} from '../../utils/camel-case.js';

class UIIcon extends UIBase{
  #icon = '';

  static properties = Object.freeze({
    'icon':{name:'icon',type:String,reflect:true}
  });

  get icon(){return this.#icon;}
  set icon(value){
    const newValue = String(value || '');
    if(this.#icon === newValue) return;
    this.#icon = newValue;
    queueMicrotask(() => this.#render());
  }

  connectedCallback(){
    super.connectedCallback();
    this.ariaHidden = 'true';
  }

  async #render(){
    const name = this.#icon;
    if(!name) return;

    this.replaceChildren();

    try{
      const module = await import(`../../icons/${name}.js`);
      const svg = module[name];

      if(typeof svg !== 'string'){
        console.warn(`Icon "${name}" is not a valid SVG string.`);
        return;
      }

      this.innerHTML = svg;
      this.reflect('icon',this.#icon);
    }
    catch(e){
      console.warn(`Icon "${name}" does not exist.`, e.message || e);
    }
  }

}
customElements.define('ui-icon',UIIcon);