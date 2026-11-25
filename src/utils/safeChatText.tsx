import React from 'react';

const ALLOWED_INTERNAL_HASHES = new Set([
  '#inicio',
  '#projetos',
  '#experiencia',
  '#tecnologias',
  '#competencias',
  '#contato',
]);

/**
 * Strictly validates URLs produced by the chat assistant or static fallback.
 * Only permits safe internal portfolio anchors, HTTPS links, and mailto links.
 */
export function sanitizeChatHref(rawUrl: string): {
  href: string;
  isInternal: boolean;
} | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // Reject control characters or whitespace inside scheme
  if (/[\u0000-\u001F\u007F]/.test(trimmed)) return null;

  if (trimmed.startsWith('/#') || trimmed.startsWith('#')) {
    const hash = trimmed.startsWith('/#') ? trimmed.slice(1) : trimmed;
    const normalizedHash = hash.toLowerCase();
    if (ALLOWED_INTERNAL_HASHES.has(normalizedHash)) {
      return { href: `/${normalizedHash}`, isInternal: true };
    }
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return { href: parsed.toString(), isInternal: false };
    }
  } catch {
    return null;
  }

  return null;
}

const TOKEN_REGEX =
  /(\[[^\]]+\]\((?:https:\/\/[^\s)]+|mailto:[^\s)]+|\/?#[a-zA-Z0-9_-]+)\)|\*\*[^*]+\*\*|https:\/\/[^\s<>()]+|mailto:[^\s<>()]+|\/#[a-zA-Z0-9_-]+)/g;

function renderInlineTokens(
  line: string,
  onInternalNavigate: (href: string) => void,
  keyPrefix: string
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of line.matchAll(TOKEN_REGEX)) {
    const token = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(line.slice(lastIndex, index));
    }

    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${index}`} className="font-semibold text-theme-text">
          {token.slice(2, -2)}
        </strong>
      );
      lastIndex = index + token.length;
      continue;
    }

    if (token.startsWith('[')) {
      const closeBracket = token.indexOf('](');
      if (closeBracket > 1 && token.endsWith(')')) {
        const label = token.slice(1, closeBracket);
        const rawHref = token.slice(closeBracket + 2, -1);
        const safe = sanitizeChatHref(rawHref);
        if (safe) {
          nodes.push(
            safe.isInternal ? (
              <a
                key={`${keyPrefix}-a-${index}`}
                href={safe.href}
                onClick={(e) => {
                  e.preventDefault();
                  onInternalNavigate(safe.href);
                }}
                className="underline decoration-theme-border underline-offset-4 text-theme-text hover:decoration-theme-text transition-colors"
              >
                {label}
              </a>
            ) : (
              <a
                key={`${keyPrefix}-a-${index}`}
                href={safe.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-theme-border underline-offset-4 text-theme-text hover:decoration-theme-text transition-colors"
              >
                {label}
              </a>
            )
          );
        } else {
          nodes.push(label);
        }
        lastIndex = index + token.length;
        continue;
      }
    }

    // Bare URL or internal anchor: trim trailing sentence punctuation cleanly
    let cleanToken = token;
    let trailing = '';
    while (/[.,;:!?)]$/.test(cleanToken)) {
      trailing = cleanToken.slice(-1) + trailing;
      cleanToken = cleanToken.slice(0, -1);
    }

    const safe = sanitizeChatHref(cleanToken);
    if (safe) {
      nodes.push(
        safe.isInternal ? (
          <a
            key={`${keyPrefix}-u-${index}`}
            href={safe.href}
            onClick={(e) => {
              e.preventDefault();
              onInternalNavigate(safe.href);
            }}
            className="underline decoration-theme-border underline-offset-4 text-theme-text hover:decoration-theme-text transition-colors break-all"
          >
            {cleanToken}
          </a>
        ) : (
          <a
            key={`${keyPrefix}-u-${index}`}
            href={safe.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-theme-border underline-offset-4 text-theme-text hover:decoration-theme-text transition-colors break-all"
          >
            {cleanToken}
          </a>
        )
      );
      if (trailing) nodes.push(trailing);
    } else {
      nodes.push(token);
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes;
}

interface SafeChatTextProps {
  text: string;
  onInternalNavigate: (href: string) => void;
}

export function SafeChatText({ text, onInternalNavigate }: SafeChatTextProps) {
  const blocks = text.split(/\n{2,}/);

  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed break-words">
      {blocks.map((block, blockIdx) => {
        const lines = block
          .split('\n')
          .map((l) => l.trimEnd())
          .filter((l) => l.trim().length > 0);

        if (lines.length === 0) return null;

        const isBulletList = lines.every((l) => /^\s*[-*•]\s+/.test(l));
        if (isBulletList) {
          return (
            <ul key={`blk-${blockIdx}`} className="list-disc pl-4 space-y-1 text-theme-dim">
              {lines.map((line, lineIdx) => (
                <li key={`li-${blockIdx}-${lineIdx}`}>
                  {renderInlineTokens(
                    line.replace(/^\s*[-*•]\s+/, ''),
                    onInternalNavigate,
                    `li-${blockIdx}-${lineIdx}`
                  )}
                </li>
              ))}
            </ul>
          );
        }

        // Mixed block with paragraph + list lines
        return (
          <div key={`blk-${blockIdx}`} className="space-y-1">
            {lines.map((line, lineIdx) => {
              const bulletMatch = line.match(/^\s*[-*•]\s+(.*)$/);
              if (bulletMatch) {
                return (
                  <p key={`p-${blockIdx}-${lineIdx}`} className="pl-3 relative text-theme-dim">
                    <span aria-hidden="true" className="absolute left-0 text-theme-muted">
                      ·
                    </span>
                    {renderInlineTokens(
                      bulletMatch[1],
                      onInternalNavigate,
                      `p-${blockIdx}-${lineIdx}`
                    )}
                  </p>
                );
              }
              return (
                <p key={`p-${blockIdx}-${lineIdx}`}>
                  {renderInlineTokens(line, onInternalNavigate, `p-${blockIdx}-${lineIdx}`)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
