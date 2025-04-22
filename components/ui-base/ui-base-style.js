export const UIBaseStyle = new CSSStyleSheet();
UIBaseStyle.replaceSync(`
:host{
  position:relative;
  transition:none;}

:host *{
  box-sizing:border-box;
  outline:none;}
`);