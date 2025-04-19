export const UIDividerStyle = new CSSStyleSheet();
UIDividerStyle.replaceSync(`
:host{
  display:inline-flex;
  align-items:center;}

:host .line{
  flex-grow:1;
  background-color:var(--rgb-50-50-50,black);}

:host([label]) .label{
  font-size:var(--font-size-x-small);
  color:var(--rgb-175-175-175);}

:host([axis="x"]){
  width:100%;
  flex-direction:row;}

:host([axis="x"]) .label{padding:0 15px;}
:host([axis="x"]) .line{height:1px;}

:host([axis="x"][label][text-align="left"]) .line:first-child,
:host([axis="x"][label][text-align="right"]) .line:last-child{
  flex-grow:0;
  width:20px;}

:host([axis="y"]){
  height:100%;
  flex-direction:column;}

:host([axis="y"]) .label{padding:10px 0;}
:host([axis="y"]) .line{width:1px;}

:host([axis="y"][label][text-align="top"]) .line:first-child,
:host([axis="y"][label][text-align="bottom"]) .line:last-child{
  flex-grow:0;
  height:20px;}
`);