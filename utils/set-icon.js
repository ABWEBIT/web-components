export function setIcon(root,selector,icon){
  if(!root) return;
  queueMicrotask(()=>{
    const obj = root.querySelector(selector);
    if(!obj) return;
    obj.setAttribute('icon',icon);
  });
}