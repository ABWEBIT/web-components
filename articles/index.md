# Web Components

## Basics

The class name of a web component must start with a capital letter, like any regular JavaScript class (example: WebComponent).\
The class "WebComponent" must extend HTMLElement to become a custom element instead of a plain JavaScript class.
```javascript
class WebComponent extends HTMLElement{}
```

The tag of a web component must contain at least one hyphen, which cannot be the first or last character (example: web-component).\
Registration of a web component is done using the customElements.define() method, which links the tag to its class.
```javascript
customElements.define('web-component',WebComponent);
```

This is the simplest representation of a web component: it has a class that extends HTMLElement and a tag with a hyphen.
```javascript
class WebComponent extends HTMLElement{}
customElements.define('web-component',WebComponent);
```

## Constructor

The constructor() is called when an instance of the component class is created (either via new WebComponent() or when the browser parses the tag).

It is used to initialize the component's state, set up private properties, bind methods, and create a Shadow DOM.

IMPORTANT! You must call super() first in the constructor, otherwise "this" will be undefined.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
  }
}
customElements.define('web-component',WebComponent);
```

Components can be created without a constructor, which calls super() automatically. With a constructor, always call super() first to access "this".


## Shadow DOM

Shadow DOM is a technique that allows encapsulation of a component's DOM and CSS, isolating it from the main document. It ensures that styles and markup inside the shadow root do not affect the rest of the page, and vice versa.

You can attach a Shadow DOM to an element using attachShadow(). The method accepts an object with the "mode" option, which can be:

open - The Shadow DOM can be accessed via this.shadowRoot.
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

closed - The Shadow DOM cannot be accessed via this.shadowRoot. To work with it, store the reference returned by attachShadow() in a variable.
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

Storing a reference to the Shadow DOM in a variable is preferred in both open and closed modes, as it improves readability and avoids repeated lookups.

Despite its advantages, Shadow DOM has some important drawbacks:

- Styling and customization limitations - encapsulation restricts the use of global CSS and themes.
- Performance concerns - creating and managing many Shadow DOMs can increase memory and CPU usage.

Use Shadow DOM only where it is needed.