/* nav */
const BASE = location.hostname.includes('github.io') ? '/web-components/' : '/';

const pageDir = BASE+'pages/';

const components = [
  { label: 'Foundation', slug: 'foundation', category: 'Essentials' },
  { label: 'Icons', slug: 'icons', category: 'Theme' },

  { label: 'Typography', slug: 'typography', category: 'Tokens' },
  { label: 'Color Palettes', slug: 'color-palettes', category: 'Tokens' },

  { label: 'Icon', slug: 'icon', category: 'Primitives' },
  { label: 'Separator', slug: 'separator', category: 'Primitives' },
  { label: 'Spinner', slug: 'spinner', category: 'Primitives' },

  { label: 'Button', slug: 'button', category: 'Form Controls' },
  { label: 'Checkbox', slug: 'checkbox', category: 'Form Controls' },
  { label: 'Radio', slug: 'radio', category: 'Form Controls' },
  { label: 'Input', slug: 'input', category: 'Form Controls' },
  { label: 'Switch', slug: 'switch', category: 'Form Controls' },
  { label: 'Textarea', slug: 'textarea', category: 'Form Controls' },
  { label: 'Field', slug: 'field', category: 'Form Controls' },
  { label: 'Select', slug: 'select', category: 'Form Controls' },

  { label: 'Accordion', slug: 'accordion', category: 'Components' },
  { label: 'Alert', slug: 'alert', category: 'Components' },
  { label: 'Breadcrumb', slug: 'breadcrumb', category: 'Components' },
  { label: 'Disclosure', slug: 'disclosure', category: 'Components' },
  { label: 'Tabs', slug: 'tabs', category: 'Components' },
  { label: 'Badge', slug: 'badge', category: 'Components' },

  { label: 'Focus', slug: 'focus', category: 'Utilities' },
  { label: 'Portal', slug: 'portal', category: 'Utilities' },
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
      a.href = pageDir+item.slug;

      console.log(currentPath);

      if(item.slug === currentPath){
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