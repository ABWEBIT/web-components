function changeIconName(){
  const attribute = 'name';
  const values = ['home','article', 'settings'];
  const elementId = 'example-icon';

  const icon = document.getElementById(elementId);
  if (!icon) return;

  const current = icon.getAttribute(attribute);
  const next = values[(values.indexOf(current) + 1) % values.length];

  icon.setAttribute(attribute, next);
}

function buttonBusy(button){
  console.log(button);
  button.busy = true;
}