/* nav */
const BASE = location.hostname.includes('github.io') ? '/web-components/' : '/';

const pageDir = BASE+'pages/';

const components = [
  { label: 'Foundation', link: pageDir+'foundation', category: 'Essentials' },
  { label: 'Icons', link: pageDir+'icons', category: 'Theme' },

  { label: 'Typography', link: pageDir+'typography', category: 'Tokens' },

  { label: 'Icon', link: pageDir+'icon', category: 'Primitives' },
  { label: 'Separator', link: pageDir+'separator', category: 'Primitives' },
  { label: 'Spinner', link: pageDir+'spinner', category: 'Primitives' },

  { label: 'Button', link: pageDir+'button', category: 'Form Controls' },
  { label: 'Checkbox', link: pageDir+'checkbox', category: 'Form Controls' },
  { label: 'Radio', link: pageDir+'radio', category: 'Form Controls' },
  { label: 'Input', link: pageDir+'input', category: 'Form Controls' },
  { label: 'Switch', link: pageDir+'switch', category: 'Form Controls' },
  { label: 'Textarea', link: pageDir+'textarea', category: 'Form Controls' },
  { label: 'Field', link: pageDir+'field', category: 'Form Controls' },
  { label: 'Select', link: pageDir+'select', category: 'Form Controls' },

  { label: 'Accordion', link: pageDir+'accordion', category: 'Components' },
  { label: 'Alert', link: pageDir+'alert', category: 'Components' },
  { label: 'Breadcrumb', link: pageDir+'breadcrumb', category: 'Components' },
  { label: 'Disclosure', link: pageDir+'disclosure', category: 'Components' },
  { label: 'Tabs', link: pageDir+'tabs', category: 'Components' },
  { label: 'Badge', link: pageDir+'badge', category: 'Components' },

  { label: 'Focus', link: pageDir+'focus', category: 'Utilities' },
  { label: 'Portal', link: pageDir+'portal', category: 'Utilities' },
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
    'Essentials',
    'Tokens',
    'Theme',
    'Layout',
    'Primitives',
    'Form Controls',
    'Components',
    'Utilities'
  ];

  const currentPath = getPageName(window.location.pathname);

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
    title.textContent = category;

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
    .pop() || 'index';
}