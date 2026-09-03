let typewriterStarted = false;

export function initHeroTypewriter(): void {
  if (typewriterStarted) return;
  typewriterStarted = true;

  const heroTarget = document.getElementById('hero-typing-target');
  if (!heroTarget) return;
  const targetEl: HTMLElement = heroTarget;

  const phrases = [
    'Intelligent. Impactful.',
    'Autonomous AI Systems.',
    'Offensive Cyber Defense.',
    'High-Velocity Web & Apps.',
    'Creative Media & Video Production.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  targetEl.textContent = '';

  function typeLoop(): void {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      targetEl.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      targetEl.textContent = currentPhrase.substring(0, charIndex);
    }

    let typeSpeed = isDeleting ? 25 : 55;

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2200; // Pause when word is completely typed
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 350; // Pause before typing next word
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

export function initPreloader(): void {
  const preloader = document.getElementById('site-preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  const preloaderMsg = document.getElementById('preloader-msg');
  const preloaderNum = document.getElementById('preloader-num');

  if (preloader && preloaderFill) {
    let p = 0;
    const msgs = [
      'INITIALIZING KAVIROX CORE...',
      'LOADING NEURAL RUNTIME...',
      'VERIFYING SECURITY SHIELDS...',
      'SYSTEM OPERATIONAL & READY.'
    ];

    const pTimer = window.setInterval(() => {
      p += 2;
      if (p <= 100) {
        preloaderFill.style.width = `${p}%`;
        if (preloaderNum) preloaderNum.textContent = `${p}%`;

        if (p < 35 && preloaderMsg) preloaderMsg.textContent = msgs[0];
        else if (p < 70 && preloaderMsg) preloaderMsg.textContent = msgs[1];
        else if (p < 98 && preloaderMsg) preloaderMsg.textContent = msgs[2];
        else if (p >= 98 && preloaderMsg) preloaderMsg.textContent = msgs[3];
      } else {
        clearInterval(pTimer);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          initHeroTypewriter();
          setTimeout(() => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
          }, 450);
        }, 150);
      }
    }, 14);

    // Hard fallback safety
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        initHeroTypewriter();
      }
    }, 1400);
  } else {
    initHeroTypewriter();
  }
}
