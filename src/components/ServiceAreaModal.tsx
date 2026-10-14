import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import TechBadge from './TechBadge';

export interface ServiceAreaDetail {
  id: string;
  name: string;
  enName: string;
  badge: string;
  enBadge: string;
  tagline: string;
  enTagline: string;
  description: string;
  enDescription: string;
  deliverables: string[];
  enDeliverables: string[];
  technologies: string[];
}

export const SERVICE_AREAS: ServiceAreaDetail[] = [
  {
    id: 'web_products',
    name: 'Produtos Web',
    enName: 'Web Products',
    badge: 'Front-end & Arquitetura',
    enBadge: 'Front-end & Architecture',
    tagline: 'Interfaces de alto impacto, velocidade sub-segundo e escalabilidade.',
    enTagline: 'High-impact interfaces, sub-second speed, and scalable architectures.',
    description:
      'Crio interfaces e produtos web rápidos, responsivos e fáceis de evoluir, transformando necessidades do negócio em experiências digitais eficientes.',
    enDescription:
      'I build fast, responsive, and easy-to-scale web interfaces and products, turning business needs into efficient digital experiences.',
    deliverables: [
      'Aplicações SPA e SSR com React, Next.js e Angular',
      'Design systems modulares com tipagem estrita em TypeScript',
      'Otimização de Core Web Vitals (LCP, INP, CLS) e tempo de carga',
      'Arquitetura de estado previsível (Zustand, Context API) e modo offline-first',
      'Dashboards operacionais, painéis administrativos e portais B2B',
    ],
    enDeliverables: [
      'Modular SPA and SSR applications using React, Next.js, and Angular',
      'Strictly-typed component design systems in TypeScript',
      'Core Web Vitals optimization (LCP, INP, CLS) and fast first-frame render',
      'Predictable reactive state architecture (Zustand, Context API) with offline-first support',
      'Operational dashboards, management panels, and B2B SaaS web applications',
    ],
    technologies: ['TypeScript', 'React', 'Angular', 'Tailwind CSS', 'Next.js', 'Zustand', 'Vite'],
  },
  {
    id: 'apis_data',
    name: 'APIs & Dados',
    enName: 'APIs & Data',
    badge: 'Back-end & Persistência',
    enBadge: 'Back-end & Persistence',
    tagline: 'Modelagem rigorosa, dados íntegros e comunicação segura entre serviços.',
    enTagline: 'Strict data modeling, referential integrity, and secure service communication.',
    description:
      'Estruturo APIs e dados tratados para conectar sistemas, organizar informações e apoiar decisões mais rápidas, seguras e confiáveis.',
    enDescription:
      'I design resilient APIs and structured data pipelines to connect systems, organize business information, and empower fast, safe decisions.',
    deliverables: [
      'APIs RESTful performáticas, seguras e com documentação clara',
      'Modelagem relacional e normalização em PostgreSQL e MySQL',
      'Segurança em nível de linha (Row Level Security / RLS) para isolamento de dados',
      'Validação estrita de contratos de dados em runtime com Zod',
      'Pipelines de tratamento, consultas indexadas e persistência resiliente',
    ],
    enDeliverables: [
      'Performant, secure, and clearly documented RESTful APIs',
      'Relational schema design, indexing, and normalization in PostgreSQL and MySQL',
      'Row Level Security (RLS) policies for multi-tenant data isolation',
      'Strict runtime data contract validation using Zod and schema parsers',
      'Data hygiene pipelines, optimized queries, and resilient persistence',
    ],
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'MySQL', 'APIs REST', 'DBeaver', 'Zod'],
  },
  {
    id: 'integrations',
    name: 'Integrações',
    enName: 'Integrations',
    badge: 'Ecossistema & Conectividade',
    enBadge: 'Ecosystem & Connectivity',
    tagline: 'Fim dos silos de informação e sincronização transparente de ferramentas.',
    enTagline: 'Eliminating data silos and unifying platforms seamlessly in real time.',
    description:
      'Conecto ERPs, CRMs, marketplaces e ferramentas internas para criar um ecossistema integrado, reduzir retrabalho e manter a operação fluindo.',
    enDescription:
      'I connect ERPs, CRMs, marketplaces, and internal tools to build an integrated ecosystem, eliminating rework and keeping operations flowing.',
    deliverables: [
      'Sincronização bidirecional com CRMs corporativos (Salesforce, RD Station, ARBO)',
      'Ingestão contínua de leads de canais de venda (OLX, portais, formulários)',
      'Arquitetura de Webhooks com autenticação HMAC, retries e tolerância a falhas',
      'Integração com serviços de mensageria, Google Calendar API, Cal.com e Calendly',
      'Conexão com meios de pagamento e emissão de notas/alertas',
    ],
    enDeliverables: [
      'Bi-directional synchronization with enterprise CRMs (Salesforce, RD Station, ARBO)',
      'Continuous inbound lead ingestion from sales portals, OLX, and messaging channels',
      'Resilient Webhook architecture with HMAC signatures, retries, and error handling',
      'Integration with messaging services, Google Calendar API, Cal.com, and Calendly for automated scheduling',
      'Payment gateway connectivity, invoice dispatch, and financial event hooks',
    ],
    technologies: ['APIs REST & Webhooks', 'Salesforce', 'RD Station', 'Google Calendar API', 'Cal.com', 'Calendly', 'WhatsApp Business API', 'OLX Ingestion'],
  },
  {
    id: 'automations',
    name: 'Automações',
    enName: 'Automations',
    badge: 'Hiperautomação de Processos',
    enBadge: 'Hyperautomation & Workflows',
    tagline: 'Menos tarefas manuais, zero erros de digitação e maior velocidade de entrega.',
    enTagline: 'Fewer manual tasks, zero copy-paste errors, and faster operational velocity.',
    description:
      'Automatizo tarefas e processos repetitivos para acelerar operações, reduzir erros e liberar o time para atividades de maior valor.',
    enDescription:
      'I automate manual and repetitive workflows to accelerate operations, reduce human error, and free your team for high-value strategic tasks.',
    deliverables: [
      'Scripts customizados em JavaScript, Python e Node.js para rotinas operacionais pesadas',
      'Tratamento, sanitização e normalização de dados em grande volume com processamento em lote',
      'Relatórios diários automatizados e dashboards com organização bem visual de indicadores',
      'Orquestração de pipelines complexos de dados e integrações com n8n e Make (Integromat)',
      'Disparo de alertas inteligentes e notificações transacionais em tempo real',
    ],
    enDeliverables: [
      'Custom scripts in JavaScript, Python, and Node.js for heavy-duty operational workloads',
      'High-volume data cleaning, processing, normalization, and automated batch pipelines',
      'Automated daily reporting, status summaries, and well-organized visual dashboards',
      'Complex multi-stage data orchestration and workflow automation via n8n and Make',
      'Real-time automated alerting, reporting, and transactional status dispatch',
    ],
    technologies: ['JavaScript', 'Python', 'Node.js', 'n8n', 'Make', 'Tratamento de Dados', 'Relatórios & Dashboards', 'Webhooks'],
  },
  {
    id: 'ai_applied',
    name: 'IA Aplicada',
    enName: 'Applied AI',
    badge: 'Agentes & Modelos de IA',
    enBadge: 'AI Agents & LLM Systems',
    tagline: 'IA produtiva, contextual e orientada a resultados concretos de negócio.',
    enTagline: 'Productive, context-grounded AI tailored for measurable business outcomes.',
    description:
      'Aplico IA, LLMs e agentes inteligentes em fluxos reais para qualificar oportunidades, apoiar equipes, processar informações e acelerar resultados comerciais.',
    enDescription:
      'I apply AI, LLMs, and autonomous agents in real-world workflows to qualify leads, empower teams, process complex information, and drive commercial growth.',
    deliverables: [
      'Agentes autônomos com execução de ferramentas (Tool Calling) e suporte 24/7',
      'Sistemas RAG (Retrieval-Augmented Generation) com busca vetorial em pgvector',
      'Processamento de documentos com OCR multimodal e extração estruturada (Zod)',
      'Triagem semântica de intenções de clientes com transbordo humano seguro',
      'Engenharia de prompts avançada, guardrails e orquestração de modelos (Gemini/OpenAI)',
    ],
    enDeliverables: [
      'Autonomous AI agents with tool execution (Tool Calling) and 24/7 automated qualification',
      'Retrieval-Augmented Generation (RAG) knowledge systems backed by pgvector',
      'Document OCR pipelines and structured multimodal schema extraction with Zod',
      'Real-time semantic intent triage with graceful human escalation paths',
      'Advanced prompt engineering, safety guardrails, and LLM orchestration (Gemini/OpenAI)',
    ],
    technologies: ['LLMs', 'Gemini', 'OpenAI', 'pgvector', 'Visão Computacional & OCR', 'Agentes Autônomos', 'Zod Schemas'],
  },
];

