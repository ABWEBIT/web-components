# Shadow DOM

Shadow DOM is a technique that allows encapsulation of a component's DOM and CSS, isolating it from the main document. It ensures that styles and markup inside the shadow root do not affect the rest of the page, and vice versa.

You can attach a Shadow DOM to an element using attachShadow(). The method accepts an object with the "mode" option, which can be:

open - The Shadow DOM is accessible from outside via the element.shadowRoot property.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
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
  }
}
customElements.define('web-component',WebComponent);
```

```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'closed'});
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

```
Despite its advantages, Shadow DOM has some important drawbacks:

- Styling and customization limitations - encapsulation restricts the use of global CSS and themes.
- Performance concerns - creating and managing many Shadow DOMs can increase memory and CPU usage.
```

Use Shadow DOM only where it is needed.