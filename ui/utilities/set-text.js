export function setText(root,selector,text){
  if(!root) return;
  queueMicrotask(()=>{
    const obj = root.querySelector(selector);
    if(!obj) return;
    obj.textContent = text;
  });
}