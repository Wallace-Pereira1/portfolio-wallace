import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { DomainItem } from './TiltDomainCard';

interface DomainsListProps {
  domains: DomainItem[];
  language: string;
  onOpen: (domain: DomainItem) => void;
}

/**
 * Índice editorial de competências: uma linha por domínio, sem chips.
 * Tecnologias principais em destaque, ferramentas e práticas em cinza.
 * Clicar abre o modal de detalhes do domínio.
 */
export default function DomainsList({ domains, language, onOpen }: DomainsListProps) {
  const pt = language !== 'en';

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-mono text-theme-muted tracking-tight select-none md:text-right">
        {pt ? 'clique em um domínio para ver os detalhes' : 'click a domain for details'}
      </p>

      <ol className="offset-static mb-2 border border-theme-border bg-theme-surface rounded-[2px] divide-y divide-theme-border">
        {domains.map((item) => (
          <li key={item.index} className="relative group/row">
            <button
              type="button"
              onClick={() => onOpen(item)}
              aria-label={`${pt ? 'Ver detalhes do domínio' : 'View domain details'}: ${item.title}`}
              className="w-full text-left grid grid-cols-[auto_1fr] md:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1fr)] gap-x-4 md:gap-x-8 gap-y-3 items-start px-4 sm:px-6 py-5 sm:py-6 pr-12 sm:pr-16 transition-colors duration-150 hover:bg-theme-border/25 focus-visible:bg-theme-border/25 outline-none focus-visible:ring-1 focus-visible:ring-theme-text/40"
            >
              <span className="font-mono text-[11px] text-theme-muted pt-1.5 transition-colors group-hover/row:text-theme-text">
                {item.index}
              </span>

              <span className="block space-y-1.5 transition-transform duration-200 group-hover/row:translate-x-1">
                <span className="block text-base sm:text-[17px] font-medium text-theme-text leading-snug">
                  {item.title}
                </span>
                <span className="block text-sm text-theme-dim leading-relaxed">{item.description}</span>
              </span>

              <span className="col-start-2 md:col-start-auto block space-y-1.5 font-mono md:pt-1">
                <span className="block text-[12px] leading-relaxed text-theme-text">
                  {item.primarySkills.join(' · ')}
                </span>
                <span className="block text-[11px] leading-relaxed text-theme-muted">
                  {item.secondarySkills.join(' · ')}
                </span>
              </span>
            </button>

            <ArrowRight className="absolute right-4 sm:right-6 top-6 sm:top-7 w-4 h-4 text-theme-muted pointer-events-none transition-all duration-200 group-hover/row:translate-x-1 group-hover/row:text-theme-text" />
          </li>
        ))}
      </ol>
    </div>
  );
}