interface ServiceAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  areaId: string | null;
  onSelectArea: (id: string) => void;
  language: 'pt' | 'en';
}

export default function ServiceAreaModal({
  isOpen,
  onClose,
  areaId,
  onSelectArea,
  language,
}: ServiceAreaModalProps) {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const isPt = language === 'pt';

  const currentArea =
    SERVICE_AREAS.find((a) => a.id === areaId) || SERVICE_AREAS[0];

  const currentIndex = SERVICE_AREAS.findIndex((a) => a.id === currentArea.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < SERVICE_AREAS.length - 1;

  const goToPrev = () => {
    if (hasPrev) {
      onSelectArea(SERVICE_AREAS[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      onSelectArea(SERVICE_AREAS[currentIndex + 1].id);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset scroll on area change and auto-center the active tab
  useEffect(() => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTop = 0;
    }
    if (tabListRef.current) {
      const activeBtn = tabListRef.current.querySelector<HTMLElement>('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  }, [currentArea.id]);

  const handleTabMouseDown = (e: React.MouseEvent) => {
    if (!tabListRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - tabListRef.current.offsetLeft;
    scrollLeftRef.current = tabListRef.current.scrollLeft;
  };

  const handleTabMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !tabListRef.current) return;
    e.preventDefault();
    const x = e.pageX - tabListRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
    }
    tabListRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleTabMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Handle escape & arrow keys and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        goToPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, hasPrev, hasNext, currentIndex]);

  if (!mounted) return null;

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('contato');
      if (el) {
        const navOffset = 76;
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 150);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] overflow-y-auto p-3 sm:p-5 md:p-6 flex items-center justify-center">
          {/* Backdrop with smooth fade-out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card with smooth fade-out and slight scale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-theme-surface border border-theme-border rounded-[2px] shadow-2xl flex flex-col max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] md:max-h-[84vh] z-10 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
          {/* Quick Domain Switcher Strip */}
          <div className="relative shrink-0 border-b border-theme-border/60 bg-theme-bg/60">
            <div
              ref={tabListRef}
              onMouseDown={handleTabMouseDown}
              onMouseMove={handleTabMouseMove}
              onMouseUp={handleTabMouseUpOrLeave}
              onMouseLeave={handleTabMouseUpOrLeave}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none touch-pan-x"
            >
              {SERVICE_AREAS.map((area) => {
                const active = area.id === currentArea.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    data-active={active}
                    onClick={(e) => {
                      if (hasMovedRef.current) {
                        e.preventDefault();
                        return;
                      }
                      onSelectArea(area.id);
                    }}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] text-[11px] sm:text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-theme-text text-theme-bg font-semibold shadow-xs'
                        : 'text-theme-muted hover:text-theme-text hover:bg-theme-border/40'
                    }`}
                  >
                    <span>{isPt ? area.name : area.enName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div
            ref={modalScrollRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 text-theme-text"
          >
            {/* Header: Area Title, Badge & Main Statement */}
            <div className="space-y-2.5 border-b border-theme-border/50 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-widest text-theme-muted px-2 py-0.5 border border-theme-border/60 rounded-[2px]">
                  {isPt ? currentArea.badge : currentArea.enBadge}
                </span>
              </div>

              <h2
                id="service-modal-title"
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-theme-text uppercase leading-snug"
              >
                {isPt ? currentArea.name : currentArea.enName}
              </h2>

              {/* Exact statement from the brief */}
              <div className="p-3.5 sm:p-4 rounded-[2px] bg-theme-bg/80 border border-theme-border/70 border-l-2 border-l-theme-text">
                <p className="text-xs sm:text-sm md:text-[14px] text-theme-text leading-relaxed font-medium">
                  "{isPt ? currentArea.description : currentArea.enDescription}"
                </p>
              </div>

              <p className="text-[11px] sm:text-xs text-theme-muted font-mono">
                {isPt ? currentArea.tagline : currentArea.enTagline}
              </p>
            </div>

            {/* Practical Deliverables: How Wallace Delivers in this Area */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-theme-text" />
                <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold">
                  {isPt ? 'Entregas Práticas & Soluções' : 'Practical Deliverables & Solutions'}
                </h3>
              </div>

              <ul className="space-y-2 pt-0.5">
                {(isPt ? currentArea.deliverables : currentArea.enDeliverables).map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[12.5px] md:text-[13px] text-theme-dim leading-relaxed"
                    >
                      <span className="text-theme-text font-mono text-[11px] mt-0.5 select-none font-bold">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Core Technologies for this Area */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-theme-muted" />
                <h3 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-theme-muted font-semibold">
                  {isPt ? 'Tecnologias & Ferramentas Usadas' : 'Technologies & Stack'}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5">
                {currentArea.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} language={language} size="sm" />
                ))}
              </div>
            </div>

            {/* Direct Collaboration CTA */}
            <div className="p-3.5 sm:p-4 rounded-[2px] bg-theme-bg/60 border border-theme-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-wider text-theme-muted block font-semibold">
                  {isPt ? 'PROJETOS OU DEMANDAS NESSA ÁREA?' : 'PROJECTS IN THIS AREA?'}
                </span>
                <p className="text-[11.5px] sm:text-xs text-theme-dim">
                  {isPt
                    ? 'Disponível para construir do zero ou evoluir sua operação existente.'
                    : 'Available to build from scratch or scale existing business workflows.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-[2px] bg-theme-text text-theme-bg text-[11px] sm:text-xs font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isPt ? 'Iniciar conversa' : 'Start conversation'}</span>
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 border-t border-theme-border/70 bg-theme-bg/60 text-xs font-mono">
            <span className="text-theme-muted text-[10.5px] sm:text-[11px]">
              0{currentIndex + 1} / 0{SERVICE_AREAS.length}
            </span>

            <div className="flex items-center gap-2">
              {/* Seta esquerda e direita ao lado de Fechar */}
              <div className="flex items-center border border-theme-border rounded-[2px] bg-theme-surface overflow-hidden">
                <button
                  type="button"
                  onClick={goToPrev}
                  disabled={!hasPrev}
                  className="p-1.5 hover:bg-theme-border/40 text-theme-muted hover:text-theme-text disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer border-r border-theme-border/40"
                  aria-label={isPt ? 'Área anterior' : 'Previous area'}
                  title={isPt ? 'Área anterior' : 'Previous area'}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  disabled={!hasNext}
                  className="p-1.5 hover:bg-theme-border/40 text-theme-muted hover:text-theme-text disabled:opacity-25 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label={isPt ? 'Próxima área' : 'Next area'}
                  title={isPt ? 'Próxima área' : 'Next area'}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-theme-border bg-theme-surface hover:bg-theme-border/40 text-theme-text transition-colors cursor-pointer text-[11px] sm:text-xs"
              >
                <span>{isPt ? 'Fechar' : 'Close'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>,
  document.body
);
}
