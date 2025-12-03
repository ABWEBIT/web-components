# Web Components

## Basics

The class name of a web component must start with a capital letter, like any regular JavaScript class (example: WebComponent).\
The class "WebComponent" must extend HTMLElement to become a custom element instead of a plain JavaScript class.
```javascript
class WebComponent extends HTMLElement{}
```

The tag of a web component must contain a hyphen, and it cannot be the first or the last character (example: web-component).\
Registration of a web component is done using the customElements.define() method, which links the tag to its class.
```javascript
customElements.define('web-component',WebComponent);
```

This is the simplest representation of a web component: it has a class that extends HTMLElement and a tag with a hyphen.
```javascript
class WebComponent extends HTMLElement{}
customElements.define('web-component',WebComponent);
```

## Shadow DOM

Shadow DOM is a technique that allows encapsulation of a component's DOM and CSS, isolating it from the main document. It ensures that styles and markup inside the shadow root do not affect the rest of the page, and vice versa.

You can attach a Shadow DOM to an element using attachShadow().The method accepts an object with the mode option, which can be:

open - The Shadow DOM is accessible from outside via the element.shadowRoot property (example below).
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

closed – The Shadow DOM is not accessible from outside. Attempting to access element.shadowRoot will return null.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'closed'});
    this.shadowRoot.innerHTML = `<p>Hello from Shadow DOM!</p>`;
  }
}
customElements.define('web-component',WebComponent);
```

It is preferred to store a reference to the Shadow DOM in a variable to improve readability and avoid repeated lookups.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.shadow = this.attachShadow({mode:'closed'});
    this.shadow.innerHTML = `<p>Hello from Shadow DOM!</p>`;
  }
}
customElements.define('web-component',WebComponent);
```