# web-components

Имя класса всегда пишется с заглавной буквы.
```javascript
class WebComponent{}
```

Имя веб-компонента должно содержать дефис.
```javascript
customElements.define('web-component',WebComponent);
```

Сохранять ссылку на Shadow DOM в переменную не обязательно, но рекомендуется.\
Обращаться к Shadow DOM нужно будет через shadowRoot.
```javascript
class WebComponent{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `<p>Привет из Shadow DOM!</p>`;
  }
}
```

Предпочтительный способ - сохранить ссылку на Shadow DOM в отдельную переменную.
```javascript
class WebComponent{
  shadow = this.attachShadow({mode:'open'});

  constructor(){
    super();
    this.shadowRoot.innerHTML = `<p>Привет из Shadow DOM!</p>`;
  }
}
```

Chrome 105+\
Edge 105+\
Safari 15.4+\
Opera 91+\
Firefox 121+