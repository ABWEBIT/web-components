export const UIInputStyle = new CSSStyleSheet();
UIInputStyle.replaceSync(`
:host{
  display:inline-flex;
  vertical-align:middle;
  align-items:center;
  width:fit-content;
  height:40px;
  border:none;
  border-radius:var(--border-radius);
  overflow:hidden;
  color:var(--rgb-175-175-175);
  background-color:var(--rgb-25-25-25);}

:host([transition="active"]){
  transition:background-color 0.2s,color 0.2s;}

:host input{
  height:100%;
  flex-grow:1;
  min-width:70px;
  padding-left:15px;
  padding-right:5px;
  border:none;
  color:var(--rgb-255-255-255);
  font-size:90%;
  background-color:transparent;
  transition:color 0.2s;}

input::-ms-reveal{display:none;}

:host ui-icon{
  height:100%;
  width:40px;
  min-width:40px;}

:host ui-button[icon-before="Clear"]{
  max-width:30px;
  max-height:30px;
  min-width:30px;
  min-height:30px;
  margin-right:5px;

  border-radius:50%;
  background-color:transparent;
  cursor:pointer;}

@media (hover:hover){
  :host ui-button[icon-before="Clear"]:hover{
    background-color:var(--rgb-50-50-50);
  }
  :host([transition="active"]:hover),
  :host:has(input:focus){
    background-color:var(--rgb-35-35-35);}

  :host ui-icon:hover{color:var(--rgb-225-225-225);}
}

:host:has(> ui-icon[position="before"]) input{padding-left:0;}
:host:has(> ui-icon[position="after"]) ui-button[icon-before="Clear"]{margin-right:0px;}
`);