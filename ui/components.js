const BASE = './components/';
const components = [

  // primitives
  'icon/icon.js',
  'separator/separator.js',
  'spinner/spinner.js',
  'color-scheme/color-scheme.js',
  // forms
  'checkbox/checkbox.js',
  'field/field.js',
  'input/input.js',
  'select/select.js',
  'switch/switch.js',
  'textarea/textarea.js',
  // components
  'accordion/accordion.js',
  'alert/alert.js',
  'breadcrumb/breadcrumb.js',
  'tabs/tabs.js',
  // utilities
  'focus/focus.js',
  'portal/portal.js',
  // template
  'root/root.js',
  'app/app.js',
  'layout/layout.js',
];

components.forEach(path =>{
  import(`${BASE}${path}`).catch(err => 
    console.warn(`Failed to load component: ${BASE}${path}`,err)
  );
});