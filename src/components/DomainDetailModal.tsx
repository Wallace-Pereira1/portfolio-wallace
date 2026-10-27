import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export interface DomainDetailData {
  id: string;
  name: string;
  applicationDescription: string;
  technologies: string[];
  toolGroups?: {
    label: string;
    items: string;
  }[];
  practices: string[];
  relatedProjects: {
    id: string;
    title: string;
    url: string;
    highlight: string;
  }[];
}

export const domainDetailsPt: Record<string, DomainDetailData> = {
  frontend: {
    id: 'frontend',
    name: 'Front-end',
    applicationDescription:
      'Construção de interfaces reativas, acessíveis e com tipagem estrita de ponta a ponta, priorizando consistência visual, performance fluida e facilidade de manutenção.',
    technologies: ['React', 'TypeScript', 'Angular', 'Tailwind CSS'],
    practices: [
      'Componentização modular orientada a tokens de design e separação estrita de responsabilidades.',
      'Gerenciamento de estado previsível e atômico, eliminando re-renderizações desnecessárias.',
      'Validação de tipos estática ponta a ponta e bundling otimizado com Vite.',
    ],
    relatedProjects: [
      {
        id: '02',
        title: 'Plataforma de Investimentos',
        url: '/projetos/02',
        highlight: 'React, TypeScript e cálculo no browser',
      },
      {
        id: '03',
        title: 'Modernização ASP → Angular',
        url: '/projetos/03',
        highlight: 'Migração para SPA e redução de débitos técnicos',
      },
    ],
  },
  'apis-dados': {
    id: 'apis-dados',
    name: 'APIs & Dados',
    applicationDescription:
      'Desenvolvimento de APIs REST robustas e idempotentes com modelagem relacional consistente, autenticação segura e isolamento de dados via Row Level Security.',
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'APIs REST'],
    practices: [
      'Endpoints REST idempotentes com parsing rigoroso e sanitização de payloads de entrada.',
      'Políticas granulares de Row Level Security (RLS) garantindo isolamento total por usuário.',
      'Modelagem relacional normalizada com integridade referencial nativa e índices performáticos.',
    ],
    relatedProjects: [
      {
        id: '06',
        title: 'Sentinela Fiscal: Auditoria',
        url: '/projetos/06',
        highlight: 'PostgreSQL e trilha de auditoria relacional',
      },
      {
        id: '02',
        title: 'Plataforma de Investimentos',
        url: '/projetos/02',
        highlight: 'Supabase, PostgreSQL e políticas RLS',
      },
    ],
  },
  'automacoes-ia': {
    id: 'automacoes-ia',
    name: 'Integrações, Automações & IA',
    applicationDescription:
      'Integração e orquestração de eventos assíncronos conectando CRMs, ERPs, canais de mensageria e modelos de linguagem (LLMs) para automatizar fluxos operacionais e comerciais.',
    technologies: ['n8n', 'Make', 'APIs & Webhooks', 'LLMs', 'WhatsApp Business API'],
    toolGroups: [
      { label: 'CRM', items: 'Salesforce, RD Station e HubSpot.' },
      { label: 'ERP', items: 'Olist ERP.' },
      { label: 'Automação', items: 'n8n e Make.' },
      {
        label: 'Plataformas com as quais já trabalhei',
        items: 'Typebot, BotConversa, UChat, NicoChat e ManyChat.',
      },
    ],
    practices: [
      'Captura e ingestão em tempo real de mensagens e formulários via webhooks assíncronos.',
      'Orquestração de fluxos lógicos no n8n e Make com tratamento de exceções e filas de retentativa.',
      'Extração estruturada de dados, classificação com LLMs e automação de fluxos operacionais.',
    ],
    relatedProjects: [
      {
        id: '01',
        title: 'Agente de Qualificação Imobiliária',
        url: '/projetos/01',
        highlight: 'n8n, LLMs e WhatsApp Business API',
      },
      {
        id: '05',
        title: 'Pipeline de OCR & Documentos',
        url: '/projetos/05',
        highlight: 'Visão computacional e extração estruturada',
      },
    ],
  },
  'entrega-qualidade': {
    id: 'entrega-qualidade',
    name: 'Entrega & Qualidade',
    applicationDescription:
      'Estruturação de esteiras de integração e entrega contínua (CI/CD) com validação de build automatizada para garantir deploys previsíveis, reprodutíveis e estáveis.',
    technologies: ['Git', 'GitHub Actions', 'CI/CD', 'Vercel'],
    practices: [
      'Controle de versão com conventional commits e branches protegidas para integridade do histórico.',
      'Pipelines automatizados no GitHub Actions validando tipagem estrita, linting e integridade do build.',
      'Deploy global em nós de borda (edge CDN) com caching atômico e capacidade de rollback instantâneo.',
    ],
    relatedProjects: [
      {
        id: '03',
        title: 'Modernização ASP → Angular',
        url: '/projetos/03',
        highlight: 'Arquitetura modular e eliminação de débitos',
      },
      {
        id: '02',
        title: 'Plataforma de Investimentos',
        url: '/projetos/02',
        highlight: 'Deploy na Vercel Edge com pipeline contínuo',
      },
    ],
  },
};

