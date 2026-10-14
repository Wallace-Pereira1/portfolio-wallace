import React from 'react';
import TypewriterTitle from './TypewriterTitle';

interface MetaItem {
  label: string;
  value: string;
}

interface PageHeaderProps {
  number?: string;
  eyebrow?: string;
  title: string;
  description: string;
  meta?: MetaItem[];
}

export default function PageHeader({ number, eyebrow, title, description, meta = [] }: PageHeaderProps) {
  return (
    <header className="pt-28 pb-12 md:pt-36 md:pb-16 bg-transparent transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-8">
        {/* Editorial Heading: Eyebrow Context -> Short Strong H1 -> Specific Description */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl">
          {(eyebrow || number) && (
            <div className="text-[11px] font-mono uppercase tracking-widest text-theme-muted font-medium">
              {eyebrow || number}
            </div>
          )}
          <TypewriterTitle
            text={title}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] text-theme-text leading-[1.06]"
          />
          <p className="text-base sm:text-lg text-theme-dim max-w-3xl font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Technical Metadata Bar */}
        {meta.length > 0 && (
          <div
            className={`grid grid-cols-2 ${
              meta.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
            } gap-4 pt-4 border-t border-theme-border/60 text-xs font-mono`}
          >
            {meta.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[11px] text-theme-muted uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="text-theme-text font-medium block truncate">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
