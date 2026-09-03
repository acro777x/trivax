export function initTheme(): void {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('kavirox_theme') || 'dark';

  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      localStorage.setItem('kavirox_theme', isLight ? 'light' : 'dark');
    });
  }
}
