/* nav */
const infoPageDir = '/docs/';
const compPageDir = '/docs/components/';

const components = [
  { label: 'Foundation', link: infoPageDir+'foundation.html', category: 'essentials' },
  { label: 'Icons', link: infoPageDir+'icons.html', category: 'theme' },

  { label: 'Typography', link: infoPageDir+'typography.html', category: 'tokens' },

  { label: 'Icon', link: compPageDir+'icon.html', category: 'primitives' },
  { label: 'Separator', link: compPageDir+'separator.html', category: 'primitives' },
  { label: 'Spinner', link: compPageDir+'spinner.html', category: 'primitives' },

  { label: 'Button', link: compPageDir+'button.html', category: 'forms' },
  { label: 'Checkbox', link: compPageDir+'checkbox.html', category: 'forms' },
  { label: 'Radio', link: compPageDir+'radio.html', category: 'forms' },
  { label: 'Input', link: compPageDir+'input.html', category: 'forms' },
  { label: 'Switch', link: compPageDir+'switch.html', category: 'forms' },
  { label: 'Textarea', link: compPageDir+'textarea.html', category: 'forms' },
  { label: 'Field', link: compPageDir+'field.html', category: 'forms' },
  { label: 'Select', link: compPageDir+'select.html', category: 'forms' },

  { label: 'Accordion', link: compPageDir+'accordion.html', category: 'components' },
  { label: 'Alert', link: compPageDir+'alert.html', category: 'components' },
  { label: 'Breadcrumb', link: compPageDir+'breadcrumb.html', category: 'components' },
  { label: 'Disclosure', link: compPageDir+'disclosure.html', category: 'components' },
  { label: 'Tabs', link: compPageDir+'tabs.html', category: 'components' },
  { label: 'Badge', link: compPageDir+'badge.html', category: 'components' },

  { label: 'Focus', link: compPageDir+'focus.html', category: 'utilities' },
  { label: 'Portal', link: compPageDir+'portal.html', category: 'utilities' },
];

function generateSidebar(components) {
  const ul = document.querySelector('.sidebar-list');
  if (!ul) return;

  ul.innerHTML = '';

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

      li.appendChild(a);
      subUl.appendChild(li);
    }

    categoryLi.appendChild(subUl);
    ul.appendChild(categoryLi);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  generateSidebar(components);
});

/* version */
const pkg = await fetch('../package.json').then(r => r.json());

document.querySelectorAll('.version').forEach(el => {
  el.textContent = pkg.version;
});
document.documentElement.dataset.version = pkg.version;