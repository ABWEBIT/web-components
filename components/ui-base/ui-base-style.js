export const UIBaseStyle = new CSSStyleSheet();
UIBaseStyle.replaceSync(`
:host{
  position:relative;
  transition:none;}

:host *{
  box-sizing:border-box;
  outline:none;}

:host([disabled]){
  cursor:not-allowed;
  opacity:0.5;}

:host([disabled]) *{
  pointer-events:none;}

:host([animated]){
  transition-duration:0.2s;
}
`);