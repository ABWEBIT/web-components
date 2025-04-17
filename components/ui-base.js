export class UIBase extends HTMLElement{
  static get observedAttributes(){
    return Object.keys(this.properties || {});
  }

  reflect(name,value){
    const object = this.constructor.properties?.[name];
    if(!object?.reflect) return;

    switch(object.type){
      case Boolean:
        value ? this.setAttribute(name,'')
        : this.removeAttribute(name);
        break;
      case Number:
        value != null ? this.setAttribute(name,Number(value))
        : this.removeAttribute(name);
        break;
      case String:
        value != null ? this.setAttribute(name,String(value))
        : this.removeAttribute(name);
        break;
    }
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue === newValue) return;

    const object = this.constructor.properties?.[name];
    if(!object || typeof object.type !== 'function') return;

    switch(object.type){
      case Boolean:
        this[object.name] = newValue !== null;
        break;
      case Number:
        this[object.name] = Number(newValue);
        break;
      case String:
        this[object.name] = String(newValue);
        break;
    }
  }

  updateText(selector,text){
    queueMicrotask(()=>{
      const obj = this.shadowRoot?.querySelector(selector);
      if(!obj) return;
      obj.textContent = text;
    });
  }
}