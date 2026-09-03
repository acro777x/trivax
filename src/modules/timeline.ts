export function initTimelineAndReveals(): void {
  // Timeline Items
  const timelineItems = document.querySelectorAll<HTMLElement>('.timeline-item');
  if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, idx * 120);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // Fallback if already in view
    setTimeout(() => {
      timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          item.classList.add('revealed');
        }
      });
    }, 600);
  }

  // General Scroll-Reveal Elements
  const revealElements = document.querySelectorAll<HTMLElement>('.scroll-reveal, .section-title, .section-desc, .section-tag');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
  });
}
