import { initPreloader } from './modules/preloader.js';
import { initTheme } from './modules/theme.js';
import { initRouter } from './modules/router.js';
import { initCounters } from './modules/counter.js';
import { initTimelineAndReveals } from './modules/timeline.js';
import { initI18n } from './modules/i18n.js';
import { initSpotlightAndTilt } from './modules/spotlight.js';
import { initProjectFilters } from './modules/projects.js';
import { initGitHubShowcase } from './modules/github.js';
import { initFaqAccordion } from './modules/faq.js';
import { initProjectModal } from './modules/modal.js';
import { initChatbot } from './modules/chatbot.js';
import { initContactForm } from './modules/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 0. Preloader and Hero Typewriter
  initPreloader();

  // 1. Theme Management (Dark / Light)
  initTheme();

  // 2. Clean SPA Router & Scroll Spy
  initRouter();

  // 3. Live Number Counters
  initCounters();

  // 4 & 5. Timeline & Scroll Reveals
  initTimelineAndReveals();

  // 6. Multi-language Translation Engine
  initI18n();

  // 7. Mouse Spotlight & 3D Tilt Card Effects
  initSpotlightAndTilt();

  // 8. Projects Categorization Filter
  initProjectFilters();

  // 9. Live GitHub Repository Index
  initGitHubShowcase();

  // 10. Interactive FAQ Accordion
  initFaqAccordion();

  // 11. Case Study & Research Technical Modals
  initProjectModal();

  // 12. Virtual AI Chatbot Concierge Widget
  initChatbot();

  // 13. Contact & Executive Inquiry Form
  initContactForm();
});
