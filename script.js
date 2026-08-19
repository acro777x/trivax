/* ═══════════════════════════════════════════════════════
   KAVIROX (kavirox.space) — Main Script
   Live Number Counter, Scroll-Reveal Text Animations,
   Active Nav Highlighting on Scroll, Battle Log Observer,
   Multi-language, Live GitHub, Chatbot, 3D Card Tilt & Float
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ── 0. High-Tech Preloader Controller (0 to 100% Counting) ── */
  const preloader = document.getElementById('site-preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  const preloaderMsg = document.getElementById('preloader-msg');
  const preloaderNum = document.getElementById('preloader-num');

  let typewriterStarted = false;

  function initHeroTypewriter() {
    if (typewriterStarted) return;
    typewriterStarted = true;

    const heroTarget = document.getElementById('hero-typing-target');
    if (!heroTarget) return;

    const phrases = [
      "Intelligent. Impactful.",
      "Autonomous AI Systems.",
      "Offensive Cyber Defense.",
      "High-Velocity Web & Apps.",
      "Creative Media & Video Production."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    heroTarget.textContent = "";

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        heroTarget.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        heroTarget.textContent = currentPhrase.substring(0, charIndex);
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

    // Start typing immediately
    typeLoop();
  }

  if (preloader && preloaderFill) {
    let p = 0;
    const msgs = [
      'INITIALIZING KAVIROX CORE...',
      'LOADING NEURAL RUNTIME...',
      'VERIFYING SECURITY SHIELDS...',
      'SYSTEM OPERATIONAL & READY.'
    ];

    const pTimer = setInterval(() => {
      p += 2;
      if (p <= 100) {
        preloaderFill.style.width = p + '%';
        if (preloaderNum) preloaderNum.textContent = p + '%';

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

  /* ── 1. Theme Switcher (Dark / Light Mode) ── */
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


  /* ── 2. Header Top-Bar Active Navigation on Scroll ── */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateHeaderOnScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Header Background Blur Toggle
    if (scrollPosition > 25) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Dynamic Active Nav Link on Scroll
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 140;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');

      if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${secId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }


  /* ── 3. Live Number Counting Animation (Easing CountUp) ── */
  const counterElements = document.querySelectorAll('.stat-counter');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'), 10) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // EaseOutCubic: 1 - (1 - progress)^3
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeProgress * target);

        counter.textContent = currentVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
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


  /* ── 4. Battle Log & Wins Scroll Entrance Animations ── */
  const timelineItems = document.querySelectorAll('.timeline-item');
  
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


  /* ── 5. General Scroll-Reveal Text & Section Animations ── */
  const revealElements = document.querySelectorAll('.scroll-reveal, .section-title, .section-desc, .section-tag');

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


  /* ── 6. Multi-Language Translation System ── */
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const langOptions = document.querySelectorAll('.lang-option');
  const currentLangText = document.getElementById('current-lang');
  
  let translationData = {};
  const translationEl = document.getElementById('translation-data');
  if (translationEl) {
    try {
      translationData = JSON.parse(translationEl.textContent);
    } catch (e) {
      console.error('Translation data parse error:', e);
    }
  }

  let activeLang = localStorage.getItem('kavirox_lang') || 'en';

  function applyLanguage(lang) {
    if (!translationData[lang]) return;
    activeLang = lang;
    localStorage.setItem('kavirox_lang', lang);
    if (currentLangText) currentLangText.textContent = lang.toUpperCase();

    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translationData[lang] && translationData[lang][key]) {
        el.innerHTML = translationData[lang][key];
      }
    });

    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formSubject = document.getElementById('form-subject');
    const formMessage = document.getElementById('form-message');
    const chatInput = document.getElementById('chatbot-input');

    if (formName) formName.placeholder = lang === 'es' ? 'Juan Pérez' : (lang === 'hi' ? 'आपका नाम' : 'John Doe');
    if (formEmail) formEmail.placeholder = 'john@example.com';
    if (formSubject) formSubject.placeholder = lang === 'es' ? 'Discusión de proyecto' : (lang === 'hi' ? 'प्रोजेक्ट का विषय' : 'Project discussion');
    if (formMessage) formMessage.placeholder = lang === 'es' ? 'Cuéntanos sobre tu proyecto...' : (lang === 'hi' ? 'अपने प्रोजेक्ट के बारे में बताएं...' : 'Tell us about your project...');
    if (chatInput) chatInput.placeholder = lang === 'es' ? 'Escribe un mensaje...' : (lang === 'hi' ? 'संदेश लिखें...' : 'Type a message...');
  }

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        applyLanguage(opt.getAttribute('data-lang'));
        langDropdown.classList.remove('show');
      });
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });
  }

  applyLanguage(activeLang);


  /* ── 7. 21st.dev Mouse Spotlight & 3D Tilt Card Effects ── */
  const spotlightCards = document.querySelectorAll('.service-card, .project-card, .pub-card-detailed, .process-step, .why-us-card, .addon-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
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


  /* ── 8. Projects Categorization Filter ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });


  /* ── 9. Live GitHub Repository Showcase ── */
  const repoGrid = document.getElementById('repo-grid');
  const repoTabs = document.querySelectorAll('.repo-tab');
  const repoSearch = document.getElementById('repo-search');
  const repoTotal = document.getElementById('repo-total');
  const repoLanguages = document.getElementById('repo-languages');
  const githubAccounts = ['acro777x', 'Eurt-labs', 'YuganshGoyal2007'];
  let allRepos = [];
  let currentOwnerFilter = 'all';

  async function fetchGitHubRepos() {
    try {
      const promises = githubAccounts.map(owner =>
        fetch(`https://api.github.com/users/${owner}/repos?per_page=100&sort=updated`)
          .then(res => res.ok ? res.json() : [])
          .then(repos => repos.map(r => ({ ...r, accountOwner: owner })))
          .catch(() => [])
      );

      const results = await Promise.all(promises);
      allRepos = results.flat().filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));

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

  function renderRepos() {
    if (!repoGrid) return;
    const query = (repoSearch?.value || '').toLowerCase().trim();

    const filtered = allRepos.filter(repo => {
      const matchesOwner = currentOwnerFilter === 'all' || repo.accountOwner.toLowerCase() === currentOwnerFilter.toLowerCase();
      const matchesSearch = !query || repo.name.toLowerCase().includes(query) || (repo.description && repo.description.toLowerCase().includes(query));
      return matchesOwner && matchesSearch;
    }).slice(0, 9);

    if (filtered.length === 0) {
      repoGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">No matching repositories found.</div>`;
      return;
    }

    repoGrid.innerHTML = filtered.map(repo => `
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
    `).join('');
  }

  repoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      repoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentOwnerFilter = tab.getAttribute('data-owner-filter');
      renderRepos();
    });
  });

  if (repoSearch) {
    repoSearch.addEventListener('input', renderRepos);
  }

  fetchGitHubRepos();


  /* ── 10. Interactive FAQ Accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });


  /* ── 11. Project & Research Details Modal ── */
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-project-content');
  const modalClose = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');

  const projectDetailsMap = {
    acromap: {
      title: 'AcroMap — 32-Phase Automated Penetration Testing Framework',
      tag: 'Offensive Security / VAPT',
      image: 'assets/project_acromap.jpg',
      desc: 'Automated Reconnaissance and Vulnerability Assessment engine executing across 32 modular phases with multi-threading and live exploitation path mapping.',
      tech: ['Python', 'Bash', 'Nmap', 'Nuclei', 'Go', 'AsyncIO'],
      url: 'https://github.com/acro777x/acromap'
    },
    aidfir: {
      title: 'AI-DFIR — AI-Assisted Digital Forensics & Threat Hunting',
      tag: 'AI / Threat Intelligence',
      image: 'assets/project_aidfir.jpg',
      desc: 'LLM multi-agent framework analyzing security event logs, extracting malicious IoCs, and constructing automated incident response timelines in real time.',
      tech: ['Python', 'LangChain', 'FastAPI', 'Elasticsearch', 'Threat Intel'],
      url: 'https://github.com/Eurt-labs/AI-DFIR'
    },
    rakshak_setu: {
      title: 'Rakshak Setu (रक्षक सेतु) — On-Device Telecom Scam Interceptor',
      tag: 'Edge AI / Telecom Cybersecurity',
      image: 'assets/project_rakshak_setu.jpg',
      desc: 'A privacy-first, 100% on-device Android system that intercepts and analyzes scam call scripts in Hindi/Hinglish using quantized Whisper ASR and MiniLM semantic embeddings. Features Golden-Hour guided recovery, 1930 helpline auto-dial, and RBI-compliant bank freeze evidence generation.',
      tech: ['Kotlin', 'Android', 'Whisper ASR (int8)', 'MiniLM Embeddings', 'A4 Voting', 'Edge AI', 'NCRP Integration'],
      url: 'https://github.com/acro777x/Rakshak-Setu'
    },
    studyhub: {
      title: 'StudyHub AI — Unified Student Learning & Academic Productivity Dashboard',
      tag: 'AI EdTech / SaaS Platform',
      image: 'assets/project_studyhub.jpg',
      desc: 'A comprehensive modern student dashboard featuring real-time assignment submission tracking, intelligent study planner timeline, AI tutor assistant, and GPA analytics charts.',
      tech: ['React / Next.js', 'FastAPI', 'TailwindCSS', 'AI Tutor', 'Analytics Charts', 'Study Planner'],
      url: 'https://github.com/acro777x'
    },
    studyhub_legacy: {
      title: 'Tkinter QR Attendance System',
      tag: 'Application Engineering',
      image: 'assets/project_qr_attendance.jpg',
      desc: 'A standalone desktop attendance management system featuring high-speed OpenCV computer-vision QR parsing, student database management, and spreadsheet report export.',
      tech: ['Python', 'Tkinter', 'OpenCV', 'SQLite', 'CSV Engine'],
      url: 'https://github.com/YuganshGoyal2007/Tkinter'
    },
    acrostrike: {
      title: 'AcroStrike — 2D-Phase Zero-Dependency VAPT Engine',
      tag: 'Vulnerability Assessment',
      image: 'assets/project_acrostrike.jpg',
      desc: 'Engineered entirely in pure native socket code to perform lightning-fast vulnerability scans without needing third-party dependencies or Python runtimes.',
      tech: ['C/C++', 'Python', 'Raw Sockets', 'Multi-threading', 'SYN Sweep'],
      url: 'https://github.com/acro777x/AcroStrike'
    },
    ghostchat: {
      title: 'Ghost Chat — Offline Captive Portal Mesh',
      tag: 'Hardware & IoT Security',
      image: 'assets/project_ghostchat.jpg',
      desc: 'An off-grid communication terminal hosted locally on an ESP32 microcontroller, creating an encrypted captive portal for instant peer-to-peer messaging.',
      tech: ['ESP32', 'C++', 'Embedded WebSockets', 'AES-256', 'Captive Portal'],
      url: 'https://github.com/acro777x/Ghost_Chat'
    },
    resumebuilder: {
      title: 'COVID Data Exploration Pipeline',
      tag: 'Data Engineering & Analytics',
      image: 'assets/project_covid_analytics.jpg',
      desc: 'Data science exploration pipeline engineered for massive patient health CSV datasets, epidemiological regression curves, and spatial infection cluster forecasting.',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'ETL Pipeline'],
      url: 'https://github.com/YuganshGoyal2007/covid-project'
    },
    acm_paper: {
      title: 'Multimodal Emotion & Trait Recognition (ACM MM 2025)',
      tag: 'Peer-Reviewed AI Research',
      image: 'assets/research_acm.jpg',
      desc: 'Hierarchical four-agent neural orchestration combining vision, audio spectrograms, and textual transcripts with LLaMA-3.2-3B, Patronus AI automated bias detection, and RAG retrieval pipelines.',
      tech: ['LLaMA-3.2', 'Patronus AI', 'PyTorch', 'RAG Retrieval', 'Multimodal AI'],
      url: 'https://github.com/Eurt-labs/AI-DFIR'
    },
    acl_paper: {
      title: 'Analogy-ANGLE II Workshop (ACL 2025)',
      tag: 'NLP & Language Model Benchmarking',
      image: 'assets/research_acl.jpg',
      desc: 'Rigorous cross-architecture benchmark analyzing transformer attention dynamics, zero-shot analogical reasoning bounds, and consistency patterns across state-of-the-art LLMs.',
      tech: ['Transformers', 'Attention Analysis', 'NLP Evaluation', 'Zero-Shot Bounds'],
      url: 'https://github.com/acro777x'
    }
  };

  function openProjectModal(key) {
    const data = projectDetailsMap[key];
    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.2rem; border-radius: var(--radius-lg); overflow: hidden; max-height: 300px; background: var(--bg-surface); border: 1px solid var(--border-medium);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <span class="section-tag" style="margin-bottom: 0.6rem;">${data.tag}</span>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-primary); margin-bottom: 0.8rem;">${data.title}</h3>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.2rem;">${data.desc}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
        ${data.tech.map(t => `<span style="font-family: var(--font-mono); font-size: 0.78rem; background: var(--accent-subtle); color: var(--accent); padding: 0.2rem 0.65rem; border-radius: var(--radius-full); border: 1px solid rgba(82, 242, 177, 0.2);">${t}</span>`).join('')}
      </div>
      <a href="${data.url}" target="_blank" class="btn btn-primary" style="display: inline-flex;">
        <i class="fa-brands fa-github"></i> Open Source Repository / Artifacts
      </a>
    `;

    modal.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('open');
    body.style.overflow = '';
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);


  /* ── 12. Interactive AI Chatbot Widget (Secure Serverless Architecture & OWASP LLM Guardrails) ── */
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotBox = document.getElementById('chatbot-box');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send-btn');
  const chatbotMessages = document.getElementById('chatbot-messages');

  let chatHistory = [];
  let isAiGenerating = false;

  const domainFallbackKnowledge = {
    services: "KAVIROX delivers enterprise digital solutions across 6 core pillars:\n• AI/ML Engineering & Multi-Agent Systems (RAG, LLMs, Computer Vision)\n• Cybersecurity & Offensive VAPT (AcroStrike, AcroMap, Smart Contract Audits)\n• Creative Media & Commercial Video Production (VFX, 3D Cinematography)\n• Full-Stack Cloud & Mobile Architecture (React, Python, Node, K8s)\n• Technical SEO & Automated Growth Engineering\n• 24/7 Dedicated Operations & Retainers",
    pricing: "Our engagements are milestone-based or structured as dedicated monthly engineering retainers. Contact our lead architects at info@kavirox.space or +91 95484 25711 for a tailored scope of work.",
    security: "Security is built into our core foundation: Zero-Trust architecture, automated penetration testing (AcroMap & AcroStrike), DFIR investigation workflows, and hardened API security.",
    contact: "You can transmit your inquiry directly to our team via:\n• Email: info@kavirox.space\n• Direct / WhatsApp: +91 95484 25711\n• Transmission Form: https://kavirox.space/#contact",
    ai: "We develop state-of-the-art neural architectures, multimodal RAG retrieval systems, autonomous agent workflows, and specialized language models with academic research published at ACM MM and ACL.",
    projects: "Our notable open-source and proprietary deployments include AcroMap, AcroStrike, AI DFIR Copilot, GhostChat (E2EE ephemeral messaging), Rakshak Setu, StudyHub, and AI Resume Architect.",
    team: "KAVIROX is driven by Ashish Kumar (Lead Architect & Cybersecurity Specialist), our Creative Media Producer, and our specialized full-stack & cloud engineering team.",
    default: "I am the KAVIROX AI Assistant. I can guide you through our AI/ML engineering capabilities, cybersecurity audits, creative media production, flagship portfolio projects, or help you connect with our team at info@kavirox.space!"
  };

  function getDomainFallbackReply(userText) {
    const text = userText.toLowerCase();
    if (text.includes('service') || text.includes('what do you do') || text.includes('web') || text.includes('app') || text.includes('media') || text.includes('video')) return domainFallbackKnowledge.services;
    if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('quote') || text.includes('hire')) return domainFallbackKnowledge.pricing;
    if (text.includes('security') || text.includes('pen test') || text.includes('vapt') || text.includes('hack') || text.includes('audit') || text.includes('dfir')) return domainFallbackKnowledge.security;
    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('call') || text.includes('reach') || text.includes('talk')) return domainFallbackKnowledge.contact;
    if (text.includes('ai') || text.includes('ml') || text.includes('model') || text.includes('rag') || text.includes('llm') || text.includes('agent')) return domainFallbackKnowledge.ai;
    if (text.includes('project') || text.includes('acromap') || text.includes('acrostrike') || text.includes('ghostchat') || text.includes('rakshak') || text.includes('studyhub')) return domainFallbackKnowledge.projects;
    if (text.includes('team') || text.includes('ashish') || text.includes('founder') || text.includes('who are you') || text.includes('about')) return domainFallbackKnowledge.team;
    return domainFallbackKnowledge.default;
  }

  function appendChatMessage(text, sender) {
    if (!chatbotMessages) return;
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    // OWASP LLM02: Safe textContent insertion prevents XSS / HTML injection
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return msg;
  }

  function showTypingIndicator() {
    if (!chatbotMessages) return null;
    const indicator = document.createElement('div');
    indicator.className = 'chat-message bot chat-typing-indicator';
    indicator.id = 'chat-typing-indicator';
    indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
  }

  async function handleUserSend() {
    if (isAiGenerating) return;
    const rawText = chatbotInput?.value || '';
    const text = rawText.trim();
    if (!text) return;

    // OWASP LLM04: Input validation & length restriction (Max 500 chars)
    if (text.length > 500) {
      appendChatMessage("Message exceeds 500 characters. Please condense your question.", "bot");
      return;
    }

    appendChatMessage(text, 'user');
    if (chatbotInput) chatbotInput.value = '';
    isAiGenerating = true;

    showTypingIndicator();

    try {
      // OWASP LLM06: Security Proxy - All AI requests go to serverless backend /api/chat
      // The API key is stored strictly on the server and is NEVER exposed to the client browser.
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(-4)
        })
      });

      removeTypingIndicator();

      if (response.ok) {
        const data = await response.json();
        const reply = data.reply || getDomainFallbackReply(text);
        appendChatMessage(reply, 'bot');
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: reply });
      } else {
        const fallbackReply = getDomainFallbackReply(text);
        appendChatMessage(fallbackReply, 'bot');
      }
    } catch (err) {
      removeTypingIndicator();
      const fallbackReply = getDomainFallbackReply(text);
      appendChatMessage(fallbackReply, 'bot');
    } finally {
      isAiGenerating = false;
    }
  }

  if (chatbotToggle && chatbotBox) {
    chatbotToggle.addEventListener('click', () => {
      chatbotBox.classList.toggle('open');
      if (chatbotBox.classList.contains('open')) {
        setTimeout(() => chatbotInput?.focus(), 150);
      }
    });

    chatbotClose?.addEventListener('click', () => {
      chatbotBox.classList.remove('open');
    });

    chatbotSendBtn?.addEventListener('click', handleUserSend);
    chatbotInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUserSend();
      }
    });
  }


  /* ── 13. Contact Form Submission & Email Draft Pipeline ── */
  const contactForm = document.getElementById('contact-form');
  const formSuccessAlert = document.getElementById('form-success-alert');
  const emailDraftBtn = document.getElementById('email-draft-btn');
  const formResetBtn = document.getElementById('form-reset-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        if (!input) return;
        const group = input.closest('.form-group');
        if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
          group?.classList.add('has-error');
          isValid = false;
        } else {
          group?.classList.remove('has-error');
        }
      });

      if (!isValid) return;

      const nameVal = nameInput?.value.trim() || '';
      const emailVal = emailInput?.value.trim() || '';
      const subjectVal = subjectInput?.value.trim() || 'General Inquiry';
      const messageVal = messageInput?.value.trim() || '';

      // Professional Executive Business Inquiry Format
      const mailtoSubject = `[Inquiry: ${subjectVal}] - From ${nameVal}`;
      const mailtoBody = `Dear KAVIROX Team,

