import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EditorialColophonProps {
  nextRoute?: {
    path: string;
    label: string;
  };
}

export default function EditorialColophon({ nextRoute: _nextRoute }: EditorialColophonProps) {
  const { language } = useApp();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-theme-border bg-transparent py-6 md:py-8 px-[clamp(24px,6vw,48px)] transition-colors">
      <div className="portfolio-container">
        {/* Colophon & Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center text-xs font-mono">
          <div className="space-y-1">
            <span className="text-theme-text font-semibold tracking-tight">Wallace Carvalho Pereira</span>
            <p className="text-theme-dim text-xs">
              {language === 'pt'
                ? 'Engenharia de software full stack, automações e integrações de dados.'
                : 'Full stack software engineering, automation, and data integrations.'}
            </p>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4 text-theme-muted">
            <span className="text-xs">© 2026 Rio de Janeiro</span>
            <button
              type="button"
              onClick={handleBackToTop}
              className="inline-flex items-center gap-1 text-theme-dim hover:text-theme-text transition-colors p-1 cursor-pointer"
              title={language === 'pt' ? 'Voltar ao topo' : 'Back to top'}
              aria-label={language === 'pt' ? 'Voltar ao topo' : 'Back to top'}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
