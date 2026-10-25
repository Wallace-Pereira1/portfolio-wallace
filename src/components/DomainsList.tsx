import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Layers, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { DomainItem } from './TiltDomainCard';
import TechBadge from './TechBadge';
import DomainStudyModal from './DomainStudyModal';

interface DomainsListProps {
  domains: DomainItem[];
  language: string;
}

/**
 * Índice editorial de competências com gaveta expansível inline compacta.
 * Ao clicar na linha, desce uma gaveta rápida e direta com a descrição,
 * stacks usadas e o botão "Ler mais" que abre o modal com o detalhamento completo.
 * Ao clicar em outro ou fora, a gaveta fecha automaticamente.
 */
export default function DomainsList({ domains, language }: DomainsListProps) {
  const pt = language !== 'en';
  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
  const [modalDomain, setModalDomain] = useState<DomainItem | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // Fecha a gaveta ao clicar fora da lista ou ao pressionar Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      // Se um modal estiver aberto, não interfere
      if (modalDomain) return;

      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        setExpandedIndex(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !modalDomain) {
        setExpandedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalDomain]);

  const handleToggle = (index: string) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-mono text-theme-muted tracking-tight select-none md:text-right">
        {pt ? 'clique em um domínio para expandir' : 'click a domain to expand'}
      </p>

      <ol
        ref={listRef}
        className="offset-static mb-2 border border-theme-border bg-theme-surface rounded-[2px] divide-y divide-theme-border overflow-hidden"
      >
        {domains.map((item) => {
          const isExpanded = expandedIndex === item.index;

          return (
            <li key={item.index} className="relative group/row">
              {/* Linha Principal do Domínio */}
              <button
                type="button"
                onClick={() => handleToggle(item.index)}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? (pt ? 'Fechar gaveta' : 'Close drawer') : (pt ? 'Abrir gaveta de detalhes' : 'Open details drawer')}: ${item.title}`}
                className={`w-full text-left grid grid-cols-[auto_1fr] md:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,1fr)] gap-x-4 md:gap-x-8 gap-y-3 items-start px-4 sm:px-6 py-5 sm:py-6 pr-12 sm:pr-16 transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-theme-text/40 cursor-pointer ${
                  isExpanded ? 'bg-theme-border/30' : 'hover:bg-theme-border/25 focus-visible:bg-theme-border/25'
                }`}
              >
                <span
                  className={`font-mono text-[11px] pt-1.5 transition-colors ${
                    isExpanded ? 'text-theme-text font-bold' : 'text-theme-muted group-hover/row:text-theme-text'
                  }`}
                >
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

              {/* Ícone de Flecha com Rotação Animada */}
              <ArrowRight
                className={`absolute right-4 sm:right-6 top-6 sm:top-7 w-4 h-4 pointer-events-none transition-all duration-200 ${
                  isExpanded
                    ? 'rotate-90 text-theme-text'
                    : 'rotate-0 text-theme-muted group-hover/row:translate-x-1 group-hover/row:text-theme-text'
                }`}
              />

              {/* Gaveta Expansível Compacta e Rápida */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`drawer-${item.index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-theme-border bg-theme-bg/60"
                  >
                    <div className="p-3 sm:p-4 space-y-2.5 text-theme-text">
                      {/* Descrição Direta em poucas linhas para evitar scroll no mobile */}
                      <p className="text-xs sm:text-[13px] text-theme-dim leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>

                      {/* Stacks Principais (Ícones compactos com expansão suave ao passar o mouse e legenda no topo) */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted shrink-0 select-none">
                          Core:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {item.primarySkills.map((skill) => (
                            <TechBadge
                              key={`${item.index}-${skill}`}
                              tech={skill}
                              language={pt ? 'pt' : 'en'}
                              size="sm"
                              expandOnHover={true}
                            />
                          ))}
                        </div>
                      </div>

                        {/* Botão de "Ler mais" para abrir o Modal de Estudo de Domínio */}
                        <div className="pt-1.5 border-t border-theme-border/40 flex items-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalDomain(item);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-theme-text text-theme-bg hover:opacity-90 rounded-[2px] transition-opacity font-semibold uppercase tracking-wider text-[11px] font-mono cursor-pointer shadow-sm group/btn"
                          >
                            <span>{pt ? 'Ler mais / Detalhes de arquitetura' : 'Read more / Architecture specs'}</span>
                            <ArrowUpRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>

      {/* Modal Detalhado Acionado Exclusivamente pelo Botão "Ler Mais" */}
      <DomainStudyModal
        isOpen={Boolean(modalDomain)}
        onClose={() => setModalDomain(null)}
        domain={modalDomain}
        allDomains={domains}
        onSelectDomain={(d) => setModalDomain(d)}
        language={pt ? 'pt' : 'en'}
      />
    </div>
  );
}
