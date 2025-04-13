export const UIComponentsStyles = new CSSStyleSheet();
UIComponentsStyles.replaceSync(`
:host{
  position:relative;
  transition:none;}

:host *{
  box-sizing:border-box;
  outline:none;}
`);

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

export const UIDividerStyles = new CSSStyleSheet();
UIDividerStyles.replaceSync(`
:host{
  display:flex;
  align-items:center;}

:host .line{
  flex-grow:1;
  background-color:var(--rgb-50-50-50,black);}

:host([label]) .label{
  font-size:var(--font-size-small);
  color:var(--rgb-175-175-175);}

:host([axis="x"]) .label{padding:0 15px;}
:host([axis="x"]) .line{height:1px;}

:host([axis="x"][label][align="left"]) .line:first-child,
:host([axis="x"][label][align="right"]) .line:last-child{
  flex-grow:0;
  width:20px;}

:host([axis="y"]){
  height:100%;
  flex-direction:column;}

:host([axis="y"]) .label{padding:10px 0;}
:host([axis="y"]) .line{width:1px;}

:host([axis="y"][label][align="top"]) .line:first-child,
:host([axis="y"][label][align="bottom"]) .line:last-child{
  flex-grow:0;
  height:20px;}
`);

export const UIButtonStyle = new CSSStyleSheet();
UIButtonStyle.replaceSync(`
:host{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
  width:fit-content;
  border:none;
  border-radius:var(--border-radius);
  color:var(--rgb-175-175-175);
  background-color:var(--rgb-30-30-30);
  cursor:pointer;
  -webkit-user-select:none;
  user-select:none;
  overflow:hidden;}

:host([disabled]){
  opacity:0.5;
  cursor:not-allowed;}

:host([transition="active"]){
  transition:background-color 0.2s,color 0.2s;}

:host > .label{
  text-align:inherit;
  flex-grow:1;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;}

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

/* small */
:host([size="small"]){
  font-size:var(--font-size-small);
  height:20px;}

:host([size="small"]) ui-icon{width:20px;}
:host([size="small"]) .label{padding:0 8px;}

/* medium */
:host([size="medium"]){
  font-size:var(--font-size-medium);
  height:30px;}

:host([size="medium"]) ui-icon{width:30px;}
:host([size="medium"]) .label{padding:0 12px;}

/* large */
:host([size="large"]){
  font-size:var(--font-size-large);
  height:40px;}

:host([size="large"]) ui-icon{width:40px;}
:host([size="large"]) .label{padding:0 16px;}

:host:has(> ui-icon[position="before"]) .label{padding-left:0;}
:host:has(> ui-icon[position="after"]) .label{padding-right:0;}
`);

export const UIInputStyle = new CSSStyleSheet();
UIInputStyle.replaceSync(`
:host{
  display:inline-flex;
  flex-direction:column;
  row-gap:10px;}

:host > .block{
  position:relative;
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

:host([transition="active"]) > .block{
  transition:background-color 0.2s,color 0.2s;}

:host > .label,
:host > .hint{
  line-height:100%;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;}

:host > .label{
  font-size:90%;
  color:var(--rgb-255-255-255);}

:host > .hint{
  font-size:80%;
  color:var(--rgb-150-150-150);}

:host > .block > input{
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

:host > .block > input::-ms-reveal{display:none;}

:host > .block > ui-icon{
  height:100%;
  width:40px;
  min-width:40px;}

:host > .block > ui-button[icon-before="Clear"]{
  max-width:30px;
  max-height:30px;
  min-width:30px;
  min-height:30px;
  margin-right:5px;

  border-radius:50%;
  background-color:transparent;
  cursor:pointer;}

@media (hover:hover){
  :host > .block > ui-button[icon-before="Clear"]:hover{
    background-color:var(--rgb-50-50-50);
  }
  :host([transition="active"]) > .block:hover,
  :host > .block:has(> input:focus){
    background-color:var(--rgb-25-25-25);}

  :host > .block > ui-icon:hover{color:var(--rgb-225-225-225);}
}

:host > .block:has(> ui-icon[position="before"]) input{padding-left:0;}
:host > .block:has(> ui-icon[position="after"]) ui-button[icon-before="Clear"]{margin-right:0px;}
`);

export const UITextStyles = new CSSStyleSheet();
UITextStyles.replaceSync(`
:host{
  position:relative;
  transition:none;}
`);