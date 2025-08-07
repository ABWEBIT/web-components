export class UIBase extends HTMLElement{
  static get observedAttributes(){
    return Object.keys(this.properties || {});
  }

  connectedCallback(){
    if(!this.hasAttribute('ui')) this.setAttribute('ui','');
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

  setAttributes(target,attributes){
    for(const [key,value] of Object.entries(attributes)){
      if(value == null) target.removeAttribute(key)
      else if(typeof value === 'boolean') target.toggleAttribute(key,value);
      else target.setAttribute(key,value);
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

  shape(shape = 'rounded'){
    if(!this.hasAttribute('shape')){
      this.setAttribute('shape',shape);
    }
  }

  size(size = 'default'){
    if(!this.hasAttribute('size')){
      this.setAttribute('size',size);
    }
  }

  theme(theme = 'default'){
    if(!this.hasAttribute('theme')){
      this.setAttribute('theme',theme);
    }
  }
}