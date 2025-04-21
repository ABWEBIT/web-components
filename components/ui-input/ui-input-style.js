export const UIInputStyle = new CSSStyleSheet();
UIInputStyle.replaceSync(`
:host{
  display:inline-flex;
  align-items:center;
  vertical-align:middle;
  width:fit-content;
  border:none;
  border-radius:var(--border-radius);
  overflow:hidden;
  color:var(--rgb-175-175-175);
  background-color:var(--rgb-25-25-25);}

:host([disabled]){
  opacity:0.5;
  cursor:not-allowed;}

:host([animated]){
  transition:background-color 0.2s,color 0.2s;}

:host input{
  height:100%;
  flex-grow:1;
  min-width:70px;
  border:none;
  color:var(--rgb-255-255-255);
  font-size:90%;
  background-color:transparent;
  transition:color 0.2s;}

input::-ms-reveal{display:none;}

:host ui-icon{
  height:100%;
  width:var(--height);
  padding-block:calc(var(--height) / 4);}

ui-icon[icon="cancel"]{
  cursor:pointer;}

@media (hover:hover){
  :host([transition="active"]:hover),
  :host:has(input:focus){
    background-color:var(--rgb-35-35-35);}

  :host ui-icon:hover{color:var(--rgb-225-225-225);}
}
`);