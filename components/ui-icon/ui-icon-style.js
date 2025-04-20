export const UIIconStyle = new CSSStyleSheet();
UIIconStyle.replaceSync(`
:host{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
  width:fit-content;
  -webkit-user-select:none;
  user-select:none;}

:host([transition]){
  transition:color 0.2s;}

svg{
  width:clamp(16px,100%,24px);
  height:clamp(16px,100%,24px);
  aspect-ratio:1 / 1;
  fill:currentColor;
  shape-rendering:geometricPrecision;
  pointer-events:none;}
`);