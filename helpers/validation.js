class Validator{
  static iconName(value){
    return /^[A-Za-z][A-Za-z0-9]*$/.test(value);
  }

  static buttonText(value){
    return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
  }

  static text(value){
    return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
  }
}

export default Validator;