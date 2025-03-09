Имя класса всегда пишется с заглавной буквы.
```javascript
class WebComponent
```

Имя веб-компонента должно содержать дефис.
```javascript
customElements.define('web-component',WebComponent);
```

В конструкторе записывать Shadow DOM в переменную не обязательно.\
Обращаться к Shadow DOM нужно будет через shadowRoot.
```javascript
constructor(){
  super();
  this.attachShadow({mode:'open'});
  this.shadowRoot.innerHTML = `<p>Привет из Shadow DOM!</p>`;
}
```