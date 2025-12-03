# Constructor

The constructor() is called when an instance of the component class is created (either via new WebComponent() or when the browser parses the tag).

It is used to initialize the component's state, set up private properties, bind methods, and create a Shadow DOM.

IMPORTANT! You must call super() first in the constructor, otherwise "this" will be undefined.
```javascript
class WebComponent extends HTMLElement {
  constructor(){
    super();
  }
}
```

Components can be created without a constructor, which calls super() automatically. With a constructor, always call super() first to access "this".