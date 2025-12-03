# Web Components

## Basics

The class name of a web component must start with a capital letter, like any regular JavaScript class. (example: WebComponent)\
The class "WebComponent" must extend HTMLElement.
```javascript
class WebComponent extends HTMLElement{}
```

The tag of a web component must contain a hyphen, and it cannot be the first or the last character. (example: web-component)\
Registration of a web component is done using the customElements.define() method, which links the tag to its class.
```javascript
customElements.define('web-component',WebComponent);
```

This is the simplest representation of a web component: it has a class that extends HTMLElement, and a tag with a hyphen.
```javascript
class WebComponent extends HTMLElement{}
customElements.define('web-component',WebComponent);
```

## Shadow DOM

Shadow DOM is a technique that allows encapsulation of a component's DOM and CSS, isolating it from the main document. It ensures that styles and markup inside the shadow root do not affect the rest of the page, and vice versa.\

You can access the Shadow DOM through shadowRoot.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `<p>Hello from Shadow DOM!</p>`;
  }
}
customElements.define('web-component',WebComponent);
```

The preferred way is to save a reference to the Shadow DOM in a separate variable.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.shadow = this.attachShadow({mode:'open'});
    this.shadow.innerHTML = `<p>Hello from Shadow DOM!</p>`;
  }
}
customElements.define('web-component',WebComponent);
```

The shadow variable can be declared as private to isolate it from external code.
```javascript
class WebComponent extends HTMLElement{
  #shadow;

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.innerHTML = `<p>Hello from Shadow DOM!</p>`;
  }
}
customElements.define('web-component',WebComponent);
```