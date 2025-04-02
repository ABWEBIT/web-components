import {textNormalize,variableName,inputTypes,htmlEscape,uuid} from '../helpers/utils.js';

const inputBlockCSS = new CSSStyleSheet();
inputBlockCSS.replaceSync(`
:host *{box-sizing:border-box;outline:none;}
:host{
  position:relative;
  display:inline-flex;
  flex-direction:column;
  width:fit-content;
  row-gap:10px;}

:host > .block{
  position:relative;
  display:inline-flex;
  vertical-align:middle;
  width:fit-content;
  height:40px;
  border:none;
  border-radius:var(--border-radius);
  overflow:hidden;
  color:rgb(175,175,175);
  background-color:rgb(25,25,25);
  transition:background-color 0.2s,color 0.2s;}

:host > .label,
:host > .hint{
  line-height:100%;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;}

:host > .label{
  font-size:90%;
  color:rgb(255,255,255);}

:host > .hint{
  font-size:80%;
  color:rgb(150,150,150);}

:host > .block > input{
  height:100%;
  flex-grow:1;
  width:100%;
  min-width:70px;
  padding-left:15px;
  padding-right:15px;
  border:none;
  color:rgb(255,255,255);
  font-size:90%;
  background-color:transparent;
  transition:color 0.2s;}

:host > .block > input::-ms-reveal{display:none;}

:host > .block > icon-block{
  height:100%;
  width:40px;
  min-width:40px;}

:host > .block > icon-block[icon="Clear"]{
  cursor:pointer;}

@media (hover:hover){
  :host > .block:has(> input:focus){background-color:rgb(35,35,35);}
  :host > .block > icon-block:hover{color:rgb(225,225,225);}
}

:host > .block:has(> icon-block[position="before"]) input{padding-left:0;}
:host > .block:has(> icon-block[position="after"]) input{padding-right:0;}
`);

class InputBlock extends HTMLElement{
  #shadow = this.attachShadow({mode:'open'});
  #label = '';
  #hint = '';
  #iconBefore = '';
  #iconAfter = '';
  #inputHandler = this.operation.bind(this);

  static get observedAttributes(){return ['label','hint','icon-before','icon-after'];}

  get _label(){return this.#label;}
  set _label(value){
    value = textNormalize(value);
    if(value){
      this.#label = value;
      this.#updateText('label',this.#label);
    }
  }

  get _hint(){return this.#hint;}
  set _hint(value){
    value = textNormalize(value);
    if(value){
      this.#hint = value;
      this.#updateText('hint',this.#hint);
    }
  }

  #updateText(type,text){
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`.${type}`);
      if(block){
        let asterisk = '';
        if(this.hasAttribute('required') && type === 'label') asterisk = ' *';
        block.textContent = text+asterisk;
      }
    });
  }

  get _iconBefore(){return this.#iconBefore;}
  set _iconBefore(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconBefore = value;
      this.#updateIcon('before',this.#iconBefore);
    }
  }

  get _iconAfter(){return this.#iconAfter;}
  set _iconAfter(value){
    value = textNormalize(value);
    if(value && variableName(value)){
      this.#iconAfter = value;
      this.#updateIcon('after',this.#iconAfter);
    }
  }

  #updateIcon(position,iconName){
    iconName = htmlEscape(iconName);
    queueMicrotask(()=>{
      let block = this.#shadow.querySelector(`icon-block[position="${position}"]`);
      if(block) block.setAttribute('icon',iconName);
    });
  }

  connectedCallback(){
    this.#shadow.adoptedStyleSheets = [inputBlockCSS];
    this.#shadow.innerHTML = `
    ${this.#label && `<span class="label"></span>`}
    <div class="block">
    ${this.#iconBefore && `<icon-block position="before" icon=""></icon-block>`}
    <input type="">
    <icon-block icon="Clear"></icon-block>
    ${this.#iconAfter && `<icon-block position="after" icon=""></icon-block>`}
    </div>
    ${this.#hint && `<span class="hint"></span>`}`;

    const inputObject = this.#shadow.querySelector('input');
    if(inputObject){
      inputObject.addEventListener('input',this.#inputHandler);

      let inputType = textNormalize(this.getAttribute('type'));
      inputType = inputTypes(inputType) ? inputType : 'text';
      inputObject.type = htmlEscape(inputType);
      
      let inputPlaceholder = htmlEscape(textNormalize(this.getAttribute('placeholder')));
      if(inputPlaceholder) inputObject.setAttribute('placeholder',inputPlaceholder);
      if(this.hasAttribute('required')) inputObject.required = true;
    }
  }

  disconnectedCallback(){
    let inputObject = this.#shadow.querySelector('input');
    if(inputObject) inputObject.removeEventListener('input',this.#inputHandler);
  }

  operation(){
    let hintBlock = this.#shadow.querySelector('.hint');
    if(hintBlock){
      let inputLength = this.#shadow.querySelector('input').value.length;
      if(inputLength < 1) hintBlock.textContent = this.#hint;
      else hintBlock.textContent = inputLength;
    }
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(newValue && oldValue !== newValue){
      switch(name){
        case 'label':this._label = newValue; break;
        case 'hint':this._hint = newValue; break;
        case 'icon-before':this._iconBefore = newValue; break;
        case 'icon-after':this._iconAfter = newValue; break;
      }
    }
  }

}
customElements.define('input-block',InputBlock);