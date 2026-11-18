document.addEventListener('DOMContentLoaded', () => {
  const top = document.getElementById('top');
  if (top) {
    const update = () => top.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', update, { passive: true });
    update();
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('.theme-toggle-btn, #themeToggle');
  const directionButtons = document.querySelectorAll('.direction-toggle-btn, #directionToggle');

  const savedTheme = localStorage.getItem('vayora-theme') || localStorage.getItem('vistara-theme') || 'light';
  const savedDirection = localStorage.getItem('vayora-direction') || localStorage.getItem('vistara-direction') || 'ltr';
  root.dataset.theme = savedTheme;
  root.dir = savedDirection;
  updateThemeIcon();
  updateDirectionLabel();

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('vayora-theme', root.dataset.theme);
      updateThemeIcon();
    });
  });

  directionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      root.dir = root.dir === 'rtl' ? 'ltr' : 'rtl';
      localStorage.setItem('vayora-direction', root.dir);
      updateDirectionLabel();
    });
  });

  function updateThemeIcon() {
    const dark = root.dataset.theme === 'dark';
    const iconHtml = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    const titleText = dark ? 'Switch to light theme' : 'Switch to dark theme';
    themeButtons.forEach(btn => {
      btn.innerHTML = iconHtml;
      btn.title = titleText;
      btn.setAttribute('aria-label', titleText);
    });
  }

  function updateDirectionLabel() {
    const label = root.dir === 'rtl' ? 'RTL' : 'LTR';
    const titleText = root.dir === 'rtl' ? 'Switch to left-to-right' : 'Switch to right-to-left';
    directionButtons.forEach(btn => {
      btn.innerHTML = `<span>${label}</span>`;
      btn.title = titleText;
      btn.setAttribute('aria-label', titleText);
    });
  }

  // Smooth close mobile navbar when anchor clicked
  document.querySelectorAll('.navbar-nav a, .mobile-portal-btn').forEach(a => a.addEventListener('click', () => {
    const nav = document.getElementById('nav');
    if (nav && nav.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  }));
});
