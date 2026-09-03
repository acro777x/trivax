declare global {
  interface Window {
    __kaviroxLastDraft?: string;
    gtag?: (...args: any[]) => void;
  }
}

export function initContactForm(): void {
  const contactForm = document.getElementById('contact-form') as HTMLFormElement | null;
  const formSuccessAlert = document.getElementById('form-success-alert');
  const emailDraftBtn = document.getElementById('email-draft-btn') as HTMLAnchorElement | null;
  const formResetBtn = document.getElementById('form-reset-btn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('form-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('form-email') as HTMLInputElement | null;
    const subjectInput = document.getElementById('form-subject') as HTMLInputElement | null;
    const messageInput = document.getElementById('form-message') as HTMLTextAreaElement | null;

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

    // Store draft for clipboard copy
    window.__kaviroxLastDraft = `To: info@kavirox.space\nSubject: ${mailtoSubject}\n\n${mailtoBody}`;

    const submitBtn = document.getElementById('form-submit-btn') as HTMLButtonElement | null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#020503;"></i> <span style="color:#020503;font-weight:700;">Compiling Draft...</span>`;
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Contact',
        event_label: subjectVal
      });
    }

    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccessAlert) formSuccessAlert.classList.add('show');

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
      const textToCopy = window.__kaviroxLastDraft || 'To: info@kavirox.space';
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          const origHtml = copyDraftBtn.innerHTML;
          copyDraftBtn.innerHTML = `<i class="fa-solid fa-check" style="color:var(--accent);"></i> Copied to Clipboard!`;
          setTimeout(() => {
            copyDraftBtn.innerHTML = origHtml;
          }, 2500);
        })
        .catch(() => {
          alert('Draft ready for info@kavirox.space');
        });
    });
  }

  if (formResetBtn) {
    formResetBtn.addEventListener('click', () => {
      contactForm.reset();
      contactForm.style.display = '';
      formSuccessAlert?.classList.remove('show');
      const submitBtn = document.getElementById('form-submit-btn') as HTMLButtonElement | null;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane" style="margin-right: 0.4rem;"></i> <span class="btn-text">Send Message</span>`;
      }
    });
  }
}
