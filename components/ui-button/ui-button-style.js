export const UIButtonStyle = new CSSStyleSheet();
UIButtonStyle.replaceSync(`
:host{
  display:inline-flex;
  align-items:center;
  vertical-align:middle;
  width:fit-content;
  border:none;
  border-radius:var(--border-radius);
  color:var(--rgb-175-175-175);
  background-color:var(--rgb-30-30-30);
  line-height:1;
  cursor:pointer;
  -webkit-user-select:none;
  user-select:none;
  overflow:hidden;}

:host([disabled]){
  opacity:0.5;
  cursor:not-allowed;}

:host([transition]){
  transition:background-color 0.2s,color 0.2s;}

:host > .label{
  flex-grow:1;
  white-space:nowrap;}

:host::after{
  position:absolute;
  display:block;
  inset:0;
  content:'';
  border:none;
  border-radius:var(--border-radius);}

@media (hover:hover){
  :host(:hover:not([disabled])){
    background-color:var(--rgb-40-40-40);
    color:var(--rgb-225-225-225);}  
}

:host(:active:not([disabled])){
  background-color:var(--rgb-50-50-50);}

:host ui-icon{
  width:var(--height);
  height:clamp(12px,calc(var(--height) / 2),20px);}

:host([label]){
  text-align:center;
  font-size:clamp(
    var(--font-size-x-small),
    calc(var(--height) / 2),
    var(--font-size-x-large)
  );}

:host([label][text-align="left"]){
  text-align:left;}

:host([label][text-align="right"]){
  text-align:right;}

:host([label]:not([icon-left]):not([icon-right])){
  padding-inline:clamp(10px, calc(var(--height) / 3), 20px);}

:host([label][icon-left]:not([icon-right])){
  padding-inline-start:0;
  padding-inline-end:clamp(10px, calc(var(--height) / 3.5), 20px);}

:host([label][icon-right]:not([icon-left])){
  padding-inline-start:clamp(10px, calc(var(--height) / 3.5), 20px);
  padding-inline-end:0;}
`);