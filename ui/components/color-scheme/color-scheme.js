import {LitElement,html} from '../../lit-core.min.js';

export class UIColorScheme extends LitElement{
  static properties = {
    scheme:{type:String}
  };

  constructor(){
    super();
    const storedScheme = localStorage.getItem('data-color-scheme') || 'dark';
    this.scheme = storedScheme;
  }

  createRenderRoot(){return this;}

  get #iconName(){
    switch(this.scheme){
      case 'dark': return 'light-mode';
      case 'light': return 'dark-mode';
    }
  }

  #onClick(){
    this.scheme = this.scheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('data-color-scheme',this.scheme);
    document.documentElement.setAttribute('data-color-scheme',this.scheme);
  }

  render(){
    return html`
    <button @click=${this.#onClick}>
      <ui-icon name="${this.#iconName}"></ui-icon>
    </button>`;
  }
}
customElements.define('ui-color-scheme',UIColorScheme);