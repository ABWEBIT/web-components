export const UIButtonStyle = new CSSStyleSheet();
UIButtonStyle.replaceSync(`
:host{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
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

:host([animated]){
  transition:background-color 0.2s,color 0.2s;}

:host ui-text{
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
  height:100%;
  width:var(--height);
  padding-block:calc(var(--height) / 4);}

:host([label]){
  text-align:center;
  font-size:clamp(
    var(--font-size-x-small),
    calc(var(--height) / 2),
    var(--font-size-x-large)
  );}

:host([label]:not([icon-start]):not([icon-end])){
  padding-inline:clamp(10px,calc(var(--height) / 3),20px);}

:host([label][icon-start]:not([icon-end])){
  padding-inline-start:0;
  padding-inline-end:clamp(10px,calc(var(--height) / 3.5),20px);}

:host([label][icon-end]:not([icon-start])){
  padding-inline-start:clamp(10px,calc(var(--height) / 3.5),20px);
  padding-inline-end:0;}
`);