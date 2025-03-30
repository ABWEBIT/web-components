class Validator{
  static iconName(value){
    return /^[A-Za-z][A-Za-z0-9]*$/.test(value);
  }

  static textButton(value){
    return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
  }

  static text(value){
    return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
  }

  static inputType(value){
    /* types
    ['text', 'password', 'email', 'url', 'search', 'tel', 'number', 'range', 'date', 'datetime-local', 'month', 'week', 'time', 'file', 'checkbox', 'radio', 'hidden', 'button', 'submit', 'reset', 'color', 'image']
    */
    const types = ['text','password','email','url','search','tel'];
    return types.includes(value);
  }
}

export default Validator;