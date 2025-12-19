const BASE_PATH = './components/';

const components = [
  // primitives
  'icon/icon.js',
  'separator/separator.js',
  'spinner/spinner.js',
  // forms
  'button/button.js',
  'checkbox/checkbox.js',
  'field/field.js',
  'input/input.js',
  'label/label.js',
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
  'app/app.js',
  'wrapper/wrapper.js',
];

components.forEach(path =>{
  import(`${BASE_PATH}${path}`).catch(err => 
    console.warn(`Failed to load component: ${BASE_PATH}${path}`,err)
  );
});