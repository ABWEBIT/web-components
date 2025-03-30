export const iconName=(value)=>{
  return /^[A-Za-z][A-Za-z0-9]*$/.test(value);
}

export const textButton=(value)=>{
  return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
}

export const text=(value)=>{
  return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
}

export const inputType1=(value)=>{
  /* types
  ['text', 'password', 'email', 'url', 'search', 'tel', 'number', 'range', 'date', 'datetime-local', 'month', 'week', 'time', 'file', 'checkbox', 'radio', 'hidden', 'button', 'submit', 'reset', 'color', 'image']
  */
  const types = ['text','password','email','url','search','tel'];
  return types.includes(value);
}

export const escapeHTML=(value)=>{
  if(!value) return value;
  return value.replace(/[&<>"']/g,(m)=>({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[m]));
}

export const uuid=()=>{
  return crypto.randomUUID().replace(/-/g, '');
}