declare const gtag: ((...args: any[]) => void) | undefined;

export function initRouter(): void {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');

  const sectionRouteMap: Record<string, string> = {
    '/': 'home',
    '/home': 'home',
    '/services': 'services',
    '/about': 'about',
    '/projects': 'projects',
    '/portfolio': 'projects',
    '/research': 'research',
    '/process': 'process',
    '/why-us': 'why-us',
    '/contact': 'contact'
  };

  const idToRouteMap: Record<string, string> = {
    'home': '/home',
    'services': '/services',
    'about': '/about',
    'projects': '/projects',
    'research': '/research',
    'process': '/process',
    'why-us': '/why-us',
    'contact': '/contact'
  };

  let isProgrammaticScroll = false;
  let programmaticScrollTimer: ReturnType<typeof setTimeout> | null = null;

  function scrollToSection(sectionId: string, updateUrl = true, pushHistory = true): void {
    const target = document.getElementById(sectionId);
    if (!target) return;

    isProgrammaticScroll = true;
    if (programmaticScrollTimer) clearTimeout(programmaticScrollTimer);

    const navHeight = header?.offsetHeight || 75;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - (navHeight - 2);

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });

    if (updateUrl) {
      const cleanPath = idToRouteMap[sectionId] || `/${sectionId}`;
      if (pushHistory) {
        history.pushState({ section: sectionId }, '', cleanPath);
      } else {
        history.replaceState({ section: sectionId }, '', cleanPath);
      }
      if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
          page_path: cleanPath,
          page_title: document.title + ' - ' + (sectionId.charAt(0).toUpperCase() + sectionId.slice(1))
        });
      }
    }

    programmaticScrollTimer = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 850);
  }

  // Intercept internal navigation clicks
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    let targetSectionId: string | null = null;
    if (href.startsWith('#')) {
      targetSectionId = href.substring(1);
    } else if (href.startsWith('/') && !href.startsWith('//') && !href.includes('.') && !href.startsWith('/api')) {
      const cleanHref = href.replace(/\/$/, '') || '/';
      targetSectionId = sectionRouteMap[cleanHref] || null;
    }

    if (targetSectionId && document.getElementById(targetSectionId)) {
      e.preventDefault();
      scrollToSection(targetSectionId, true, true);
      if (mobileToggle && mainNav) {
        mobileToggle.classList.remove('active');
        mainNav.classList.remove('open');
      }
    }
  });

  // Handle Browser Back / Forward navigation
  window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const sectionId = sectionRouteMap[currentPath] || (window.location.hash ? window.location.hash.substring(1) : 'home');
    if (sectionId) {
      scrollToSection(sectionId, false, false);
    }
  });

  // Scroll Spy: dynamically update active link & clean URL as user scrolls
  let scrollUrlDebounce: ReturnType<typeof setTimeout> | null = null;
  function updateHeaderOnScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Header Background Blur Toggle
    if (scrollPosition > 25) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (isProgrammaticScroll) return;

    // Dynamic Active Nav Link on Scroll
    let currentActiveSectionId = 'home';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 140;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');

      if (secId && scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        currentActiveSectionId = secId;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkSectionId = href.startsWith('#')
        ? href.substring(1)
        : sectionRouteMap[href.replace(/\/$/, '') || '/'];

      if (linkSectionId === currentActiveSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update URL bar cleanly without hash on scroll (debounced)
    if (scrollUrlDebounce) clearTimeout(scrollUrlDebounce);
    scrollUrlDebounce = setTimeout(() => {
      if (isProgrammaticScroll) return;
      const targetRoute = idToRouteMap[currentActiveSectionId] || '/home';
      const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
      if (currentPath !== targetRoute && !window.location.hash) {
        history.replaceState({ section: currentActiveSectionId }, '', targetRoute);
      }
    }, 200);
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
  }

  // Initial Load Handler
  function handleInitialRoute(): void {
    if (window.location.hash) {
      const hashId = window.location.hash.substring(1);
      if (document.getElementById(hashId)) {
        const cleanPath = idToRouteMap[hashId] || `/${hashId}`;
        history.replaceState({ section: hashId }, '', cleanPath);
        setTimeout(() => scrollToSection(hashId, false, false), 350);
        return;
      }
    }

    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    const sectionId = sectionRouteMap[currentPath];
    if (sectionId && sectionId !== 'home') {
      setTimeout(() => scrollToSection(sectionId, false, false), 350);
    }
  }

  handleInitialRoute();
}
