export const textNormalize = (value) => {
  return String(value || '').trim();
}

export const variableName = (value) => {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(value);
}

export const text = (value) => {
  return /^(?![ _+#.-])[\p{L}\p{N} _+#.-]+(?<![ _.])$/u.test(value);
}

export const inputTypes = (value) => {
  const types = ['text','password','email','url','search','tel','number','range','date','datetime-local','month','week','time','file','checkbox','radio','hidden','button','submit','reset','color','image'];
  return types.includes(value);
}

export const htmlEscape = (value)=>{
  if(!value) return value;
  return value.replace(/[&<>"']/g,(m) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[m];
  });
}

export const uuid = ()=>{
  return crypto.randomUUID().replace(/-/g, '');
}