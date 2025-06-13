export class UIBase extends HTMLElement{
  #shapeDefault = 'rounded';
  #shapeOptions = ['rounded','pill','circle','square'];
  #sizeDefault  = 'medium';
  #sizeOptions  = ['small','medium','large'];

  static get observedAttributes(){
    return Object.keys(this.properties || {});
  }

  connectedCallback(){
    this.setAttributes(this,{
      'ui':true,
      'animated':true
    });
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue === newValue) return;
    const object = this.constructor.properties?.[name];
    if(!object) return;

    switch(object.type){
      case Boolean:
        this[object.name] = this.hasAttribute(name);
        break;
      case Number:
        this[object.name] = Number(newValue);
        break;
      case String:
        this[object.name] = newValue || '';
        break;
    }
  }

  reflect(name,value){
    const object = this.constructor.properties?.[name];
    if(!object?.reflect) return;

    const remove = () => this.removeAttribute(name);
    const set = data => this.setAttribute(name,data);

    switch(object.type){
      case Boolean:
        value ? set('') : remove();
        break;
      case Number:
        Number.isFinite(value) ? set(value) : remove();
        break;
      case String:
        typeof value === 'string' ? set(value) : remove();
        break;
    }
  }

  setAttributes(element,attributes){
    for(const [key,value] of Object.entries(attributes)){
      if(value == null) element.removeAttribute(key)
      else if(typeof value === 'boolean') element.toggleAttribute(key,value);
      else element.setAttribute(key,value);
    }
  }

  updateText(selector,text){
    queueMicrotask(()=>{
      const obj = this.querySelector(selector);
      if(!obj) return;
      obj.textContent = text;
    });
  }

  updateIcon(selector,icon){
    queueMicrotask(()=>{
      let obj = this.querySelector(selector);
      if(!obj) return;
      obj.setAttribute('icon',icon);
    });
  }

  shape(){
    const shape = this.getAttribute('shape');
    if(!shape || !this.#shapeOptions.includes(shape)){
      this.setAttribute('shape',this.#shapeDefault);
    }
  }

  size(){
    const size = this.getAttribute('size');
    if(!size || !this.#sizeOptions.includes(size)){
      this.setAttribute('size',this.#sizeDefault);
    }
  }

  height(number = 32){
    const attribute = parseInt(this.getAttribute('height'),10);
    const height = !isNaN(attribute) ? attribute : number;
    this.style.setProperty('--ui-object-height',`${height}px`);
    return height;
  }
}