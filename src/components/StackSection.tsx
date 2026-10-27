import React from 'react';
import { useApp } from '../context/AppContext';
import DomainsList from './DomainsList';

interface StackSectionProps {
  showHeader?: boolean;
}

export default function StackSection({ showHeader = true }: StackSectionProps) {
  const { language, t } = useApp();

  return (
    <section
      id="tecnologias"
      className={`min-h-[100dvh] flex flex-col justify-center ${showHeader ? 'py-8 sm:py-12 md:py-16' : 'py-6 md:py-10'} bg-transparent px-4 sm:px-6 md:px-12 transition-colors relative snap-start snap-always scroll-mt-6 sm:scroll-mt-10`}
    >
      <div id="competencias" className="absolute -top-20 opacity-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto w-full space-y-5 sm:space-y-7">
        {/* Section Header */}
        {showHeader && (
          <div className="space-y-1.5 pb-1">
            <span className="text-[10.5px] font-mono text-theme-muted uppercase tracking-widest block font-medium">
              {language === 'pt' ? 'Competências & Tecnologias' : 'Skills & Technologies'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.15] font-medium text-theme-text tracking-[-0.015em]">
              {t('tech.title')}
            </h2>
            <p className="text-xs sm:text-sm text-theme-dim max-w-2xl leading-relaxed">
              {t('tech.desc')}
            </p>
          </div>
        )}

        {/* Lista editorial compacta de 4 domínios */}
        <DomainsList language={language} />
      </div>
    </section>
  );
}
