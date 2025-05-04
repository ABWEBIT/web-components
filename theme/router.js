const article = document.getElementById('article');

export function navigate(page){
  location.hash = page;
}

const loadPage = async (hash) => {
  const page = hash ? hash.substring(1) : 'icons';
  try{
    const res = await fetch(`./pages/${page}.html`);
    const html = await res.text();
    article.innerHTML = html;
    runInlineScripts(article);
    updateActiveMenuItem(page);
  }
  catch(e){
    article.innerHTML = '<p>Страница не найдена</p>';
  }
};

let prevScripts = [];

const runInlineScripts = (container) => {
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
};


const updateActiveMenuItem = (page) => {
  document.querySelectorAll('nav span[data-page]').forEach(span => {
    if (span.getAttribute('data-page') === page) {
      span.classList.add('active');
    } else {
      span.classList.remove('active');
    }
  });
};

window.navigate = navigate;
window.addEventListener('hashchange', () => loadPage(location.hash));
window.addEventListener('DOMContentLoaded', () => loadPage(location.hash));