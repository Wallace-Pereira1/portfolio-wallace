import React from 'react';
import { ArrowUp, Github, Linkedin, MessageCircle } from 'lucide-react';
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
    <footer className="border-t border-theme-border bg-transparent py-6 md:py-8 px-6 md:px-12 transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Colophon & Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-xs font-mono">
          <div className="md:col-span-5 space-y-1">
            <span className="text-theme-text font-semibold tracking-tight">Wallace Pereira</span>
            <p className="text-theme-dim text-[11px]">
              Engenharia de software full stack, automações críticas e integrações de dados.
            </p>
          </div>

          <div className="md:col-span-4 flex items-center gap-2.5 text-theme-dim">
            <a
              href="https://www.linkedin.com/in/wallacepereira-in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="p-2 border border-theme-border rounded-[2px] bg-theme-surface hover:border-theme-text hover:text-theme-text text-theme-dim transition-colors inline-flex items-center justify-center cursor-pointer"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/Wallace-Pereira1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="p-2 border border-theme-border rounded-[2px] bg-theme-surface hover:border-theme-text hover:text-theme-text text-theme-dim transition-colors inline-flex items-center justify-center cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/5521999688381?text=${encodeURIComponent(
                language === 'pt'
                  ? 'Olá, Wallace! Vi seu portfólio e gostaria de conversar sobre uma oportunidade / projeto.'
                  : 'Hello, Wallace! I came across your portfolio and would like to talk about an opportunity / project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title={language === 'pt' ? 'WhatsApp: Iniciar conversa' : 'WhatsApp: Start chat'}
              className="p-2 border border-theme-border rounded-[2px] bg-theme-surface hover:border-theme-text hover:text-theme-text text-theme-dim transition-colors inline-flex items-center justify-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4 text-theme-muted">
            <span className="text-[11px]">© 2026 Rio de Janeiro</span>
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
