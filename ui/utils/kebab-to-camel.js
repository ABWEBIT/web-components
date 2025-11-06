export function kebabToCamel(string){
  let result = '';
  let capitalize = false;
  let i = 0;
  const len = string.length;

  while(i < len){
    const char = string.charCodeAt(i++);
    if(char === 45) capitalize = true
    else{
      result += capitalize ? String.fromCharCode(char - 32) : String.fromCharCode(char);
      capitalize = false;
    }
  }
  return result;
}