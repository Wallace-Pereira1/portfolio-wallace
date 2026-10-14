import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import TechBadge from './TechBadge';

export interface DomainItem {
  index: string;
  title: string;
  description: string;
  primarySkills: string[];
  secondarySkills: string[];
}

interface TiltDomainCardProps {
  key?: React.Key;
  item: DomainItem;
  onOpenDetails: (item: DomainItem) => void;
  language: 'pt' | 'en';
}

export default function TiltDomainCard({
  item,
  onOpenDetails,
  language,
}: TiltDomainCardProps) {
  return (
    <div
      onClick={() => onOpenDetails(item)}
      className="p-5 sm:p-6 md:p-7 border border-theme-border hover:border-theme-muted bg-theme-surface rounded-[2px] flex flex-col justify-between group cursor-pointer offset-card"
    >
      <div className="flex-1 flex flex-col space-y-4">
        {/* Header: Index & Title */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block">
              {item.index} / {language === 'pt' ? 'DOMÍNIO' : 'DOMAIN'}
            </span>
            <Layers className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text transition-colors" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-theme-text tracking-tight group-hover:text-theme-accent transition-colors leading-snug">
            {item.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-theme-dim leading-relaxed font-normal">
          {item.description}
        </p>

        {/* Primary Technologies with Authentic Icons */}
        <div className="pt-3 border-t border-theme-border/50">
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block mb-2 font-medium">
            {language === 'pt' ? 'Tecnologias Principais:' : 'Core Technologies:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.primarySkills.map((skill) => (
              <TechBadge
                key={skill}
                tech={skill}
                language={language}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Secondary Skills Preview with subtle badges */}
        <div className="pt-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block mb-1.5 font-medium">
            {language === 'pt' ? 'Ferramentas & Práticas:' : 'Tools & Practices:'}
          </span>
          <div className="flex flex-wrap gap-1">
            {item.secondarySkills.slice(0, 4).map((skill) => (
              <TechBadge
                key={skill}
                tech={skill}
                language={language}
                size="sm"
              />
            ))}
            {item.secondarySkills.length > 4 && (
              <span className="px-2 py-0.5 text-[10.5px] font-mono text-theme-muted bg-theme-bg/50 border border-theme-border/60 rounded-[2px]">
                +{item.secondarySkills.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button to open Modal */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetails(item);
        }}
        className="mt-5 pt-3.5 border-t border-theme-border/60 flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-theme-text hover:text-theme-accent transition-colors cursor-pointer group/btn"
      >
        <span className="font-semibold tracking-wider text-[11px]">
          {language === 'pt' ? 'VER DETALHES DO DOMÍNIO ↗' : 'VIEW DOMAIN DETAILS ↗'}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted group-hover/btn:text-theme-text group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}
