export function initCounters(): void {
  const counterElements = document.querySelectorAll<HTMLElement>('.stat-counter');
  let countersStarted = false;

  function animateCounters(): void {
    if (countersStarted) return;
    countersStarted = true;

    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count') || '0', 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(currentTime: number): void {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // EaseOutCubic: 1 - (1 - progress)^3
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);

        counter.textContent = `${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const heroMetrics = document.getElementById('hero-metrics');
  if (heroMetrics) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterObserver.observe(heroMetrics);
  }
}
