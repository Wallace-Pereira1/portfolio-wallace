import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, MoveUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import DomainDetailModal from './DomainDetailModal';

interface EditorialDomainItem {
  id: string;
  index: string;
  name: string;
  summary: string;
  technologies: string[];
  projectTitle: string;
  projectContext: string;
  projectUrl: string;
}

const domainsPt: EditorialDomainItem[] = [
  {
    id: 'frontend',
    index: '01',
    name: 'Front-end',
    summary: 'Interfaces para produtos digitais e sistemas corporativos, com foco em clareza, acessibilidade e manutenção.',
    technologies: ['React', 'TypeScript', 'Angular', 'Tailwind CSS'],
    projectTitle: 'Modernização de Sistema Corporativo Legado',
    projectContext: 'Migração de ASP para Angular e TypeScript, com redução reportada de 70% no tempo de carregamento.',
    projectUrl: '/projetos/03',
  },
  {
    id: 'apis-dados',
    index: '02',
    name: 'APIs & Dados',
    summary: 'APIs e modelos relacionais que conectam operações, mantêm dados consistentes e facilitam auditorias.',
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'APIs REST'],
    projectTitle: 'Fiscal Sentinel: Auditoria e Conformidade Fiscal',
    projectContext: 'Estudo de caso de auditoria transacional preventiva e detecção de anomalias tributárias.',
    projectUrl: '/projetos/07',
  },
  {
    id: 'automacoes-ia',
    index: '03',
    name: 'Integrações, Automações & IA',
    summary: 'Fluxos que conectam canais, CRMs e ERPs para qualificar solicitações e reduzir etapas manuais.',
    technologies: ['n8n', 'Webhooks', 'APIs REST', 'CRM / ERP', 'LLMs & OCR'],
    projectTitle: 'Agente de IA & Pipeline de Qualificação Imobiliária',
    projectContext: 'Qualificação de leads integrada ao CRM ARBO, à OLX e à agenda dos corretores.',
    projectUrl: '/projetos/01',
  },
  {
    id: 'entrega-qualidade',
    index: '04',
    name: 'Entrega & Qualidade',
    summary: 'Da integração e validação ao deploy, com atenção à operação e ao acompanhamento das entregas.',
    technologies: ['Git', 'CI/CD', 'Vercel', 'Cloudflare'],
    projectTitle: 'CAPCRJ | Presença Digital & Orçamentos',
    projectContext: 'Site publicado no Cloudflare Pages, com deploy contínuo integrado ao GitHub.',
    projectUrl: '/projetos/08',
  },
];

const domainsEn: EditorialDomainItem[] = [
  {
    id: 'frontend',
    index: '01',
    name: 'Front-end',
    summary: 'Interfaces for digital products and enterprise systems, designed for clarity, accessibility, and maintainability.',
    technologies: ['React', 'TypeScript', 'Angular', 'Tailwind CSS'],
    projectTitle: 'Legacy Enterprise System Modernization',
    projectContext: 'ASP to Angular and TypeScript migration, with a reported 70% reduction in loading time.',
    projectUrl: '/projetos/03',
  },
  {
    id: 'apis-dados',
    index: '02',
    name: 'APIs & Data',
    summary: 'APIs and relational models that connect operations, keep data consistent, and support auditing.',
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'REST APIs'],
    projectTitle: 'Fiscal Sentinel: Audit & Compliance',
    projectContext: 'A case study in preventive transaction auditing and tax anomaly detection.',
    projectUrl: '/projetos/07',
  },
  {
    id: 'automacoes-ia',
    index: '03',
    name: 'Integrations, Automation & AI',
    summary: 'Workflows connecting channels, CRMs, and ERPs to qualify requests and reduce manual steps.',
    technologies: ['n8n', 'Webhooks', 'REST APIs', 'CRM / ERP', 'LLMs & OCR'],
    projectTitle: 'AI Agent & Real Estate Qualification Pipeline',
    projectContext: 'Lead qualification connected to ARBO CRM, OLX, and brokers’ calendars.',
    projectUrl: '/projetos/01',
  },
  {
    id: 'entrega-qualidade',
    index: '04',
    name: 'Delivery & Quality',
    summary: 'From integration and validation to deployment, with attention to operations and delivery monitoring.',
    technologies: ['Git', 'CI/CD', 'Vercel', 'Cloudflare'],
    projectTitle: 'CAPCRJ | Digital Presence & Quotes',
    projectContext: 'A site published on Cloudflare Pages with continuous deployment connected to GitHub.',
    projectUrl: '/projetos/08',
  },
];

interface DomainsListProps {
  language?: string;
}

