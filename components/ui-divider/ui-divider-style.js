export const UIDividerStyle = new CSSStyleSheet();
UIDividerStyle.replaceSync(`
:host{
  display:inline-flex;
  align-items:center;}

:host .line{
  flex-grow:1;
  background-color:var(--rgb-50-50-50,black);}

:host([label]) ui-text{
  font-size:var(--font-size-x-small);
  color:var(--rgb-175-175-175);}

:host([axis="x"]){
  width:100%;
  flex-direction:row;}

:host([axis="x"]) ui-text{padding:0 15px;}
:host([axis="x"]) .line{height:1px;}

:host([axis="x"][label][text-align="start"]) .line:first-child,
:host([axis="x"][label][text-align="end"]) .line:last-child{
  flex-grow:0;
  width:20px;}

:host([axis="y"]){
  height:100%;
  flex-direction:column;}

:host([axis="y"]) ui-text{padding:10px 0;}
:host([axis="y"]) .line{width:1px;}

:host([axis="y"][label][text-align="start"]) .line:first-child,
:host([axis="y"][label][text-align="end"]) .line:last-child{
  flex-grow:0;
  height:20px;}
`);