export interface ProductScreen {
  file: string;
  caption: string;
}

export interface ProductFeatureGroup {
  title: string;
  description: string;
}

export interface ProductItem {
  slug: string;
  name: string;
  category: string;
  status: string;
  statusType: 'built' | 'pilot' | 'dev' | 'prototype' | 'spec';
  oneLine: string;
  problem: string;
  whatItDoes: string;
  featureGroups: ProductFeatureGroup[];
  screens: ProductScreen[];
  mockType?: 'chat' | 'fitness' | 'fashion' | 'calendar' | 'table';
  tech: string[];
  attribution?: string;
  caveat?: string;
  externalUrl?: string;
  notIncludedYet: string[];
  isFeatured?: boolean;
  stageImage?: string;
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    slug: 'rakshak-setu',
    name: 'Rakshak Setu',
    category: 'Mobile Cybersecurity',
    status: 'Prototype with working modules',
    statusType: 'prototype',
    isFeatured: true,
    stageImage: '/projects/rakshak-setu/stage_composed_16_9.webp',
    oneLine: 'An on-device voice shield that warns you during suspicious calls, built to counter AI voice cloning and phone-scam impersonation.',
    problem: 'Scammers use cloned voices and pressure scripts (fake officials, "digital arrest" threats, family emergencies, bank and parcel fraud). People get little help in the moment of the call.',
    whatItDoes: 'Listens for scam indicators locally on the phone, shows a live threat HUD during a call, produces an evidence record you can use for reporting, scans links and QR codes, and offers a path to report to the national cyber-crime portal. Designed so raw call audio is processed in memory and not stored.',
    featureGroups: [
      {
        title: 'Live call protection',
        description: 'Threat HUD, safe-call indicator, and system heads-up alerts during active calls.',
      },
      {
        title: 'Evidence and reports',
        description: 'Forensic evidence dossier and automated audit records for cyber reporting.',
      },
      {
        title: 'Threat scanners',
        description: 'Real-time threat scanner for suspicious URLs and malicious QR codes.',
      },
      {
        title: 'Reporting assistance',
        description: 'National Cyber Crime 1930 / NCRP co-pilot to streamline incident escalation.',
      },
      {
        title: 'Simulation lab',
        description: 'Voice-clone simulation environment for training, testing, and live verification.',
      },
    ],
    screens: [
      { file: '03_defense_dashboard.webp', caption: 'Defense dashboard and risk monitoring' },
      { file: '02_forensic_evidence_dossier.webp', caption: 'Forensic evidence dossier' },
      { file: '04_forensic_reports_audit.webp', caption: 'Forensic reports audit trail' },
      { file: '08_url_qr_threat_scanner.webp', caption: 'URL and QR code threat scanner' },
      { file: '06_ncrp_1930_copilot.webp', caption: 'National Cyber Crime 1930 reporting co-pilot' },
      { file: '09_voice_clone_lab_simulation.webp', caption: 'Voice clone simulation lab' },
      { file: '10_system_heads_up_notification.webp', caption: 'System heads-up notification' },
    ],
    tech: ['Android (Kotlin)', 'On-device ML models', 'Speech recognition', 'Local processing'],
    attribution: 'Built by Team Forge Labs, Gautam Buddha University. Smart India Hackathon 2026 project.',
    caveat: 'Call-audio access varies by Android version and device.',
    notIncludedYet: [
      'Universal call-audio support across all Android versions',
      'Automated legal filing admissibility',
      'Cloud voice synchronization (intentionally designed local-only)',
    ],
  },
  {
    slug: 'gbu-one',
    name: 'GBU One',
    category: 'University Companion',
    status: 'Built and device-tested',
    statusType: 'built',
    isFeatured: true,
    stageImage: '/projects/gbu-one/stage_composed_16_9.webp',
    oneLine: 'An offline-first student companion for Gautam Buddha University, with a separate admin console for publishing.',
    problem: 'Timetables, notices, exam schedules and previous-year papers are scattered across portals and chat groups; access is poor when the network is.',
    whatItDoes: 'Provides an offline-cached campus hub for timetables, attendance battery, previous year papers with contributor rankings, and official notices, alongside a secure PIN-gated admin console.',
    featureGroups: [
      {
        title: 'Student Onboarding',
        description: 'Personalized onboarding filtered by school, programme, semester, and section.',
      },
      {
        title: 'Smart Timetable',
        description: 'Dashboard with next class countdown, room-shift badges, and local alarms.',
      },
      {
        title: 'Notices & Datesheet',
        description: 'Instant notice search, offline PDF caching, and academic calendar countdowns.',
      },
      {
        title: 'PYQ Library',
        description: 'Previous-year question repository with offline access and contributor rankings.',
      },
      {
        title: 'Attendance Battery',
        description: 'Local attendance tracker with threshold warnings and guest mode support.',
      },
      {
        title: 'Admin Console',
        description: 'PIN-gated separate app to publish notices, moderate uploads, and push app updates.',
      },
    ],
    screens: [
      { file: 'screen_tecno_student_app.webp', caption: 'Student app home dashboard and next class view' },
      { file: 'screen_tecno_events_fixed.webp', caption: 'Campus events and gallery' },
      { file: 'screen_verification_pyq.webp', caption: 'PYQ library and verification' },
      { file: 'screen_tecno_admin_lock.webp', caption: 'PIN-gated admin console security lock' },
      { file: 'screen_tecno_admin_gallery_tools.webp', caption: 'Admin gallery publishing tools' },
      { file: 'screen_admin_auto_update.webp', caption: 'Admin broadcast and app auto-update console' },
    ],
    tech: ['Expo / React Native', 'TypeScript', 'SQLite offline cache', 'Supabase backend', 'Push notifications'],
    caveat: 'Unofficial companion app; not endorsed by Gautam Buddha University.',
    notIncludedYet: [
      'Official registrar database integration',
      'Automated university fee payment gateway',
      'Cross-campus portal auto-sync',
    ],
  },
  {
    slug: 'gbu-sdms',
    name: 'GBU SDMS',
    category: 'Institutional Records',
    status: 'Deployed & Active',
    statusType: 'built',
    isFeatured: true,
    stageImage: '/projects/gbu-sdms/01_erp_dashboard.png',
    oneLine: 'A role-based platform for student records, attendance and academic administration.',
    problem: 'Collegiate academic departments manage student records, session attendance, and faculty loads across siloed paperwork.',
    whatItDoes: 'A unified role-gated platform where administrators, chairpersons, coordinators, faculty, and students each access verified academic records, session-locked attendance, and timetable rosters.',
    featureGroups: [
      {
        title: 'Role-Based Access',
        description: 'Five distinct permission levels: Administrator, Chairperson, Coordinator, Faculty, Student.',
      },
      {
        title: 'Session Attendance',
        description: 'Digital attendance logging with timestamp and session locking.',
      },
      {
        title: 'Roster Administration',
        description: 'Bulk roster imports from Excel, class assignment, and faculty load tracking.',
      },
      {
        title: 'Audit Trail',
        description: 'Comprehensive audit trail for student edits, roll number updates, and enrollment protection.',
      },
    ],
    screens: [
      { file: '01_erp_dashboard.png', caption: 'Institutional ERP Dashboard & Attendance Health' },
      { file: '02_student_records.png', caption: 'Student Edit Records & Comprehensive Audit Trail' },
    ],
    mockType: 'table',
    tech: ['PostgreSQL', 'Role-Based Security', 'TypeScript', 'REST API'],
    caveat: 'Gautam Buddha University student directory & records management system.',
    notIncludedYet: [
      'Automated biometric scanner pairing',
    ],
  },
  {
    slug: 'fitfuel',
    name: 'FitFuel',
    category: 'Calorie & Workout Tracker',
    status: 'In development',
    statusType: 'dev',
    isFeatured: false,
    oneLine: 'A mobile-first calorie and workout tracker meant to keep the core tools free.',
    problem: 'Most fitness trackers lock fundamental calorie logging, water tracking, and basic workout routines behind expensive monthly subscriptions.',
    whatItDoes: 'Daily calorie ring and macro targets, manual food and manual barcode entry, water tracking, workout library categorized by muscle group, progress charts, and dual unit support.',
    featureGroups: [
      {
        title: 'Daily Calorie Ring',
        description: 'Visual macro target allocation with instant energy balance calculations.',
      },
      {
        title: 'Food & Barcode Entry',
        description: 'Rapid food search, custom recipe logging, and manual barcode input.',
      },
      {
        title: 'Workout Directory',
        description: 'Curated movement library filtered by target muscle groups and equipment.',
      },
      {
        title: 'Hydration & Metrics',
        description: 'One-tap water intake tracking, body metrics, and imperial/metric toggling.',
      },
    ],
    screens: [],
    mockType: 'fitness',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'IndexedDB offline storage'],
    caveat: 'A tracking and guidance tool, not medical advice.',
    notIncludedYet: [
      'Photo-based food recognition (paused)',
      'Wearable Bluetooth heart-rate sync',
    ],
  },
  {
    slug: 'try-out',
    name: 'Try-Out',
    category: 'Virtual Fashion Try-On',
    status: 'In development',
    statusType: 'dev',
    isFeatured: false,
    stageImage: '/projects/try-out/stage_composed_16_9.webp',
    oneLine: 'A virtual fashion try-on experience for visual exploration before you buy.',
    problem: 'Online fashion shoppers struggle to visualize how garments drape and combine into outfits before purchasing, causing high return rates.',
    whatItDoes: 'Allows users to visually preview apparel combinations, colorways, and outfits in a sleek interactive digital dressing room.',
    featureGroups: [
      {
        title: 'Outfit Preview',
        description: 'Preview how an outfit could look in high-fidelity digital styling.',
      },
      {
        title: 'Garment Layering',
        description: 'Combine tops, outerwear, and bottoms with fluid color switching.',
      },
      {
        title: 'Catalog Integration',
        description: 'Direct links to store inventory with instant SKU mapping.',
      },
    ],
    screens: [
      { file: '01_try_out_hero.webp', caption: 'Interactive virtual dressing room interface' },
      { file: '02_try_out_gallery.webp', caption: 'Apparel selection and style combinations' },
      { file: '03_try_out_desktop.webp', caption: 'Desktop studio view' },
    ],
    mockType: 'fashion',
    tech: ['React', 'WebGL Canvas', 'Vite', 'Tailwind CSS'],
    externalUrl: 'https://try-out.antideploy.app/',
    caveat: 'Preview how an outfit could look. Not a physical fit or sizing guarantee.',
    notIncludedYet: [
      'Custom 3D body mesh scanning',
      'Automated size recommendation engine',
    ],
  },
  {
    slug: 'laps-one',
    name: 'LAPS One',
    category: 'Event Management',
    status: 'In development',
    statusType: 'dev',
    isFeatured: false,
    oneLine: 'An event-management platform in development.',
    problem: 'Managing college and institutional event schedules, logistics, and speaker rosters requires disjointed spreadsheets.',
    whatItDoes: 'Centralized event scheduling, track coordination, and announcement distribution currently undergoing active specification and architecture development.',
    featureGroups: [
      {
        title: 'Event Framework',
        description: 'Core architecture for schedules, stages, and session timings.',
      },
    ],
    screens: [],
    mockType: 'calendar',
    tech: ['React', 'TypeScript', 'Node.js'],
    notIncludedYet: [
      'Public ticketing and checkout',
      'Payment gateway processing',
      'QR attendee badge scanning',
    ],
  },
  {
    slug: 'study-hub',
    name: 'Study Hub AI',
    category: 'Campus Study Assistant',
    status: 'Campus pilot',
    statusType: 'pilot',
    isFeatured: false,
    oneLine: 'A study assistant that lives where students already are, WhatsApp and Telegram, and answers from the university\'s own syllabus, papers and notes.',
    problem: 'Official portals are slow to navigate; generic AI does not know your professor, your syllabus or your exam pattern.',
    whatItDoes: 'Students message the bot on WhatsApp and Telegram to retrieve answers grounded directly in university course materials, syllabus files, and verified past notes via a resilient multi-provider retrieval layer.',
    featureGroups: [
      {
        title: 'Messaging Interface',
        description: 'Direct native chat on WhatsApp and Telegram without installing extra apps.',
      },
      {
        title: 'Curated Knowledge Base',
        description: 'Retrieval augmented generation over verified campus syllabus and past papers.',
      },
      {
        title: 'Resilient Routing',
        description: 'Automated fallback across multiple AI providers to maintain continuous uptime.',
      },
      {
        title: 'Community Contributions',
        description: 'Student contributor portal with verified attribution and study leaderboards.',
      },
    ],
    screens: [
      { file: '01_whatsapp_chat_bot.jpg', caption: 'WhatsApp Bot Chat Interface & QR Ticket Verification' },
      { file: '02_bot_terminal_flow.jpg', caption: 'Bot Deployment & Live Heartbeat Diagnostics' },
      { file: '03_pyq_retrieval_flow.png', caption: 'PYQ Document Retrieval & Semester Matcher' },
      { file: '04_qr_ticket_flow.png', caption: 'QR Ticket Generator & Event Coordination' },
      { file: '05_igniton_analytics.png', caption: 'Igniton Event Analytics Dashboard' },
    ],
    stageImage: '/projects/study-hub/01_whatsapp_chat_bot.jpg',
    mockType: 'chat',
    tech: ['Node.js', 'Express', 'SQLite', 'WhatsApp & Telegram bot interfaces', 'Retrieval layer', 'Multi-AI routing'],
    attribution: 'Built by Team Forge Labs.',
    notIncludedYet: [
      'Automated handwritten assignment grading',
      'Live lecture audio transcription',
    ],
  },
];
