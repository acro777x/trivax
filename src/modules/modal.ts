import { ProjectDetail } from '../types/client.js';

export function initProjectModal(): void {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-project-content');
  const modalClose = document.querySelector('.modal-close');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const body = document.body;

  const projectDetailsMap: Record<string, ProjectDetail> = {
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

  function openProjectModal(key: string): void {
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

  function closeProjectModal(): void {
    if (!modal) return;
    modal.classList.remove('open');
    body.style.overflow = '';
  }

  document.querySelectorAll<HTMLElement>('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      if (key) openProjectModal(key);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
}
