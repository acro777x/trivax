with open('src/domains/chatbot/services/openrouter.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's locate simulateStudioResponse function
start_marker = "async function simulateStudioResponse("
end_marker = "export async function generateChatResponse("

start_idx = text.find(start_marker)
assert start_idx != -1, "start_marker not found"

new_func = """async function simulateStudioResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string, accumulated: string) => void,
  onComplete?: (fullText: string) => void
): Promise<void> {
  const userMessages = messages.filter(m => m.role === "user");
  const lastUserObj = userMessages[userMessages.length - 1];
  const lastUserMsg = (lastUserObj?.content || "").trim().toLowerCase();

  let reply = "";

  // 1. Initial Greeting
  if (/^(hi|hello|hey|greetings|hola|good\\s+(morning|afternoon|evening)|yo|sup)\\b/i.test(lastUserMsg)) {
    reply = `Hello! Welcome to **Kavirox**. We are a product-led technology company based at AIC-GBU, Greater Noida.

We build digital products (like **Rakshak Setu**, **GBU One**, and **GBU SDMS**) and deliver software, AI, automation, and cybersecurity solutions.

How can I help you today? You can ask about our products, our 4 ways of working, or our engineering services.`;
  }
  // 2. What products do you build / Products inquiry
  else if (/(what products|which products|products do you build|tell me about products|portfolio|show me products|what do you make|what do you build|list products|your products)/i.test(lastUserMsg)) {
    reply = `At **Kavirox**, our product portfolio includes:

• **Rakshak Setu** *(Prototype)*: On-device voice shield countering AI voice cloning and phone-scam impersonation during live calls.
• **GBU One & Admin** *(Built & Device-Tested)*: Offline-first student companion app with timetables, attendance battery, PYQs, and PIN-gated admin console.
• **GBU SDMS** *(Deployed & Active)*: Role-based platform for university student records, session attendance, and academic administration.
• **Study Hub AI** *(Campus Pilot)*: WhatsApp and Telegram study assistant answering directly from verified university syllabus and past papers.
• **FitFuel** *(In Development)*: Mobile-first calorie and workout tracker keeping core tools free.
• **Try-Out** *(In Development)*: Virtual fashion try-on experience for visual exploration.
• **LAPS One** *(In Development)*: Centralized event management platform for track and stage scheduling.

Which product would you like to know more about?`;
  }
  // 3. How can we work together / Ways to work
  else if (/(how can we work|ways to work|work together|how to work with you|engagement models?|ways to start|four ways)/i.test(lastUserMsg)) {
    reply = `We offer **Four Clear Ways to Start** working with us:

1. **Ready-Built Product**: Choose an existing Kavirox product that addresses your need. We provide transparent scope, setup, limits, and pricing.
2. **Product Implementation**: We configure the system, onboard users, connect data, set permissions, and train your team.
3. **Custom Development**: For needs no off-the-shelf product covers: custom web apps, mobile apps, SaaS platforms, and APIs.
4. **Product Plus Custom Extension**: Start from an existing product and commission custom integrations or dedicated modules.

Would you like to discuss a project under one of these models?`;
  }
  // 4. Specific product: Rakshak Setu
  else if (/rakshak\\s*setu/i.test(lastUserMsg)) {
    reply = `**Rakshak Setu** is an on-device cybersecurity voice shield (SIH 2026 project by Team Forge Labs at Gautam Buddha University):

• **Threat Detection**: Listens locally for AI voice cloning and pressure scam scripts.
• **Privacy by Design**: Raw call audio is processed entirely in memory on-device and never stored or sent to the cloud.
• **Features**: Live threat HUD during calls, forensic evidence records, URL/QR scanners, and a 1930 NCRP reporting co-pilot.`;
  }
  // 5. Specific product: GBU SDMS
  else if (/(gbu[\\s-]sdms|sdms|student data management)/i.test(lastUserMsg)) {
    reply = `**GBU SDMS** is a deployed, role-based platform for institutional student records and administration:

• **Five Access Roles**: Administrator, Chairperson, Coordinator, Faculty, and Student.
• **Key Capabilities**: Digital attendance logging with timestamp and session locking, bulk Excel roster imports, faculty load allocation, and comprehensive audit trails.
• **Tech Stack**: PostgreSQL, Role-Based Security, TypeScript, and REST APIs.`;
  }
  // 6. Specific product: GBU One
  else if (/gbu[\\s-]one/i.test(lastUserMsg)) {
    reply = `**GBU One** is an offline-first student companion app for Gautam Buddha University:

• **Student Features**: Smart timetables with next-class countdowns, official notices with offline PDF caching, previous-year question papers (PYQs), and attendance battery monitoring.
• **Admin Console**: PIN-gated console for university coordinators to publish notices and push instant updates.
• **Tech Stack**: React Native / Expo, TypeScript, SQLite offline cache, and Supabase.`;
  }
  // 7. Specific product: Study Hub AI
  else if (/study\\s*hub/i.test(lastUserMsg)) {
    reply = `**Study Hub AI** is a campus study assistant living where students already are:

• **Native Messaging**: Accessible directly via WhatsApp and Telegram bots with no extra apps required.
• **Grounded Answers**: Retrieves verified answers strictly from university syllabus files, exam patterns, and past papers.
• **Resilient Infrastructure**: Multi-provider AI routing with automated fallback for 99.9% uptime.`;
  }
  // 8. Services inquiry
  else if (/(what services|services do you deliver|services do you offer|what can you do|capabilities)/i.test(lastUserMsg)) {
    reply = `We deliver focused engineering services across:

• **AI & Automation**: Custom RAG assistants, internal automation workflows, and local on-device ML.
• **Mobile App Development**: High-performance offline-first iOS and Android applications.
• **Web & Cloud Engineering**: Fast, modern web applications, scalable backends, and API integrations.
• **Cybersecurity**: Role-based access governance, tamper-proof audit trails, and security audits.

Tell us what your business is aiming to build, and we'll outline a tailored roadmap!`;
  }
  // 9. Pricing & Timeline
  else if (/(price|pricing|cost|how much|rate|budget|quote|timeline|how long)/i.test(lastUserMsg)) {
    reply = `We provide clear, honest pricing with zero hidden retainers:

• **Ready-Built Products**: Transparent licensing or fixed setup fees based on required scope.
• **Project Sprints**: Fixed-scope development sprints (2–6 weeks) with weekly preview milestones.
• **Custom Solutions**: Structured milestone-based quotes with full architecture transparency.

Click the email button below or write to **info@kavirox.space** to receive a tailored estimate for your project!`;
  }
  // 10. General Company & Location
  else if (/(who are you|where are you|location|office|greater noida|aic|aic-gbu)/i.test(lastUserMsg)) {
    reply = `**Kavirox** is a product-led technology company with services, proudly incubated at **AIC-GBU (Atal Incubation Centre, Gautam Buddha University)**, Greater Noida, India.

Our team designs, engineers, and operates digital products that solve real problems. Reach us anytime at **info@kavirox.space**.`;
  }
  // 11. Default fallback
  else {
    reply = `I would be happy to help! At **Kavirox**, we build products like **Rakshak Setu**, **GBU One**, and **GBU SDMS**, and deliver software, AI, and cybersecurity services.

Feel free to ask about any specific product, our 4 ways of working, or click below to start a direct inquiry with our engineering team!`;
  }

  // Stream reply with human-like pace
  const chunks = reply.match(/.{1,14}/g) || [reply];
  let accumulated = "";

  for (let i = 0; i < chunks.length; i++) {
    await new Promise(r => setTimeout(r, 18));
    accumulated += chunks[i];
    onChunk(chunks[i], accumulated);
  }

  if (onComplete) {
    onComplete(accumulated);
  }
}

"""

# Replace the simulateStudioResponse block
# Find end of simulateStudioResponse
func_end = text.find("\n\nexport async function", start_idx)
if func_end == -1:
    func_end = text.find("\nexport async function", start_idx)

text = text[:start_idx] + new_func + text[func_end:]
with open('src/domains/chatbot/services/openrouter.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print('Updated openrouter.ts simulateStudioResponse successfully!')
