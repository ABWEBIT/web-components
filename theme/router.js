  const components = [
    { label: 'Accordion', link: './ui/ui-accordion/ui-accordion.html', category: 'components' },
    { label: 'Tabs', link: './ui/ui-tabs/ui-tabs.html', category: 'components' },
    { label: 'Foundation', link: './pages/ui-foundation.html', category: 'essentials' },
    { label: 'Icons', link: './pages/ui-icons.html', category: 'theme' },
    { label: 'Icon', link: './ui/ui-icon/ui-icon.html', category: 'primitives' },
    { label: 'Divider', link: './ui/ui-divider/ui-divider.html', category: 'primitives' },
    { label: 'Text', link: './ui/ui-text/ui-text.html', category: 'primitives' },
    { label: 'Button', link: './ui/ui-button/ui-button.html', category: 'forms' },
    { label: 'Checkbox', link: './ui/ui-checkbox/ui-checkbox.html', category: 'forms' },
    { label: 'Input', link: './ui/ui-input/ui-input.html', category: 'forms' },
    { label: 'Label', link: './ui/ui-label/ui-label.html', category: 'forms' },
    { label: 'Switch', link: './ui/ui-switch/ui-switch.html', category: 'forms' },
    { label: 'Textarea', link: './ui/ui-textarea/ui-textarea.html', category: 'forms' },
    { label: 'Field', link: './ui/ui-field/ui-field.html', category: 'forms' },
    { label: 'Select', link: './ui/ui-select/ui-select.html', category: 'forms' },
    { label: 'Listbox', link: './ui/ui-listbox/ui-listbox.html', category: 'forms' },
    { label: 'Focus', link: './ui/ui-focus/ui-focus.html', category: 'utilities' },
    { label: 'Spinner', link: './ui/ui-spinner/ui-spinner.html', category: 'utilities' },
    { label: 'Portal', link: './ui/ui-portal/ui-portal.html', category: 'utilities' },
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
      const pageId = link.match(/ui-[\w-]+(?=\.html)/)?.[0]; // ui-button

      const wrapper = document.createElement('div');
      wrapper.className = 'menuItem';

      const span = document.createElement('span');
      span.textContent = label;
      span.setAttribute('data-link', link);
      span.onclick = () => navigate(pageId);

      wrapper.appendChild(span);
      fragment.appendChild(wrapper);
    });

    container.appendChild(fragment);
  });
}

generateNav(components);

const article = document.getElementById('article');

function navigate(pageId) {
  location.hash = pageId;
}

async function loadPage(hash) {
  const pageId = hash ? hash.substring(1) : 'ui-foundation';

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
    runInlineScripts(article);
    updateActiveMenuItem(link);
  } catch (e) {
    article.innerHTML = '<p>Load error</p>';
  }
}


let prevScripts = [];

function updateActiveMenuItem(currentLink) {
  document.querySelectorAll('nav span[data-link]').forEach(span => {
    span.classList.toggle('active', span.getAttribute('data-link') === currentLink);
  });
}

function runInlineScripts(container) {
  prevScripts.forEach(script => script.remove());
  prevScripts = [];

  const scripts = container.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else {
      newScript.textContent = oldScript.textContent;
    }
    document.body.appendChild(newScript);
    prevScripts.push(newScript);
  });
}


window.addEventListener('hashchange', () => loadPage(location.hash));
window.addEventListener('DOMContentLoaded', () => loadPage(location.hash));
window.navigate = navigate;