import { SupportedLanguage, TranslationData } from '../types/client.js';

export function initI18n(): void {
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const langOptions = document.querySelectorAll<HTMLElement>('.lang-option');
  const currentLangText = document.getElementById('current-lang');

  let translationData: Partial<TranslationData> = {};
  const translationEl = document.getElementById('translation-data');
  if (translationEl && translationEl.textContent) {
    try {
      translationData = JSON.parse(translationEl.textContent) as TranslationData;
    } catch (e) {
      console.error('Translation data parse error:', e);
    }
  }

  let activeLang = (localStorage.getItem('kavirox_lang') || 'en') as SupportedLanguage;

  function applyLanguage(lang: SupportedLanguage): void {
    if (!translationData[lang]) return;
    activeLang = lang;
    localStorage.setItem('kavirox_lang', lang);
    if (currentLangText) currentLangText.textContent = lang.toUpperCase();

    const langDict = translationData[lang];
    if (langDict) {
      document.querySelectorAll<HTMLElement>('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (key && langDict[key]) {
          el.innerHTML = langDict[key];
        }
      });
    }

    const formName = document.getElementById('form-name') as HTMLInputElement | null;
    const formEmail = document.getElementById('form-email') as HTMLInputElement | null;
    const formSubject = document.getElementById('form-subject') as HTMLInputElement | null;
    const formMessage = document.getElementById('form-message') as HTMLTextAreaElement | null;
    const chatInput = document.getElementById('chatbot-input') as HTMLInputElement | null;

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
        const chosenLang = (opt.getAttribute('data-lang') || 'en') as SupportedLanguage;
        applyLanguage(chosenLang);
        langDropdown.classList.remove('show');
      });
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });
  }

  applyLanguage(activeLang);
}
