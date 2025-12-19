export function valueToPropertyType(value,type){
  switch(type){
    case Boolean:
      return value !== null;
    case Number: 
      const n = Number(value);
      return Number.isFinite(n) ? n : undefined;
    case String:
      return String(value || '');
    default:
      throw new Error(`Unsupported property type: ${type}`);
  }
}