# Basics

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