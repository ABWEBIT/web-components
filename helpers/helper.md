Имя класса всегда пишется с заглавной буквы.
```javascript
class WebComponent
```

Имя веб-компонента должно содержать дефис.
```javascript
customElements.define('web-component',WebComponent);
```

Сохранять Shadow DOM в переменную не обязательно, но рекомендуется.\
Обращаться к Shadow DOM нужно будет через shadowRoot.
```javascript
constructor(){
  super();
  this.attachShadow({mode:'open'});
  this.shadowRoot.innerHTML = `<p>Привет из Shadow DOM!</p>`;
}
```

Более предпочтительный способ.
```javascript
shadow = this.attachShadow({mode:'open'});

constructor(){
  super();
  this.shadowRoot.innerHTML = `<p>Привет из Shadow DOM!</p>`;
}
```