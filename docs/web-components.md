# web-components

Имя класса всегда пишется с заглавной буквы. (пример: WebComponent)\
Класс (WebComponent) должен расширять HTMLElement.
```javascript
class WebComponent extends HTMLElement{}
```

Тег веб-компонента должен содержать дефис. (пример: web-component)\
Регистрация веб-компонента осуществляется с помощью метода customElements.define(), который связывает тег с его классом.
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
customElements.define('web-component',WebComponent);
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
customElements.define('web-component',WebComponent);
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
customElements.define('web-component',WebComponent);
```