export function kebabToCamel(string){
  const length = string.length;
  const result = new Array(length);
  let index = 0;
  let capitalize = false;

  for(let i = 0;i < length;i++){
    const code = string.charCodeAt(i);
    if(code === 45){
      capitalize = true;
      continue;
    }
    else if(capitalize && code >= 97 && code <= 122){
      result[index++] = String.fromCharCode(code - 32);
      capitalize = false;
    }
    else{
      result[index++] = string[i];
      capitalize = false;
    }
  }
  result.length = index;
  return result.join('');
}