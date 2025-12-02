export function observedAttributes(properties){
  const attributes = [];
  for(const item of Object.values(properties)){
    if(item.attribute) attributes.push(item.attribute);
  }
  return attributes;
}