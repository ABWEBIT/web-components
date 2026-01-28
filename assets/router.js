const infoPageDir = './docs/';
const compPageDir = './docs/components/';

const components = [
  // Info Docs
  {label: 'Foundation', link: infoPageDir+'foundation.html', category: 'essentials' },
  {label: 'Icons', link: infoPageDir+'icons.html', category: 'theme' },
  
  // Design Tokens
  {label: 'Typography', link: infoPageDir+'typography.html', category: 'tokens' },
  {label: 'Borders', link: infoPageDir+'borders.html', category: 'tokens' },

  // Primitives
  {label: 'Icon', link: compPageDir+'icon.html', category: 'primitives' },
  {label: 'Separator', link: compPageDir+'separator.html', category: 'primitives' },
  {label: 'Spinner', link: compPageDir+'spinner.html', category: 'primitives' },

  // Forms
  {label: 'Button', link: compPageDir+'button.html', category: 'forms' },
  {label: 'Checkbox', link: compPageDir+'checkbox.html', category: 'forms' },
  {label: 'Input', link: compPageDir+'input.html', category: 'forms' },
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

function generateNav(components){
  components.forEach(({label,link,category}) => {
    const container = document.querySelector(`[data-nav-category="${category}"]`);
    if(!container) return;

    const pageId = link.match(/[\w-]+(?=\.html)/)?.[0];

    const wrapper = document.createElement('ui-button');

    wrapper.setAttribute('justify','start');
    wrapper.setAttribute('variant','ghost');
    wrapper.className = 'menu-item';

    const button = document.createElement('button');
    button.textContent = label;
    button.setAttribute('data-link',link);
    button.onclick = () => navigate(pageId);

    wrapper.append(button);
    container.append(wrapper);
  });

  const containers = document.querySelectorAll('[data-nav-category]');
  containers.forEach(container => {
    const items = Array.from(container.children);
    items.sort((a, b) => {
      const labelA = a.querySelector('button')?.textContent || '';
      const labelB = b.querySelector('button')?.textContent || '';
      return labelA.localeCompare(labelB, undefined, { sensitivity: 'base' });
    });
    items.forEach(item => container.appendChild(item));
  });
}
generateNav(components);

const article = document.querySelector('main > article');

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

function updateActiveMenuItem(currentLink){
  document.querySelectorAll('nav button[data-link]').forEach(button =>{
    const parent = button.closest('ui-button');
    if(parent){
      parent.classList.toggle('active', button.getAttribute('data-link') === currentLink);
    }
  });
}

window.addEventListener('hashchange',() => loadPage(location.hash));
window.addEventListener('DOMContentLoaded',() => loadPage(location.hash));
window.navigate = navigate;