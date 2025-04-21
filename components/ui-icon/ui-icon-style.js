export const UIIconStyle = new CSSStyleSheet();
UIIconStyle.replaceSync(`
:host{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
  width:20px;
  height:20px;
  -webkit-user-select:none;
  user-select:none;}

:host([animated]){
  transition:color 0.2s;}

svg{
  width:100%;
  height:100%;
  aspect-ratio:1 / 1;
  fill:currentColor;
  shape-rendering:geometricPrecision;
  pointer-events:none;}
`);