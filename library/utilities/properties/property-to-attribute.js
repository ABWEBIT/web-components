import {valueToPropertyType} from './value-to-property-type.js';

export function propertyToAttribute(element,attribute,value){
  const map = element.constructor.attributeMap;
  if(!map){
    console.warn('No attributeMap');
    return;
  }
  const property = map[attribute];
  if(!property){
    console.warn(`No property for attribute "${attribute}"`);
    return;
  }

  if(!property?.reflect) return;

  const remove = () => element.removeAttribute(property.attribute);
  const set = (data) => element.setAttribute(property.attribute,data);

  const newValue = valueToPropertyType(value,property.type);

  switch(property.type){
    case Boolean:
      newValue === true ? set('') : remove();
      break;
    case Number:
      Number.isFinite(newValue) ? set(newValue) : remove();
      break;
    case String:
      typeof newValue === 'string' ? set(newValue) : remove();
      break;
  }

  console.log('reflect');
}