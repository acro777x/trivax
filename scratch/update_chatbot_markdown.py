with open('src/domains/chatbot/components/kavirox-chatbot.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

target = '''  // Helper to render formatted text (bold, bullets, linebreaks)
  const renderFormattedText = (content: string) => {
    const normalized = content
      .replace(/([:.\?!])\s*(\d+\.\s+)/g, "$1\\n\\n$2")
      .replace(/([a-z0-9])\\.([A-Z])/g, "$1.\\n\\n$2");
    const lines = normalized.split("\\n");
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      const cleanLine = isBullet ? line.trim().replace(/^[•-]\\s*/, "") : line;

      const parts = cleanLine.split(/(\\*\*.*?\\*\\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={pIdx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 ml-1">
            <span className="text-primary text-xs mt-1">•</span>
            <span className="flex-1">{formattedParts}</span>
          </div>
        );
      }

      return <p key={idx} className="my-0.5 leading-relaxed">{formattedParts}</p>;
    });
  };'''

replacement = '''  // Helper to render inline markdown (bold, code, links)
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    if (!text) return null;
    const tokenRegex = /(\\[[^\\]]+\\]\\([^)]+\\)|\\*\\*[^*]+\\*\\*|`[^`]+`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Link: [label](url)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/^\\[([^\\]]+)\\]\\(([^)]+)\\)$/);
        if (match) {
          const [, label, url] = match;
          const isInternal = url.startsWith('/') || url.startsWith('#');
          return (
            <a
              key={pIdx}
              href={url}
              target={isInternal ? undefined : '_blank'}
              rel={isInternal ? undefined : 'noopener noreferrer'}
              className="text-primary underline hover:text-white transition-colors font-medium inline-flex items-center gap-0.5"
              onClick={(e) => {
                if (url.startsWith('#')) {
                  e.preventDefault();
                  const target = document.getElementById(url.slice(1));
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              {label}
            </a>
          );
        }
      }

      // Bold: **text**
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={pIdx} className="text-white font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Inline code: `code`
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={pIdx} className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });
  };

  // Helper to render formatted text with full Markdown support (tables, headings, bullets, numbers)
  const renderFormattedText = (content: string) => {
    if (!content) return null;

    const lines = content.split('\\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    const parseTableRow = (rowStr: string): string[] => {
      const trimmed = rowStr.trim();
      const inner = trimmed.startsWith('|') ? trimmed.slice(1) : trimmed;
      const clean = inner.endsWith('|') ? inner.slice(0, -1) : inner;
      return clean.split('|').map((cell) => cell.trim());
    };

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      // Check if line starts a markdown table
      if (
        trimmed.startsWith('|') &&
        trimmed.endsWith('|') &&
        i + 1 < lines.length &&
        lines[i + 1].trim().startsWith('|') &&
        (lines[i + 1].includes('---') || lines[i + 1].includes('-|-'))
      ) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        if (tableLines.length >= 2) {
          const headers = parseTableRow(tableLines[0]);
          const bodyRows = tableLines.slice(2).map(parseTableRow);

          elements.push(
            <div
              key={`table-${i}`}
              className="my-3 overflow-x-auto rounded-xl border border-white/15 bg-white/5 p-1 shadow-inner scrollbar-none"
            >
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/15 bg-white/10">
                    {headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3.5 py-2 font-mono text-[11px] font-semibold text-primary uppercase tracking-wider whitespace-nowrap"
                      >
                        {renderInlineMarkdown(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2 align-top text-text leading-relaxed text-xs">
                          {renderInlineMarkdown(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Empty line -> vertical spacer
      if (!trimmed) {
        elements.push(<div key={`spacer-${i}`} className="h-2" />);
        i++;
        continue;
      }

      // Markdown Headings: ### or ## or #
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4 key={`h4-${i}`} className="text-sm font-display font-bold text-white mt-3 mb-1">
            {renderInlineMarkdown(trimmed.slice(4))}
          </h4>
        );
        i++;
        continue;
      }

      if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-sm font-display font-bold text-primary mt-3 mb-1">
            {renderInlineMarkdown(trimmed.replace(/^#+\\s*/, ''))}
          </h3>
        );
        i++;
        continue;
      }

      // Numbered List: 1. Item
      const numMatch = trimmed.match(/^(\\d+)\\.\\s+(.*)/);
      if (numMatch) {
        const [, num, itemText] = numMatch;
        elements.push(
          <div key={`num-${i}`} className="flex items-start gap-2 my-1 ml-1">
            <span className="text-primary font-mono text-xs font-semibold shrink-0 mt-0.5">{num}.</span>
            <span className="flex-1 leading-relaxed text-text text-xs">{renderInlineMarkdown(itemText)}</span>
          </div>
        );
        i++;
        continue;
      }

      // Bullet List: - Item or * Item or • Item
      const bulletMatch = trimmed.match(/^([•\\-\\*])\\s+(.*)/);
      if (bulletMatch) {
        const [, , itemText] = bulletMatch;
        elements.push(
          <div key={`bullet-${i}`} className="flex items-start gap-2 my-1 ml-1">
            <span className="text-primary text-xs shrink-0 mt-0.5">•</span>
            <span className="flex-1 leading-relaxed text-text text-xs">{renderInlineMarkdown(itemText)}</span>
          </div>
        );
        i++;
        continue;
      }

      // Regular Paragraph
      elements.push(
        <p key={`p-${i}`} className="my-1 leading-relaxed text-xs text-text">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
      i++;
    }

    return elements;
  };'''

c_norm = c.replace('\r\n', '\n')
target_norm = target.replace('\r\n', '\n')
assert target_norm in c_norm, 'Target not found in kavirox-chatbot.tsx'

c_norm = c_norm.replace(target_norm, replacement)

with open('src/domains/chatbot/components/kavirox-chatbot.tsx', 'w', encoding='utf-8') as f:
    f.write(c_norm)

print('Updated kavirox-chatbot.tsx with full Markdown & Table support!')
