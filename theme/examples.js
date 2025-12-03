function changeIconAttribute(attribute,values){
  const iconBlock = document.getElementById('example-icon');
  if(!iconBlock) return;

  const currentValue = iconBlock.getAttribute(attribute);
  const currentIndex = values.indexOf(currentValue);
  const nextIndex = (currentIndex + 1) % values.length;
  const nextValue = values[nextIndex];

  iconBlock.setAttribute(attribute,nextValue);
}

function changeIconName(){
  changeIconAttribute('name',['article','settings']);
}

/*
  select00.data = [
    {value:'1',label:'ID1_Option_111111111111111111111111', selected: true, disabled: false },
    {value:'2',label:'ID1 Option 2', selected: false, disabled: false },
    {value:'3',label:'ID1 Option 3', selected: false, disabled: false },
  ];

  select01.data = [
    {value:'1',label:'ID2 Option 1', selected: false, disabled: false },
    {value:'2',label:'ID2 Option 2', selected: false, disabled: true },
    {value:'3',label:'ID2 Option 3', selected: false, disabled: false },
  ];


  tabs.data = [
    {label:'What is Lorem?',content:'Lorem <strong>ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {label:'Why use it?',content:'Lorem <strong>ipsum</strong> dolor...',disabled:true},
    {label:'Where to use?',content:'Lorem <strong>ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <ui-button>Test</ui-button>'}
  ];

accordion.data = [
  {label:'What is Lorem?',content:'Lorem ipsum dolor sit amet...',expanded:true},
  {label:'Why use it?',content:'Lorem ipsum dolor sit amet...',disabled:true},
  {label:'Where to use?',content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
];

alert00.data = {
  content:'Your settings have been <strong>successfully</strong> saved.'
};

alert01.data = {
  label:'Update Complete',
  content:'Your settings have been <strong>successfully</strong> saved.'
};

alert02.data = {
  label:'Update Complete',
  content:'Your settings have been <strong>successfully</strong> saved.'
};

  breadcrumb00.data = [
    {label:'Home',href:'/'},
    {label:'Settings',href:'/'},
    {label:'Notifications',href:'/'},
    {label:'Article',href:'/'}
  ];

  breadcrumb01.data = [
    {name:'home',label:'Home',href:'/'},
    {name:'settings',label:'Settings',href:'/'},
    {name:'notifications',label:'Notifications',href:'/'},
    {name:'article',label:'Article',href:'/'}
  ];

  const buttonBusy = document.getElementById('busy');
  const buttonReset = document.getElementById('reset');

  buttonBusy.addEventListener('button-action',() =>{
    buttonBusy.setAttribute('busy','');
  });

  buttonReset.addEventListener('button-action',() => {
    buttonBusy.removeAttribute('busy');
  });
*/