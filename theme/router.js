const pageDir = './pages/';
const compDir = './pages/components/';

const components = [
  // Pages
  { label: 'Foundation', link: pageDir+'foundation.html', category: 'essentials' },
  { label: 'Icons', link: pageDir+'icons.html', category: 'theme' },

  // Components
  { label: 'Accordion', link: compDir+'accordion.html', category: 'components' },
  { label: 'Alert', link: compDir+'alert.html', category: 'components' },
  { label: 'Tabs', link: compDir+'tabs.html', category: 'components' },
  { label: 'Breadcrumb', link: compDir+'breadcrumb.html', category: 'components' },

  { label: 'Icon', link: compDir+'icon.html', category: 'primitives' },
  { label: 'Separator', link: compDir+'separator.html', category: 'primitives' },
  { label: 'Text', link: compDir+'text.html', category: 'primitives' },
  { label: 'Spinner', link: compDir+'spinner.html', category: 'primitives' },

  { label: 'Button', link: compDir+'button.html', category: 'forms' },
  { label: 'Checkbox', link: compDir+'checkbox.html', category: 'forms' },
  { label: 'Input', link: compDir+'input.html', category: 'forms' },
  { label: 'Label', link: compDir+'label.html', category: 'forms' },
  { label: 'Switch', link: compDir+'switch.html', category: 'forms' },
  { label: 'Textarea', link: compDir+'textarea.html', category: 'forms' },
  { label: 'Field', link: compDir+'field.html', category: 'forms' },
  { label: 'Select', link: compDir+'select.html', category: 'forms' },

  { label: 'Focus', link: compDir+'focus.html', category: 'utilities' },
  { label: 'Portal', link: compDir+'portal.html', category: 'utilities' },
];

function generateNav(data){
  const categories = ['essentials','theme','primitives','forms','components','utilities'];

  categories.forEach(category =>{
    const container = document.querySelector(`[data-nav-category="${category}"]`);
    if (!container) return;

    const items = data
      .filter(item => item.category === category)
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

    const fragment = document.createDocumentFragment();

    items.forEach(({ label, link }) => {
      const pageId = link.match(/[\w-]+(?=\.html)/)?.[0];

      const wrapper = document.createElement('div');
      wrapper.className = 'menu-item';

      const span = document.createElement('span');
      span.textContent = label;
      span.setAttribute('data-link', link);
      span.onclick = () => navigate(pageId);

      wrapper.append(span);
      fragment.append(wrapper);
    });

    container.append(fragment);
  });
}

generateNav(components);

const article = document.getElementById('article');

function navigate(pageId) {
  location.hash = pageId;
}

async function loadPage(hash) {
  const pageId = hash ? hash.substring(1) : 'foundation';

  const component = components.find(item =>
    item.link.includes(pageId + '.html')
  );

  const link = component?.link;

  if (!link) {
    article.innerHTML = '<p>Not Found</p>';
    updateActiveMenuItem(null);
    return;
  }

  try {
    const res = await fetch(link);
    const html = await res.text();
    article.innerHTML = html;
    updateActiveMenuItem(link);
  } catch (e) {
    article.innerHTML = '<p>Load error</p>';
  }
}

function updateActiveMenuItem(currentLink) {
  document.querySelectorAll('nav span[data-link]').forEach(span => {
    span.classList.toggle('active', span.getAttribute('data-link') === currentLink);
  });
}


window.addEventListener('hashchange', () => loadPage(location.hash));
window.addEventListener('DOMContentLoaded', () => loadPage(location.hash));
window.navigate = navigate;