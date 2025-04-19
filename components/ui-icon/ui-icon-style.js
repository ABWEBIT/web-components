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

:host([transition="active"]){
  transition:color 0.2s;}

svg{
  width:20px;
  height:20px;
  fill:currentColor;
  shape-rendering:geometricPrecision;
  pointer-events:none;}
`);