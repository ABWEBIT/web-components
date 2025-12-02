const BASE_PATH = './components/';

const components = [
  'accordion/accordion.js',
  'alert/alert.js',
  'breadcrumb/breadcrumb.js',
  'button/button.js',
  'checkbox/checkbox.js',
  'field/field.js',
  'focus/focus.js',
  'icon/icon.js',
  'input/input.js',
  'label/label.js',
  'portal/portal.js',
  'select/select.js',
  'separator/separator.js',
  'spinner/spinner.js',
  'switch/switch.js',
  'tabs/tabs.js',
  'text/text.js',
  'textarea/textarea.js',
];

components.forEach(path =>{
  import(`${BASE_PATH}${path}`).catch(err => 
    console.warn(`Failed to load component: ${BASE_PATH}${path}`,err)
  );
});