document.addEventListener('DOMContentLoaded', () => {
  const top = document.getElementById('top');
  if (top) {
    const update = () => top.classList.toggle('show', window.scrollY > 400);
    window.addEventListener('scroll', update, { passive: true });
    update();
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const root = document.documentElement;
  const themeButton = document.getElementById('themeToggle');
  const directionButton = document.getElementById('directionToggle');

  const savedTheme = localStorage.getItem('vayora-theme') || localStorage.getItem('vistara-theme') || 'light';
  const savedDirection = localStorage.getItem('vayora-direction') || localStorage.getItem('vistara-direction') || 'ltr';
  root.dataset.theme = savedTheme;
  root.dir = savedDirection;
  updateThemeIcon();
  updateDirectionLabel();

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('vayora-theme', root.dataset.theme);
      updateThemeIcon();
    });
  }

  if (directionButton) {
    directionButton.addEventListener('click', () => {
      root.dir = root.dir === 'rtl' ? 'ltr' : 'rtl';
      localStorage.setItem('vayora-direction', root.dir);
      updateDirectionLabel();
    });
  }

  function updateThemeIcon() {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
    themeButton.title = dark ? 'Switch to light theme' : 'Switch to dark theme';
    themeButton.setAttribute('aria-label', themeButton.title);
  }

  function updateDirectionLabel() {
    if (!directionButton) return;
    directionButton.innerHTML = root.dir === 'rtl' ? 'RTL' : 'LTR';
    directionButton.title = root.dir === 'rtl' ? 'Switch to left-to-right' : 'Switch to right-to-left';
  }

  // Smooth close mobile navbar when anchor clicked
  document.querySelectorAll('.navbar-nav a').forEach(a => a.addEventListener('click', () => {
    const nav = document.getElementById('nav');
    if (nav && nav.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  }));
});
