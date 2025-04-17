export class UIBase extends HTMLElement{
  static get observedAttributes(){
    return Object.keys(this.properties || {});
  }

  setBoolean(name,value){
    value ? this.setAttribute(name,'') : this.removeAttribute(name);
  }

  setNumber(name,value){
    value != null ? this.setAttribute(name,Number(value)) : this.removeAttribute(name);
  }

  setString(name,value){
    value != null ? this.setAttribute(name,String(value)) : this.removeAttribute(name);
  }

  reflect(name,value){
    const object = this.constructor.properties?.[name];
    if(!object?.reflect) return;

    switch(object.type){
      case Boolean:
        this.setBoolean(name,value);
        break;
      case Number:
        this.setNumber(name,value);
        break;
      case String:
        this.setString(name,value);
        break;
    }
  }

  attributeChangedCallback(name,oldValue,newValue){
    if(oldValue === newValue) return;
    const object = this.constructor.properties?.[name];
    if(!(object?.type instanceof Function)) return;

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