export const domainDetailsEn: Record<string, DomainDetailData> = {
  frontend: {
    id: 'frontend',
    name: 'Front-end',
    applicationDescription:
      'Engineering modern, accessible reactive interfaces with end-to-end static typing, prioritizing visual precision, fluid performance, and long-term maintainability.',
    technologies: ['React', 'TypeScript', 'Angular', 'Tailwind CSS'],
    practices: [
      'Modular component architecture structured around design tokens and decoupled responsibilities.',
      'Predictable atomic state management eliminating unnecessary DOM re-renders.',
      'Strict static typing across modules with optimized Vite bundling.',
    ],
    relatedProjects: [
      {
        id: '02',
        title: 'Investment Portfolio Platform',
        url: '/projetos/02',
        highlight: 'React, TypeScript and client-side calculations',
      },
      {
        id: '03',
        title: 'Legacy ASP → Angular Overhaul',
        url: '/projetos/03',
        highlight: 'Single-page application overhaul and technical debt reduction',
      },
    ],
  },
  'apis-dados': {
    id: 'apis-dados',
    name: 'APIs & Data',
    applicationDescription:
      'Architecting resilient and idempotent REST APIs with consistent relational data modeling, secure authentication, and Row Level Security isolation.',
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'REST APIs'],
    practices: [
      'Idempotent REST endpoints with strict payload parsing and input sanitization.',
      'Granular Row Level Security (RLS) policies guaranteeing strict user data isolation.',
      'Normalized relational schema modeling with native referential integrity and performant indexing.',
    ],
    relatedProjects: [
      {
        id: '06',
        title: 'Fiscal Sentinel Audit System',
        url: '/projetos/06',
        highlight: 'PostgreSQL and relational audit trail architecture',
      },
      {
        id: '02',
        title: 'Investment Portfolio Platform',
        url: '/projetos/02',
        highlight: 'Supabase, PostgreSQL and Row Level Security',
      },
    ],
  },
  'automacoes-ia': {
    id: 'automacoes-ia',
    name: 'Integrations, Automations & AI',
    applicationDescription:
      'Asynchronous event integration and orchestration connecting CRMs, ERPs, messaging platforms, and LLMs to automate operational and commercial workflows.',
    technologies: ['n8n', 'Make', 'APIs & Webhooks', 'LLMs', 'WhatsApp Business API'],
    toolGroups: [
      { label: 'CRM', items: 'Salesforce, RD Station, and HubSpot.' },
      { label: 'ERP', items: 'Olist ERP.' },
      { label: 'Automation', items: 'n8n and Make.' },
      {
        label: 'Platforms I have worked with',
        items: 'Typebot, BotConversa, UChat, NicoChat, and ManyChat.',
      },
    ],
    practices: [
      'Real-time ingestion of inbound messages and form events via asynchronous webhooks.',
      'Logic flow orchestration in n8n and Make with error handling and retry queues.',
      'Structured data extraction, LLM classification, and operational flow automation.',
    ],
    relatedProjects: [
      {
        id: '01',
        title: 'Real Estate Autonomous Agent',
        url: '/projetos/01',
        highlight: 'n8n, LLMs and WhatsApp Business API',
      },
      {
        id: '05',
        title: 'OCR & Document Processing Pipeline',
        url: '/projetos/05',
        highlight: 'Computer vision and structured data extraction',
      },
    ],
  },
  'entrega-qualidade': {
    id: 'entrega-qualidade',
    name: 'Delivery & Quality',
    applicationDescription:
      'Continuous integration and deployment pipelines (CI/CD) with automated build verification for predictable, reproducible, and stable releases.',
    technologies: ['Git', 'GitHub Actions', 'CI/CD', 'Vercel'],
    practices: [
      'Version control with conventional commits and protected branches for commit integrity.',
      'Automated GitHub Actions pipelines enforcing strict typing, linting, and build validation.',
      'Continuous edge deployment with atomic caching, global nodes, and instant rollback capability.',
    ],
    relatedProjects: [
      {
        id: '03',
        title: 'Legacy ASP → Angular Overhaul',
        url: '/projetos/03',
        highlight: 'Sustainable modular architecture and technical modernization',
      },
      {
        id: '02',
        title: 'Investment Portfolio Platform',
        url: '/projetos/02',
        highlight: 'Vercel Edge deploy with automated validation pipeline',
      },
    ],
  },
};

