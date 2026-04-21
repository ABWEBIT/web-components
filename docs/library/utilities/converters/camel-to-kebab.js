export function camelToKebab(string){
  const length = string.length;
  const result = new Array(length * 2);
  let index = 0;
  
  for(let i = 0;i < length;i++){
    const code = string.charCodeAt(i);
    if(code >= 65 && code <= 90){
      result[index++] = '-';
      result[index++] = String.fromCharCode(code + 32);
    }
    else result[index++] = string[i];
  }
  result.length = index;
  return result.join('');
}