export default function DomainsList({ language: propLanguage }: DomainsListProps) {
  const { language: contextLanguage } = useApp();
  const currentLang = propLanguage || contextLanguage;
  const pt = currentLang !== 'en';
  const domains = pt ? domainsPt : domainsEn;
  const [selectedId, setSelectedId] = useState(domains[0].id);
  const [modalDomainId, setModalDomainId] = useState<string | null>(null);
  const triggerElementsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const selectedDomain = domains.find((domain) => domain.id === selectedId) ?? domains[0];
  const panelId = 'selected-domain-panel';

  return (
    <div className="grid w-full max-w-full grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
      <div
        className="divide-y divide-theme-border/60 border-y border-theme-border/60 lg:col-span-5"
        aria-label={pt ? 'Selecione um domínio técnico' : 'Select a technical domain'}
      >
        {domains.map((domain) => {
          const isSelected = selectedDomain.id === domain.id;
          return (
            <button
              key={domain.id}
              type="button"
              id={`domain-header-${domain.id}`}
              aria-pressed={isSelected}
              aria-controls={panelId}
              onClick={() => setSelectedId(domain.id)}
              className={`group flex w-full items-center gap-3 py-4 text-left transition-colors sm:py-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-text rounded-[2px] ${
                isSelected ? 'text-theme-text' : 'text-theme-dim hover:text-theme-text'
              }`}
            >
              <span className={`w-8 shrink-0 font-mono text-[10px] tracking-wider ${isSelected ? 'text-theme-text' : 'text-theme-muted'}`}>
                {domain.index}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-snug sm:text-base">{domain.name}</span>
                <span className="mt-1 block truncate font-mono text-[10px] text-theme-muted sm:text-[11px]">
                  {domain.technologies.slice(0, 3).join(' · ')}
                </span>
              </span>
              <MoveUpRight
                aria-hidden="true"
                className={`h-3.5 w-3.5 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 -translate-y-0.5 text-theme-text' : 'text-theme-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}`}
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          key={selectedDomain.id}
          id={panelId}
          role="region"
          aria-labelledby={`domain-header-${selectedDomain.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative flex min-h-[300px] flex-col justify-between overflow-hidden border border-theme-border bg-theme-surface p-5 sm:p-7 md:p-8 lg:col-span-7"
        >
          <div aria-hidden="true" className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] tracking-[0.2em] text-theme-muted/60">
            {selectedDomain.index} / 04
          </div>

          <div className="relative space-y-4 pr-12 sm:space-y-5">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-theme-muted">
              <Layers aria-hidden="true" className="h-3.5 w-3.5" />
              {pt ? 'Domínio em prática' : 'Domain in practice'}
            </span>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-medium leading-tight tracking-[-0.02em] text-theme-text sm:text-2xl md:text-[28px]">
                {selectedDomain.name}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-theme-dim sm:text-[15px]">
                {selectedDomain.summary}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-theme-muted">
                {pt ? 'Stack utilizada' : 'Tools used'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomain.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="border border-theme-border px-2 py-1 font-mono text-[10px] text-theme-dim sm:text-[11px]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-6 border-t border-theme-border/70 pt-4 sm:mt-8 sm:pt-5">
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-theme-muted">
              {pt ? 'Projeto relacionado' : 'Related project'}
            </span>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 space-y-1">
                <h4 className="text-sm font-medium leading-snug text-theme-text sm:text-base">
                  {selectedDomain.projectTitle}
                </h4>
                <p className="max-w-xl text-xs leading-relaxed text-theme-dim sm:text-[13px]">
                  {selectedDomain.projectContext}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] sm:text-[11px]">
                <Link
                  to={selectedDomain.projectUrl}
                  className="inline-flex items-center gap-1.5 text-theme-text underline decoration-theme-border underline-offset-4 transition-colors hover:decoration-theme-text"
                >
                  {pt ? 'Abrir estudo de caso' : 'Open case study'}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
                <button
                  ref={(element) => {
                    if (element) triggerElementsRef.current.set(selectedDomain.id, element);
                    else triggerElementsRef.current.delete(selectedDomain.id);
                  }}
                  type="button"
                  onClick={() => setModalDomainId(selectedDomain.id)}
                  aria-haspopup="dialog"
                  aria-expanded={modalDomainId === selectedDomain.id}
                  className="inline-flex items-center gap-1.5 text-theme-muted underline decoration-theme-border/60 underline-offset-4 transition-colors hover:text-theme-text hover:decoration-theme-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-text rounded-[2px]"
                >
                  {pt ? 'Detalhes técnicos' : 'Technical details'}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

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
