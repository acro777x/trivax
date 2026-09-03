export function initSpotlightAndTilt(): void {
  const spotlightCards = document.querySelectorAll<HTMLElement>(
    '.service-card, .project-card, .pub-card-detailed, .process-step, .why-us-card, .addon-card'
  );

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (card.classList.contains('project-card') || card.classList.contains('pub-card-detailed')) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-10px) scale3d(1.02, 1.02, 1.02)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('project-card') || card.classList.contains('pub-card-detailed')) {
        card.style.transform = '';
      }
    });
  });
}
