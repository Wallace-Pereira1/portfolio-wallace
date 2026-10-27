import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import DomainDetailModal from './DomainDetailModal';

export interface EditorialDomainItem {
  id: string;
  name: string;
  technologies: string;
  description: string;
  secondaryLine?: string;
  projectTitle: string;
  projectUrl: string;
}

interface DomainsListProps {
  language?: string;
}

export default function DomainsList({ language: propLanguage }: DomainsListProps) {
  const { language: contextLanguage } = useApp();
  const currentLang = propLanguage || contextLanguage;
  const pt = currentLang !== 'en';

  // All accordion items start closed by default
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Modal state: domain selected for technical details modal
  const [modalDomainId, setModalDomainId] = useState<string | null>(null);
  const triggerElementsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  const domainsPt: EditorialDomainItem[] = [
    {
      id: 'frontend',
      name: 'Front-end',
      technologies: 'React · TypeScript · Angular · Tailwind CSS',
      description:
        'Desenvolvimento de interfaces modernas, reativas e com tipagem estrita do início ao fim, pensadas para fluidez de uso e facilidade de manutenção.',
      projectTitle: 'Plataforma de Investimentos',
      projectUrl: '/projetos/02',
    },
    {
      id: 'apis-dados',
      name: 'APIs & Dados',
      technologies: 'Node.js · PostgreSQL · Supabase · APIs REST',
      description:
        'Construção de APIs seguras e idempotentes com persistência relacional, Row Level Security e autenticação robusta.',
      projectTitle: 'Sentinela Fiscal: Auditoria',
      projectUrl: '/projetos/06',
    },
    {
      id: 'automacoes-ia',
      name: 'Integrações, Automações & IA',
      technologies: 'Crm · n8n · Make · APIs · Webhooks · ERP',
      description:
        'Integro CRMs, ERP e plataformas de atendimento para conectar dados, automatizar processos e organizar fluxos comerciais.',
      secondaryLine: 'Salesforce · RD Station · HubSpot · Olist ERP',
      projectTitle: 'Agente de Qualificação Imobiliária',
      projectUrl: '/projetos/01',
    },
    {
      id: 'entrega-qualidade',
      name: 'Entrega & Qualidade',
      technologies: 'Git · CI/CD · Vercel · Cloudflare',
      description:
        'Versionamento semântico, esteiras de validação automatizada e deploy global na edge com alta disponibilidade e zero downtime.',
      projectTitle: 'Modernização ASP → Angular',
      projectUrl: '/projetos/03',
    },
  ];

  const domainsEn: EditorialDomainItem[] = [
    {
      id: 'frontend',
      name: 'Front-end',
      technologies: 'React · TypeScript · Angular · Tailwind CSS',
      description:
        'High-performance reactive user interfaces with end-to-end static typing, built for responsive user experience and clean code maintenance.',
      projectTitle: 'Investment Portfolio Platform',
      projectUrl: '/projetos/02',
    },
    {
      id: 'apis-dados',
      name: 'APIs & Data',
      technologies: 'Node.js · PostgreSQL · Supabase · REST APIs',
      description:
        'Resilient and idempotent REST APIs with relational schema modeling, Row Level Security, and secure authentication.',
      projectTitle: 'Fiscal Sentinel Audit System',
      projectUrl: '/projetos/06',
    },
    {
      id: 'automacoes-ia',
      name: 'Integrations, Automations & AI',
      technologies: 'n8n · Make · APIs · Webhooks',
      description:
        'I integrate CRMs, ERP, and customer service platforms to connect data, automate processes, and organize commercial workflows.',
      secondaryLine: 'Salesforce · RD Station · HubSpot · Olist ERP',
      projectTitle: 'Real Estate Autonomous Agent',
      projectUrl: '/projetos/01',
    },
    {
      id: 'entrega-qualidade',
      name: 'Delivery & Quality',
      technologies: 'Git · GitHub Actions · CI/CD · Vercel',
      description:
        'Semantic versioning, automated quality test gates, and continuous edge deployments with high availability and zero downtime.',
      projectTitle: 'Legacy ASP → Angular Overhaul',
      projectUrl: '/projetos/03',
    },
  ];

  const domains = pt ? domainsPt : domainsEn;

  const handleToggle = (id: string) => {
    // Only one item open at a time; clicking an open item closes it.
    // No automatic scroll upon expanding.
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-full divide-y divide-theme-border/60 border-y border-theme-border/60">
      {domains.map((item) => {
        const isOpen = expandedId === item.id;
        const headerId = `domain-header-${item.id}`;
        const contentId = `domain-content-${item.id}`;

        return (
          <div key={item.id} className="w-full">
            {/* Real button trigger for accessibility */}
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => handleToggle(item.id)}
              className="w-full text-left py-4 sm:py-4.5 md:py-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-text rounded-[2px]"
            >
              <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 sm:pr-4">
                {/* Domain Name */}
                <span className="text-base sm:text-lg font-serif font-medium text-theme-text group-hover:text-theme-accent transition-colors leading-snug">
                  {item.name}
                </span>

                {/* Short line of primary technologies */}
                <span className="text-xs sm:text-[13px] font-mono text-theme-muted group-hover:text-theme-dim transition-colors leading-relaxed break-words">
                  {item.technologies}
                </span>
              </div>

              {/* Expand / Collapse Icon */}
              <span
                className="p-1 text-theme-muted group-hover:text-theme-text transition-colors shrink-0 mt-0.5 sm:mt-0"
                aria-hidden="true"
              >
                <ChevronDown
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 ease-out ${
                    isOpen ? 'rotate-180 text-theme-text' : 'rotate-0'
                  }`}
                />
              </span>
            </button>

            {/* Expanded Content Region */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 sm:pb-5 pt-0.5 space-y-3">
                    {/* 1 or 2 sentence description */}
                    <p className="text-xs sm:text-sm text-theme-dim leading-relaxed max-w-3xl font-normal">
                      {item.description}
                    </p>

                    {/* Discrete secondary tools / platforms line */}
                    {item.secondaryLine && (
                      <p className="text-[11.5px] sm:text-xs font-mono text-theme-muted tracking-wide break-words">
                        {item.secondaryLine}
                      </p>
                    )}

                    {/* Discrete project and technical specs links */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs sm:text-[12.5px] font-mono">
                      {/* Real related project link */}
                      <Link
                        to={item.projectUrl}
                        className="inline-flex items-center gap-1.5 text-theme-text hover:text-theme-accent transition-colors underline decoration-theme-border hover:decoration-theme-accent underline-offset-4"
                      >
                        <span>
                          {pt ? 'Projeto relacionado:' : 'Related project:'} {item.projectTitle}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </Link>

                      {/* Technical details button that opens the modal in-place */}
                      <button
                        type="button"
                        ref={(el) => {
                          if (el) {
                            triggerElementsRef.current.set(item.id, el);
                          } else {
                            triggerElementsRef.current.delete(item.id);
                          }
                        }}
                        onClick={() => setModalDomainId(item.id)}
                        className="inline-flex items-center gap-1.5 text-theme-muted hover:text-theme-text transition-colors underline decoration-theme-border/60 hover:decoration-theme-text underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-text rounded-[2px]"
                        aria-haspopup="dialog"
                        aria-expanded={modalDomainId === item.id}
                      >
                        <span>{pt ? 'Ver detalhes técnicos' : 'View technical specs'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Accessible In-Place Technical Domain Details Modal */}
      <DomainDetailModal
        isOpen={Boolean(modalDomainId)}
        onClose={() => setModalDomainId(null)}
        domainId={modalDomainId}
        language={currentLang}
        triggerElement={modalDomainId ? triggerElementsRef.current.get(modalDomainId) : null}
      />
    </div>
  );
}
