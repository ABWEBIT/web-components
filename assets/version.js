const pkg = await fetch('/package.json').then(r => r.json());

document.querySelectorAll('.version').forEach(el => {
  el.textContent = pkg.version;
});

document.documentElement.dataset.version = pkg.version;