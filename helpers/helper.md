Имя класса всегда пишется с заглавной буквы.
```javascript
class WebComponent
```

Имя веб-компонента должно содержать дефис.
```javascript
customElements.define('web-component',WebComponent);
```

В конструкторе записывать Shadow DOM в переменную не обязательно.
```javascript
this.attachShadow({mode:'open'});
```