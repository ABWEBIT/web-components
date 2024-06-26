class MyElement extends HTMLElement {
  constructor() {
    super();
  }
  
  render(){
    
  }
  
  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    // массив атрибутов в которых будут отслеживаться изменения
    return ['атрибут1', 'атрибут2', 'атрибут3'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
    this.render();
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}

// имя элемента должно содержать знак дефиса -, пример <my-element></my-element>
customElements.define('my-element', MyElement);