interface DomainDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainId: string | null;
  language?: string;
  triggerElement?: HTMLElement | null;
}

export default function DomainDetailModal({
  isOpen,
  onClose,
  domainId,
  language = 'pt',
  triggerElement,
}: DomainDetailModalProps) {
  const isPt = language !== 'en';
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dataset = isPt ? domainDetailsPt : domainDetailsEn;
  const detail = domainId ? dataset[domainId] : null;

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll lock and keyboard focus trap
  useEffect(() => {
    if (!isOpen || !detail) return;

    // Save exact scroll position before locking
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap within modal
      if (e.key === 'Tab' && modalContainerRef.current) {
        const focusable = modalContainerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      // Guarantee scroll position is perfectly preserved
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
      window.removeEventListener('keydown', handleKeyDown);

      // Restore focus to trigger element on close
      if (triggerElement && typeof triggerElement.focus === 'function') {
        triggerElement.focus();
      }
    };
  }, [isOpen, detail, onClose, triggerElement]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Dialog Window */}
          <motion.div
            ref={modalContainerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="domain-modal-title"
            aria-describedby="domain-modal-desc"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] bg-theme-surface border border-theme-border rounded-[2px] shadow-2xl flex flex-col overflow-hidden z-10 my-auto text-theme-text"
          >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-theme-border bg-theme-surface shrink-0">
            <div className="space-y-0.5">
              <span className="text-[10px] sm:text-[10.5px] font-mono uppercase tracking-widest text-theme-muted block font-medium">
                {isPt ? 'Detalhes Técnicos' : 'Technical Specifications'}
              </span>
              <h2
                id="domain-modal-title"
                className="text-lg sm:text-xl font-serif font-medium text-theme-text tracking-tight"
              >
                {detail.name}
              </h2>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 -mr-1.5 rounded-[2px] text-theme-muted hover:text-theme-text hover:bg-theme-border/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-text"
              aria-label={isPt ? 'Fechar detalhes técnicos' : 'Close technical specifications'}
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-5 text-theme-text">
            {/* 1. Application Description */}
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-medium">
                {isPt ? 'Aplicação Prática' : 'Practical Application'}
              </h3>
              <p
                id="domain-modal-desc"
                className="text-xs sm:text-[13.5px] text-theme-dim leading-relaxed font-normal"
              >
                {detail.applicationDescription}
              </p>
            </div>

            {/* 2. Main Technologies (discrete text & tags) */}
            <div className="space-y-2 pt-1 border-t border-theme-border/50">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-medium">
                {isPt ? 'Tecnologias Principais' : 'Core Technologies'}
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {detail.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 text-xs font-mono bg-theme-bg border border-theme-border rounded-[2px] text-theme-text select-none"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tool & Platform Experience Groups (simple text list with small titles and natural line breaks) */}
            {detail.toolGroups && detail.toolGroups.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-theme-border/50">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-medium">
                  {isPt ? 'Experiências com Ferramentas & Plataformas' : 'Tools & Platforms Experience'}
                </h3>
                <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed">
                  {detail.toolGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                      <span className="font-mono text-theme-text font-medium text-[11px] sm:text-xs shrink-0">
                        {group.label}:
                      </span>
                      <span className="text-theme-dim break-words">
                        {group.items}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Confirmed Technical Practices (max 3) */}
            {detail.practices.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-theme-border/50">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-medium">
                  {isPt ? 'Práticas & Padrões' : 'Engineering Practices'}
                </h3>
                <ul className="space-y-2">
                  {detail.practices.map((practice, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-[13px] text-theme-dim leading-relaxed font-normal"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-theme-muted shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Real Related Projects (up to 2) */}
            {detail.relatedProjects.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-theme-border/50">
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-medium">
                  {isPt ? 'Projetos Relacionados' : 'Related Projects'}
                </h3>
                <div className="space-y-2">
                  {detail.relatedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-3 p-2.5 rounded-[2px] bg-theme-bg/60 border border-theme-border/60"
                    >
                      <div className="min-w-0">
                        <Link
                          to={proj.url}
                          onClick={onClose}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-theme-text hover:text-theme-accent transition-colors underline decoration-theme-border hover:decoration-theme-accent underline-offset-4"
                        >
                          <span>{proj.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        </Link>
                      </div>
                      <span className="text-[11px] font-mono text-theme-muted shrink-0">
                        {proj.highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
