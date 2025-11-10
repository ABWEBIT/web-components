export class LRUCache{
  constructor(limit = 50){
    if(!Number.isInteger(limit) || limit < 0){
      throw new Error('Limit must be a non-negative integer');
    }
    this.limit = limit;
    this.map = new Map();
  }

  get(key){
    if (!this.map.has(key)) return undefined;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key,value);
    return value;
  }

  set(key,value){
    if(this.map.has(key)){
      this.map.delete(key);
    }
    else if(this.map.size >= this.limit && this.limit > 0){
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }

    this.map.set(key, value);
    return this;
  }

  has(key){
    return this.map.has(key);
  }

  delete(key){
    return this.map.delete(key);
  }

  clear(){
    this.map.clear();
  }

  size(){
    return this.map.size;
  }

  keys(){
    return this.map.keys();
  }

  values(){
    return this.map.values();
  }

  entries(){
    return this.map.entries();
  }

  [Symbol.iterator](){
    return this.map.entries();
  }
}