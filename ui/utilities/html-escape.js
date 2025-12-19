const htmlEscapeMap = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;',
};

const htmlEscapeRegex = /^[^"'&<>]+$/;

export const htmlEscape = (string) => {
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
};