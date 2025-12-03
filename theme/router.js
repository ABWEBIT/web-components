const pageDir = './pages/';

const components = [
  { label: 'Foundation', link: pageDir+'foundation.html', category: 'essentials' },

  { label: 'Accordion', link: pageDir+'accordion.html', category: 'components' },
  { label: 'Alert', link: pageDir+'alert.html', category: 'components' },
  { label: 'Tabs', link: pageDir+'tabs.html', category: 'components' },
  { label: 'Breadcrumb', link: pageDir+'breadcrumb.html', category: 'components' },


  { label: 'Icons', link: pageDir+'icons.html', category: 'theme' },

  { label: 'Icon', link: pageDir+'icon.html', category: 'primitives' },
  { label: 'Separator', link: pageDir+'separator.html', category: 'primitives' },
  { label: 'Text', link: pageDir+'text.html', category: 'primitives' },
  { label: 'Spinner', link: pageDir+'spinner.html', category: 'primitives' },

  { label: 'Button', link: pageDir+'button.html', category: 'forms' },
  { label: 'Checkbox', link: pageDir+'checkbox.html', category: 'forms' },
  { label: 'Input', link: pageDir+'input.html', category: 'forms' },
  { label: 'Label', link: pageDir+'label.html', category: 'forms' },
  { label: 'Switch', link: pageDir+'switch.html', category: 'forms' },
  { label: 'Textarea', link: pageDir+'textarea.html', category: 'forms' },
  { label: 'Field', link: pageDir+'field.html', category: 'forms' },
  { label: 'Select', link: pageDir+'select.html', category: 'forms' },

  { label: 'Focus', link: pageDir+'focus.html', category: 'utilities' },
  { label: 'Portal', link: pageDir+'portal.html', category: 'utilities' },
];

function generateNav(data) {
  const categories = ['essentials', 'theme', 'primitives', 'forms', 'components', 'utilities'];

  categories.forEach(category => {
    const container = document.querySelector(`[data-nav-category="${category}"]`);
    if (!container) return;

    const items = data
      .filter(item => item.category === category)
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));

    const fragment = document.createDocumentFragment();

    items.forEach(({ label, link }) => {
      const pageId = link.match(/[\w-]+(?=\.html)/)?.[0];

      const wrapper = document.createElement('div');
      wrapper.className = 'menuItem';

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