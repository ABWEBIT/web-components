import {LitElement,html} from '../../lit-core.min.js';

export class UIColorMode extends LitElement{
  static properties = {
    mode:{type:String}
  };

  constructor(){
    super();
    this.mode = localStorage.getItem('data-color-mode') || 'dark';
  }

  createRenderRoot(){return this;}

  get #iconName(){
    switch(this.mode){
      case 'dark': return 'light-mode';
      case 'light': return 'dark-mode';
    }
  }

  #onClick(){
    this.mode = this.mode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('data-color-mode',this.mode);
    document.documentElement.setAttribute('data-color-mode',this.mode);
  }

  render(){
    return html`
    <button @click=${this.#onClick}>
      <ui-icon name="${this.#iconName}"></ui-icon>
    </button>`;
  }
}
customElements.define('ui-color-mode',UIColorMode);