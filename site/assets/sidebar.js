(function () {
  const app = document.querySelector('ui-app');
  if (!app) return;


  fetch('../partials/sidebar.html')
    .then(r => r.text())
    .then(html => {
      sessionStorage.setItem('sidebar', html);
      app.insertAdjacentHTML('afterbegin', html);

    });


})();