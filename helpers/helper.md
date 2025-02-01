В конструкторе записывать Shadow DOM в переменную не обязательно.
```javascript
const shadowRoot = this.attachShadow({mode:'open'});
```

Имя класс всегда пишется с заглавной буквы
```javascript
class WebComponent
```
Имя веб-компонента в методе customElements.define должно содержать дефис.
```javascript
customElements.define('web-component',WebComponent);
```


