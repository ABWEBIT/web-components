import {LitElement} from '../../lit-core.min.js';

export class UIBadge extends LitElement{
  createRenderRoot(){return this;}
}
customElements.define('ui-badge',UIBadge);