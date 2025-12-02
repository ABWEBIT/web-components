export function propertiesMapCreate(properties = {}){
  const map = {};
  for(const [name,property] of Object.entries(properties)){
    map[name] = {name:name,...property};
  }
  return map;
}