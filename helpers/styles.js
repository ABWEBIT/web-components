export const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(`
:host{
  transition:none;}

:host *{
  box-sizing:border-box;
  outline:none;}
`);