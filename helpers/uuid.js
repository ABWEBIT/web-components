export default function(){
  return crypto.randomUUID().replace(/-/g, '');
}