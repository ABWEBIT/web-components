export const uuid = () => crypto.randomUUID();

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

export const elementSize = (value) => {
/* ['xs', 'sm', 'md', 'lg', 'xl'] */
  const sizes = ['small','medium','large'];
  return sizes.includes(value);
}

/* html escape */
const htmlEscapeMap = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;',
};

const htmlEscapeRegex = /^[^"'&<>]+$/;

export function htmlEscape(string){
  const str = string == null ? '' : String(string);

  if(htmlEscapeRegex.test(str)) return str;

  const parts = [];
  let lastIndex = 0;

  for(let i = 0; i < str.length; i++){
    const charCode = str.charCodeAt(i);
    const escape = htmlEscapeMap[charCode];

    if(escape){
      parts.push(str.slice(lastIndex,i),escape);
      lastIndex = i + 1;
    }
  }
  if(lastIndex === 0) return str;
  return parts.join('') + str.slice(lastIndex);
}

/* html unescape */
const htmlUnescapeMap = {
  '&quot;':'"',
  '&#34;':'"',
  '&amp;':'&',
  '&#39;':"'",
  '&#x27;':"'",
  '&lt;':'<',
  '&gt;':'>',
};

const htmlUnescapeRegex = /&(?:quot|#34|amp|#39|#x27|lt|gt);/g;

export function htmlUnescape(string) {
  const str = string == null ? '' : String(string);

  if(!str || !str.includes('&')) return str;
  return str.replace(htmlUnescapeRegex, match => htmlUnescapeMap[match] || match);
}