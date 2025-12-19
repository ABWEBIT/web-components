import {valueToPropertyType} from './value-to-property-type.js';

export function attributeToProperty(element,attribute,value){
  const map = element.constructor.propertiesMap;
  if(!map){
    console.warn('No attributeMap');
    return;
  }

  let property;
  for(const item of Object.values(map)){
    if(item.attribute === attribute){
      property = item;
      break;
    }
  }

  if(!property){
    console.warn(`No property for attribute "${attribute}"`);
    return;
  }

  const newValue = valueToPropertyType(value,property.type);

  if(Object.is(element[property.name],newValue)) return;
  element[property.name] = newValue;
}