import * as icons from '../helpers/icons.js';
import {textNormalize,variableName,htmlEscape} from '../helpers/utils.js';

class IconBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #name = '';

  static get observedAttributes(){return ['name'];}

  get _name(){return this.#name;}
  set _name(value){
    value = textNormalize(value);
    if(value && variableName(value) && icons[value]){
      this.#name = htmlEscape(value);
      queueMicrotask(()=>{
        let svg = this.#shadow.querySelector('svg');
        if(svg) svg.innerHTML = icons[this.#name];
      });
    }
  }

  connectedCallback(){
    this.#shadow.innerHTML = `
    <style>
    :host *{box-sizing:border-box;outline:none;}
    :host{
      position:relative;
      display:inline-flex;
      width:fit-content;
      justify-content:center;
      align-items:center;
      vertical-align:middle;
      transition:color 0.2s;
      -webkit-user-select:none;
      user-select:none;}

    :host > svg{
      width:20px;
      height:20px;
      fill:currentColor;
      shape-rendering:geometricPrecision;
      pointer-events:none;}
    </style>
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>`;
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'name':this._name = newValue; break;
      }
    }
  }

}
customElements.define('icon-block',IconBlock);