I am writing to initiate an inquiry regarding: ${subjectVal}.

--------------------------------------------------
1. CONTACT INFORMATION
--------------------------------------------------
• Name: ${nameVal}
• Email: ${emailVal}
• Inquiry Subject: ${subjectVal}
• Submission Source: https://kavirox.space

--------------------------------------------------
2. PROJECT SCOPE & REQUIREMENTS
--------------------------------------------------
${messageVal}

--------------------------------------------------
3. NEXT STEPS
--------------------------------------------------
Please review the requirements above and let me know your availability for a technical consultation or preliminary scoping call. You may reach me directly at ${emailVal}.

Best regards,
${nameVal}
${emailVal}`;

      const mailtoUrl = `mailto:info@kavirox.space?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;

      if (emailDraftBtn) {
        emailDraftBtn.setAttribute('href', mailtoUrl);
      }

      // Store current draft for copy button
      window.__kaviroxLastDraft = `To: info@kavirox.space\nSubject: ${mailtoSubject}\n\n${mailtoBody}`;

      const submitBtn = document.getElementById('form-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#020503;"></i> <span style="color:#020503;font-weight:700;">Compiling Draft...</span>`;
      }

      setTimeout(() => {
        if (contactForm) contactForm.style.display = 'none';
        if (formSuccessAlert) formSuccessAlert.classList.add('show');
        
        // Attempt to trigger mail client directly
        try {
          window.location.href = mailtoUrl;
        } catch (err) {
          console.warn('Mail client redirect handled gracefully');
        }
      }, 700);
    });

    const copyDraftBtn = document.getElementById('copy-draft-btn');
    if (copyDraftBtn) {
      copyDraftBtn.addEventListener('click', () => {
        const textToCopy = window.__kaviroxLastDraft || "To: info@kavirox.space";
        navigator.clipboard.writeText(textToCopy).then(() => {
          const origHtml = copyDraftBtn.innerHTML;
          copyDraftBtn.innerHTML = `<i class="fa-solid fa-check" style="color:var(--accent);"></i> Copied to Clipboard!`;
          setTimeout(() => {
            copyDraftBtn.innerHTML = origHtml;
          }, 2500);
        }).catch(() => {
          alert('Draft ready for info@kavirox.space');
        });
      });
    }

    if (formResetBtn) {
      formResetBtn.addEventListener('click', () => {
        contactForm.reset();
        contactForm.style.display = '';
        formSuccessAlert.classList.remove('show');
        const submitBtn = document.getElementById('form-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane" style="margin-right: 0.4rem;"></i> <span class="btn-text">Send Message</span>`;
        }
      });
    }
  }

});
