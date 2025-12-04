const infoPageDir = './pages/';
const compPageDir = './pages/components/';

const components = [
  // Info Pages
  {label: 'Foundation', link: infoPageDir+'foundation.html', category: 'essentials' },
  {label: 'Icons', link: infoPageDir+'icons.html', category: 'theme' },

  // Components Pages

  // Primitives
  {label: 'Icon', link: compPageDir+'icon.html', category: 'primitives' },
  {label: 'Separator', link: compPageDir+'separator.html', category: 'primitives' },
  {label: 'Text', link: compPageDir+'text.html', category: 'primitives' },
  {label: 'Spinner', link: compPageDir+'spinner.html', category: 'primitives' },

  // Forms
  {label: 'Button', link: compPageDir+'button.html', category: 'forms' },
  {label: 'Checkbox', link: compPageDir+'checkbox.html', category: 'forms' },
  {label: 'Input', link: compPageDir+'input.html', category: 'forms' },
  {label: 'Label', link: compPageDir+'label.html', category: 'forms' },
  {label: 'Switch', link: compPageDir+'switch.html', category: 'forms' },
  {label: 'Textarea', link: compPageDir+'textarea.html', category: 'forms' },
  {label: 'Field', link: compPageDir+'field.html', category: 'forms' },
  {label: 'Select', link: compPageDir+'select.html', category: 'forms' },

  // Components
  {label: 'Accordion', link: compPageDir+'accordion.html', category: 'components' },
  {label: 'Alert', link: compPageDir+'alert.html', category: 'components' },
  {label: 'Tabs', link: compPageDir+'tabs.html', category: 'components' },
  {label: 'Breadcrumb', link: compPageDir+'breadcrumb.html', category: 'components' },

  // Utilities
  {label: 'Focus', link: compPageDir+'focus.html', category: 'utilities' },
  {label: 'Portal', link: compPageDir+'portal.html', category: 'utilities' },
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

function navigate(pageId){
  location.hash = pageId;
}

async function loadPage(hash){
  const pageId = hash ? hash.substring(1) : 'foundation';

  const component = components.find(item =>
    item.link.includes(pageId + '.html')
  );

  const link = component?.link;

  if(!link){
    article.innerHTML = '<p>Not Found</p>';
    updateActiveMenuItem(null);
    return;
  }

  try{
    const res = await fetch(link);
    const html = await res.text();
    article.innerHTML = html;
    updateActiveMenuItem(link);
  }
  catch (e){
    article.innerHTML = '<p>Load error</p>';
  }
}

function updateActiveMenuItem(currentLink) {
  document.querySelectorAll('nav span[data-link]').forEach(span => {
    span.classList.toggle('active', span.getAttribute('data-link') === currentLink);
  });
}

window.addEventListener('hashchange',() => loadPage(location.hash));
window.addEventListener('DOMContentLoaded',() => loadPage(location.hash));
window.navigate = navigate;