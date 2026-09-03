import { GitHubRepo } from '../types/client.js';

export function initGitHubShowcase(): void {
  const repoGrid = document.getElementById('repo-grid');
  const repoTabs = document.querySelectorAll<HTMLElement>('.repo-tab');
  const repoSearch = document.getElementById('repo-search') as HTMLInputElement | null;
  const repoTotal = document.getElementById('repo-total');
  const repoLanguages = document.getElementById('repo-languages');
  const githubAccounts = ['acro777x', 'Eurt-labs', 'YuganshGoyal2007'];
  let allRepos: GitHubRepo[] = [];
  let currentOwnerFilter = 'all';

  function renderRepos(): void {
    if (!repoGrid) return;
    const query = (repoSearch?.value || '').toLowerCase().trim();

    const filtered = allRepos
      .filter(repo => {
        const matchesOwner =
          currentOwnerFilter === 'all' ||
          repo.accountOwner.toLowerCase() === currentOwnerFilter.toLowerCase();
        const matchesSearch =
          !query ||
          repo.name.toLowerCase().includes(query) ||
          (repo.description && repo.description.toLowerCase().includes(query));
        return matchesOwner && matchesSearch;
      })
      .slice(0, 9);

    if (filtered.length === 0) {
      repoGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No matching repositories found.</div>`;
      return;
    }

    repoGrid.innerHTML = filtered
      .map(
        repo => `
      <article class="repo-card">
        <div class="repo-card-header">
          <a class="repo-card-title" href="${repo.html_url}" target="_blank" rel="noreferrer">
            <i class="fa-solid fa-code-branch" style="font-size: 0.8rem; margin-right: 0.3rem;"></i>${repo.name}
          </a>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">${repo.accountOwner}</span>
        </div>
        <p class="repo-card-desc">${repo.description || 'System software, security framework, or intelligence tool.'}</p>
        <div class="repo-card-footer">
          <span><i class="fa-solid fa-circle" style="font-size: 0.55rem; color: var(--accent); margin-right: 0.25rem;"></i>${repo.language || 'Code'}</span>
          <span><i class="fa-regular fa-star" style="margin-right: 0.25rem;"></i>${repo.stargazers_count}</span>
        </div>
      </article>
    `
      )
      .join('');
  }

  async function fetchGitHubRepos(): Promise<void> {
    try {
      const promises = githubAccounts.map(owner =>
        fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`)
          .then(res => (res.ok ? res.json() : []))
          .then((repos: any[]) => repos.map(r => ({ ...r, accountOwner: owner })))
          .catch(() => [])
      );

      const results = await Promise.all(promises);
      allRepos = results
        .flat()
        .filter(r => !r.fork)
        .sort(
          (a, b) =>
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

      if (repoTotal) repoTotal.textContent = allRepos.length.toString();

      const langs = new Set(allRepos.map(r => r.language).filter(Boolean));
      if (repoLanguages) repoLanguages.textContent = langs.size.toString();

      renderRepos();
    } catch (e) {
      if (repoGrid) {
        repoGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-secondary);">
            <i class="fa-brands fa-github" style="font-size: 2rem; color: var(--accent); margin-bottom: 0.5rem; display:block;"></i>
            Explore repositories on <a href="https://github.com/acro777x" target="_blank" style="color: var(--accent);">GitHub @acro777x</a>
          </div>
        `;
      }
    }
  }

  repoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      repoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentOwnerFilter = tab.getAttribute('data-owner-filter') || 'all';
      renderRepos();
    });
  });

  if (repoSearch) {
    repoSearch.addEventListener('input', renderRepos);
  }

  fetchGitHubRepos();
}
