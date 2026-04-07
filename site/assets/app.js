/* nav */
const BASE = location.hostname.includes('github.io') ? '/web-components/' : '/';

const pageDir = BASE+'site/pages/';

const components = [
  { label: 'Foundation', link: pageDir+'foundation.html', category: 'essentials' },
  { label: 'Icons', link: pageDir+'icons.html', category: 'theme' },

  { label: 'Typography', link: pageDir+'typography.html', category: 'tokens' },

  { label: 'Icon', link: pageDir+'icon.html', category: 'primitives' },
  { label: 'Separator', link: pageDir+'separator.html', category: 'primitives' },
  { label: 'Spinner', link: pageDir+'spinner.html', category: 'primitives' },

  { label: 'Button', link: pageDir+'button.html', category: 'forms' },
  { label: 'Checkbox', link: pageDir+'checkbox.html', category: 'forms' },
  { label: 'Radio', link: pageDir+'radio.html', category: 'forms' },
  { label: 'Input', link: pageDir+'input.html', category: 'forms' },
  { label: 'Switch', link: pageDir+'switch.html', category: 'forms' },
  { label: 'Textarea', link: pageDir+'textarea.html', category: 'forms' },
  { label: 'Field', link: pageDir+'field.html', category: 'forms' },
  { label: 'Select', link: pageDir+'select.html', category: 'forms' },

  { label: 'Accordion', link: pageDir+'accordion.html', category: 'components' },
  { label: 'Alert', link: pageDir+'alert.html', category: 'components' },
  { label: 'Breadcrumb', link: pageDir+'breadcrumb.html', category: 'components' },
  { label: 'Disclosure', link: pageDir+'disclosure.html', category: 'components' },
  { label: 'Tabs', link: pageDir+'tabs.html', category: 'components' },
  { label: 'Badge', link: pageDir+'badge.html', category: 'components' },

  { label: 'Focus', link: pageDir+'focus.html', category: 'utilities' },
  { label: 'Portal', link: pageDir+'portal.html', category: 'utilities' },
];

function generateSidebar(components) {
  const nav = document.querySelector('.sidebar > nav');
  if(!nav) return;

  nav.innerHTML = '';
  const ul = document.createElement('ul');

  const grouped = components.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryOrder = [
    'essentials',
    'tokens',
    'theme',
    'layout',
    'primitives',
    'forms',
    'components',
    'utilities'
  ];

  const currentPath = getPageName(window.location.pathname);

  console.log(currentPath);

  for (const category of categoryOrder) {
    const items = grouped[category];
    if (!items || items.length === 0) continue;

    items.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    );

    const categoryLi = document.createElement('li');
    categoryLi.className = 'nav-category';
    categoryLi.dataset.navCategory = category;

    const title = document.createElement('div');
    title.className = 'menu-title';
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    categoryLi.appendChild(title);

    const subUl = document.createElement('ul');

    for (const item of items) {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.className = 'menu-item';
      a.textContent = item.label;
      a.href = item.link;

      if(item.label.toLowerCase() === currentPath){
        a.classList.add('active');
      }

      li.appendChild(a);
      subUl.appendChild(li);
    }

    categoryLi.appendChild(subUl);
    ul.appendChild(categoryLi);
  }
  nav.append(ul);
}

document.addEventListener('DOMContentLoaded', () => {
  generateSidebar(components);
});

function getPageName(path) {
  return path
    .split(/[?#]/)[0]
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace('.html', '') || 'index';
}

/* version */
const pkg = await fetch(BASE + 'package.json').then(r => r.json());

document.querySelectorAll('.version').forEach(el => {
  el.textContent = pkg.version;
});
document.documentElement.dataset.version = pkg.version;