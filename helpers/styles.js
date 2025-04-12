export const globalStyles = new CSSStyleSheet();
globalStyles.replaceSync(`
:host{
  position:relative;
  transition:none;}

:host *{
  box-sizing:border-box;
  outline:none;}
`);

export const UISpacingStyles = new CSSStyleSheet();
UISpacingStyles.replaceSync(`
:host{
  display:block;
  width:100%;
  max-width:100%;}
`);

export const UIDividerStyles = new CSSStyleSheet();
UIDividerStyles.replaceSync(`
:host([type="blank"]){
  display:block;}

:host([type="line"]){
  display:flex;}

:host([axis="x"]){
  width:100%;
  max-width:100%;}

:host([type="line"][axis="x"]){
  align-items:center;}



.label{
  font-size:var(--font-size-small);
  color:var(--color-gray-175);}

:host([axis="x"]) .label{
  padding:0 15px;}

:host([axis="x"]) .line{
  flex-grow:1;
  height:1px;
  background:var(--divider-color);}
`);

export const textStyles = new CSSStyleSheet();
textStyles.replaceSync(`
:host{
  position:relative;
  transition:none;}
`);

export const iconStyle = new CSSStyleSheet();
iconStyle.replaceSync(`
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

export const buttonStyle = new CSSStyleSheet();
buttonStyle.replaceSync(`
:host{
  display:inline-flex;
  justify-content:center;
  align-items:center;
  vertical-align:middle;
  width:fit-content;
  border:none;
  border-radius:var(--border-radius);
  color:rgb(175,175,175);
  background-color:rgb(25,25,25);
  cursor:pointer;
  -webkit-user-select:none;
  user-select:none;
  overflow:hidden;}

:host([disabled]){
  opacity:0.5;
  cursor:not-allowed;}

:host([transition="active"]){
  transition:background-color 0.2s,color 0.2s;}

:host > ui-text{
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
    background-color:rgb(35,35,35);
    color:rgb(225,225,225);}  
}

:host(:active:not([disabled])){
  background-color:rgb(45,45,45);}

/* small */
:host([size="small"]){
  font-size:var(--font-size-small);
  height:24px;}

:host([size="small"]) ui-icon{width:24px;}
:host([size="small"]) ui-text{padding:0 8px;}

/* medium */
:host([size="medium"]){
  font-size:var(--font-size-medium);
  height:32px;}

:host([size="medium"]) ui-icon{width:32px;}
:host([size="medium"]) ui-text{padding:0 12px;}

/* large */
:host([size="large"]){
  font-size:var(--font-size-large);
  height:36px;}

:host([size="large"]) ui-icon{width:36px;}
:host([size="large"]) ui-text{padding:0 16px;}

:host:has(> ui-icon[position="before"]) ui-text{padding-left:0;}
:host:has(> ui-icon[position="after"]) ui-text{padding-right:0;}
`);

export const inputStyle = new CSSStyleSheet();
inputStyle.replaceSync(`
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
  color:rgb(175,175,175);
  background-color:rgb(25,25,25);}

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
  color:rgb(255,255,255);}

:host > .hint{
  font-size:80%;
  color:rgb(150,150,150);}

:host > .block > input{
  height:100%;
  flex-grow:1;
  min-width:70px;
  padding-left:15px;
  padding-right:5px;
  border:none;
  color:rgb(255,255,255);
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
    background-color:rgb(55,55,55);
  }
  :host([transition="active"]) > .block:hover,
  :host > .block:has(> input:focus){
    background-color:rgb(35,35,35);}

  :host > .block > ui-icon:hover{color:rgb(225,225,225);}
}

:host > .block:has(> ui-icon[position="before"]) input{padding-left:0;}
:host > .block:has(> ui-icon[position="after"]) ui-button[icon-before="Clear"]{margin-right:0px;}
`);