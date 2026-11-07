import React from 'react';
import { useApp } from '../context/AppContext';
import DomainsList from './DomainsList';

interface StackSectionProps {
  showHeader?: boolean;
}

export default function StackSection({ showHeader = true }: StackSectionProps) {
  const { language } = useApp();

  return (
    <section
      id="tecnologias"
      className="portfolio-section bg-transparent transition-colors relative"
    >
      <div id="competencias" className="absolute -top-20 opacity-0 pointer-events-none" />
      <div className="portfolio-container space-y-6 md:space-y-8">
        {/* Section Header */}
        {showHeader && (
          <div className="space-y-3">
            <span className="block font-mono text-xs uppercase tracking-widest text-theme-muted">
              {language === 'pt' ? 'Stack & Domínios' : 'Stack & Domains'}
            </span>
            <h2 className="font-serif text-2xl sm:text-[26px] leading-[1.15] font-medium text-theme-text tracking-[-0.015em]">
              {language === 'pt' ? 'Competências' : 'Skills'}
            </h2>
          </div>
        )}

        {/* Lista editorial compacta de 4 domínios */}
        <DomainsList language={language} />
      </div>
    </section>
  );
}
