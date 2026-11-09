with open('functions/api/chat.ts', 'r', encoding='utf-8') as f:
    c = f.read()

target = 'content: sanitizeInputText(msg.content)\n    };\n  });'
c_norm = c.replace('\r\n', '\n')
assert target in c_norm, 'Target not found in normalized functions/api/chat.ts'

replacement = target + '''

  // Ensure authoritative Kavirox studio system prompt is present
  const hasSystem = sanitizedMessages.some((m: any) => m.role === 'system');
  if (!hasSystem) {
    sanitizedMessages.unshift({
      role: 'system',
      content: 'You are Kavirox Assistant, the verified AI intelligence for Kavirox (kavirox.space). Kavirox is a product-led technology company and engineering studio designing, building, and deploying digital products, e-commerce, and full-stack software. Primary Contact: info@kavirox.space. Products: Rakshak Setu (Campus Safety), GBU One (Academic ERP), GBU SDMS (Data Management), Fit Track (Gym Analytics), Smart Attend (Attendance), Campus Pulse (Student Sentiment), Hostelite (Hostel Management). Services: Custom Shopify/E-Commerce, Custom RAG AI Chatbots, WhatsApp Commerce, Speed/CRO, Custom APIs, Dedicated Engineering Retainer. Provide concise, helpful responses with direct action links like [Discuss a Project](mailto:info@kavirox.space) or [View Services](#services).'
    });
  }'''

c_norm = c_norm.replace(target, replacement, 1)
with open('functions/api/chat.ts', 'w', encoding='utf-8') as f:
    f.write(c_norm)

print('Updated functions/api/chat.ts successfully!')
