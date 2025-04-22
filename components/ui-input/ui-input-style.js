export const UIInputStyle = new CSSStyleSheet();
UIInputStyle.replaceSync(`
:host{
  display:inline-flex;
  align-items:center;
  vertical-align:middle;
  border-radius:var(--border-radius);
  color:var(--rgb-175-175-175);
  background-color:var(--rgb-25-25-25);
  overflow:hidden;}

:host([disabled]){
  cursor:not-allowed;
  opacity:0.5;}

:host([disabled]) *{
  pointer-events:none;}

:host([animated]){
  transition-duration:0.2s;
  transition-property:background-color,color,outline-color,border-color;}

:host([status]){
  outline-style:solid;
  outline-width:1px;
  outline-offset:0;}

:host([status="error"]){
  outline-color:var(--rgb-210-55-55);}

:host([status="valid"]){
  outline-color:var(--rgb-85-175-85);}

:host([status="warning"]){
  outline-color:var(--rgb-210-175-20);}

input{
  height:100%;
  flex-grow:1;
  width:fit-content;
  border:none;
  color:var(--rgb-255-255-255);
  background-color:transparent;
  direction:inherit;}

input::-ms-reveal{
  display:none;}

ui-icon{
  color:var(--rgb-100-100-100);
  height:100%;
  width:var(--height);
  padding-block:calc(var(--height) / 4);}

ui-icon[icon="cancel"]{
  cursor:pointer;}

@media (hover:hover){
  :host([animated]:hover:not([disabled])),
  :host([focused]){
    background-color:var(--rgb-35-35-35);}

  ui-icon:hover{
    color:var(--rgb-225-225-225);}

  :host([animated]:hover):not([status]):not([disabled]){
    outline-color:var(--rgb-75-75-75);}
}

:host([focused]:not([status]):not([disabled])){
  outline-color:var(--rgb-75-75-75);
}

input{
  font-size:clamp(
    var(--font-size-x-small),
    calc(var(--height) / 2 - 2px),
    var(--font-size-medium)
  );}

:host(:not([icon-start])) input{
  padding-inline-start:calc(var(--height) / 3);}
`);





/*
:host{
  border-style:solid;
  border-width:1px;
  border-color:var(--rgb-35-35-35);

  outline-style:solid;
  outline-width:1px;
  outline-offset:0;
  outline-color:var(--rgb-35-35-35);
}
*/