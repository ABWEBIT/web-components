# web-components

Имя класса всегда пишется с заглавной буквы.
```javascript
class WebComponent extends HTMLElement{}
```

Имя веб-компонента должно содержать дефис.
```javascript
customElements.define('web-component',WebComponent);
```

Сохранять ссылку на Shadow DOM в переменную не обязательно, но рекомендуется.\
Обращаться к Shadow DOM нужно будет через shadowRoot.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `<p>Привет из Shadow DOM!</p>`;
  }
}
```

Предпочтительный способ - сохранить ссылку на Shadow DOM в отдельную переменную.
```javascript
class WebComponent extends HTMLElement{
  constructor(){
    super();
    this.shadow = this.attachShadow({mode:'open'});
    this.shadow.innerHTML = `<p>Привет из Shadow DOM!</p>`;
  }
}
```

Переменную shadow можно объявить как приватную, чтобы изолировать её от внешнего кода.
```javascript
class WebComponent extends HTMLElement{
  #shadow;

  constructor(){
    super();
    this.#shadow = this.attachShadow({mode:'open'});
    this.#shadow.innerHTML = `<p>Привет из Shadow DOM!</p>`;
  }
}
```

Chrome 105+\
Edge 105+\
Safari 15.4+\
Opera 91+\
Firefox 121+