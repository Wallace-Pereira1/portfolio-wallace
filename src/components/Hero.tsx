import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileDown, Mail, MessageCircle, ArrowRight, MapPin, Activity, Layers, Cpu, Compass } from 'lucide-react';
import { downloadResumePdf } from '../utils/generateResumePdf';
import TechBadge from './TechBadge';
import ServiceAreaModal from './ServiceAreaModal';
import { trackEvent } from '../utils/analytics';
import { projectsEn, projectsPt } from '../data/projects';

export default function Hero() {
  const { language } = useApp();
  const portfolioProjectCount = (language === 'pt' ? projectsPt : projectsEn)
    .filter((project) => !project.disabled).length;
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Parallax discreto na camada decorativa de fundo (apenas mouse e sem prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !hasFinePointer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      rafId.current = null;
      if (!bgRef.current) return;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      bgRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();

      if (e.clientY < rect.top - 50 || e.clientY > rect.bottom + 50) return;

      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Deslocamento máximo calibrado entre 5px e 8px
      targetX = Math.max(-8, Math.min(8, normX * 8));
      targetY = Math.max(-6, Math.min(6, normY * 6));

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (heroEl) {
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    const targetId = id === 'competencias' ? 'tecnologias' : id;
    const el = document.getElementById(targetId) || document.getElementById(id);
    if (el) {
      const navOffset = 76;
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const [selectedServiceArea, setSelectedServiceArea] = useState<string | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const handleOpenServiceModal = (id: string) => {
    setSelectedServiceArea(id);
    setIsServiceModalOpen(true);
  };

  const coreStack = [
    'TypeScript',
    'React',
    'Angular',
    'Node.js',
    'PostgreSQL',
    'n8n',
    'APIs REST',
    'LLMs',
  ];

  const engineeringDomains = language === 'pt'
    ? [
        { id: 'web_products', name: 'Produtos Web', desc: 'SPAs, Design Systems & Performance' },
        { id: 'apis_data', name: 'APIs & Dados', desc: 'REST, PostgreSQL & Modelagem' },
        { id: 'integrations', name: 'Integrações', desc: 'Webhooks, ERPs & CRMs' },
        { id: 'automations', name: 'Automações', desc: 'Pipelines n8n & Rotinas de Negócio' },
        { id: 'ai_applied', name: 'IA Aplicada', desc: 'Modelos LLM, RAG & Agentes' },
      ]
    : [
        { id: 'web_products', name: 'Web Products', desc: 'SPAs, Design Systems & Performance' },
        { id: 'apis_data', name: 'APIs & Data', desc: 'REST, PostgreSQL & Schema Design' },
        { id: 'integrations', name: 'Integrations', desc: 'Webhooks, ERPs & CRMs' },
        { id: 'automations', name: 'Automations', desc: 'n8n Pipelines & Business Logic' },
        { id: 'ai_applied', name: 'Applied AI', desc: 'LLM Integration, RAG & Agents' },
      ];

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[100dvh] flex flex-col justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 bg-transparent px-6 md:px-12 transition-colors overflow-hidden snap-start snap-always scroll-mt-0"
    >
      {/* Camada Decorativa de Parallax Sutil de Fundo */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-[-15px] pointer-events-none overflow-hidden select-none z-0 will-change-transform opacity-60"
        style={{
          transform: 'translate3d(0, 0, 0)',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 85%)',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full text-theme-text opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bento-fine-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 7" />
              <circle cx="20" cy="20" r="0.6" fill="currentColor" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bento-fine-grid)" />
        </svg>

        {/* Marcadores geométricos discretos */}
        <div className="absolute top-20 sm:top-24 left-10 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
        <div className="absolute top-20 sm:top-24 right-10 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
        <div className="absolute bottom-8 left-12 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
        <div className="absolute bottom-8 right-12 text-theme-text opacity-[0.06] font-mono text-[9px]">+</div>
      </div>

      {/* Conteúdo Principal — Bento Grid Editorial com escala calibrada (-15% zoom feel) */}
      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-3 sm:space-y-3.5">
        {/* Bento Grid (5 Blocos Harmônicos e Perfeitamente Proporcionados) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
          
          {/* 1. BLOCO PRINCIPAL (Maior bloco do grid - 8 colunas no Desktop) */}
          <div className="order-1 sm:col-span-2 landscape:col-span-2 lg:col-span-8 bg-theme-surface border border-theme-border hover:border-theme-muted/80 rounded-[2px] p-5 sm:p-6 md:p-6.5 flex flex-col justify-between transition-all duration-200 offset-card group">
            <div className="space-y-3">
              {/* Título editorial: nome como assinatura discreta + frase de posicionamento */}
              <div className="pt-0.5">
                <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-theme-muted mb-4">
                  {language === 'pt' ? 'Desenvolvedor Full Stack & Automações' : 'Full Stack Developer & Automations'}
                </p>
                <h1 className="font-serif text-[clamp(1.9rem,3.8vw,3.1rem)] font-medium tracking-[-0.02em] leading-[1.08] text-theme-text max-w-[20ch] sm:max-w-[24ch]">
                  Wallace Pereira
                </h1>
              </div>

              {/* Texto Editorial e Ações na Mesma Altura */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pt-3">
                <p className="text-sm sm:text-[15px] text-theme-dim leading-relaxed font-normal max-w-xl">
                  {language === 'pt'
                    ? 'Desenvolvo aplicações web e integrações com React, Angular, Node.js e PostgreSQL. Também construo automações com n8n e agentes de IA para reduzir tarefas manuais e melhorar operações.'
                    : 'I build web applications and integrations with React, Angular, Node.js, and PostgreSQL. I also develop automations with n8n and AI agents to eliminate manual tasks and streamline operations.'}
                </p>

                {/* Ações: Currículo, Contato e WhatsApp */}
                {/* Ações: WhatsApp (destaque principal), Currículo e Contato */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/5521999688381?text=${encodeURIComponent(
                      language === 'pt'
                        ? 'Olá, Wallace! Vi seu portfólio e gostaria de conversar sobre uma oportunidade / projeto.'
                        : 'Hello, Wallace! I came across your portfolio and would like to talk about an opportunity / project.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-theme-bg bg-theme-text hover:opacity-90 rounded-[2px] transition-opacity font-semibold cursor-pointer shadow-sm group/wa whitespace-nowrap"
                    title={language === 'pt' ? 'Conversar no WhatsApp com texto pronto' : 'Chat on WhatsApp with preset message'}
                  >
                    <MessageCircle className="w-3.5 h-3.5 transition-transform group-hover/wa:-translate-y-0.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('resume_download');
                      downloadResumePdf(language);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-theme-dim hover:text-theme-text bg-theme-bg/50 hover:bg-theme-bg border border-theme-border hover:border-theme-muted rounded-[2px] transition-colors cursor-pointer group/btn whitespace-nowrap"
                    title={language === 'pt' ? 'Baixar Currículo em PDF' : 'Download Resume as PDF'}
                  >
                    <FileDown className="w-3.5 h-3.5 opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                    <span>{language === 'pt' ? 'Currículo' : 'Resume'}</span>
                  </button>

                  <a
                    href="#contato"
                    onClick={(e) => {
                      e.preventDefault();
                      trackEvent('contact_click');
                      scrollToSection('contato');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-theme-dim hover:text-theme-text bg-theme-bg/50 hover:bg-theme-bg border border-theme-border hover:border-theme-muted rounded-[2px] transition-colors cursor-pointer group/contact whitespace-nowrap"
                    title={language === 'pt' ? 'Ir para a seção de Contato' : 'Go to Contact section'}
                  >
                    <Mail className="w-3.5 h-3.5 opacity-80 group-hover/contact:opacity-100 transition-opacity" />
                    <span>{language === 'pt' ? 'Contato' : 'Contact'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. BLOCO DE STATUS (4 colunas no Desktop, equilibrando a linha superior) */}
          <div className="order-2 sm:col-span-1 landscape:col-span-1 md:col-span-1 lg:col-span-4 bg-theme-surface border border-theme-border hover:border-theme-muted/80 rounded-[2px] p-5 sm:p-5.5 flex flex-col justify-between transition-all duration-200 offset-card">
            <div className="space-y-3">
              <div className="flex items-center justify-end">
                <Activity className="w-3.5 h-3.5 text-theme-muted" />
              </div>

              {/* Status Information (Clean, Monochromatic, Editorial) */}
              <div className="space-y-0.5">
                <p className="text-xs sm:text-[12.5px] font-mono font-medium text-theme-text leading-snug">
                  {language === 'pt' ? 'Aberto a vagas full stack' : 'Open to full stack roles'}
                </p>
                <p className="text-[10.5px] font-mono text-theme-muted">
                  {language === 'pt' ? 'Remoto ou híbrido, com base no Rio' : 'Remote or hybrid, based in Rio'}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1.5 text-xs font-mono border-t border-theme-border/50">
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-theme-muted block">
                    {language === 'pt' ? 'Localização' : 'Location'}
                  </span>
                  <p className="text-theme-text font-medium mt-0.5 flex items-center gap-1 text-[11.5px]">
                    <MapPin className="w-3 h-3 text-theme-muted shrink-0" />
                    <span>Rio de Janeiro, BR</span>
                  </p>
                </div>
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-theme-muted block">
                    {language === 'pt' ? 'Modalidade' : 'Mode'}
                  </span>
                  <p className="text-theme-text font-medium mt-0.5 text-[11.5px]">
                    {language === 'pt' ? 'Remoto · Híbrido' : 'Remote · Hybrid'}
                  </p>
                </div>
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-theme-muted block">
                    {language === 'pt' ? 'Experiência' : 'Experience'}
                  </span>
                  <p className="text-theme-text font-medium mt-0.5 text-[11.5px]">
                    {language === 'pt' ? '4+ anos' : '4+ years'}
                  </p>
                </div>
                <div>
                  <span className="text-[9.5px] uppercase tracking-wider text-theme-muted block">
                    {language === 'pt' ? 'Atuação' : 'Focus'}
                  </span>
                  <p className="text-theme-text font-medium mt-0.5 text-[11.5px]">
                    {language === 'pt' ? 'Full Stack' : 'Full Stack'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 text-[10.5px] font-mono text-theme-dim border-t border-theme-border/40 flex items-center justify-between">
              <span>{language === 'pt' ? 'Disponibilidade imediata' : 'Immediate availability'}</span>
              <span className="text-theme-muted font-mono text-[9.5px] uppercase tracking-wider">
                {language === 'pt' ? 'ATIVO' : 'ACTIVE'}
              </span>
            </div>
          </div>

          {/* 3. BLOCO DE DOMÍNIOS (4 colunas na linha inferior) */}
          <div
            className="order-3 sm:col-span-1 landscape:col-span-1 md:col-span-1 lg:col-span-4 bg-theme-surface border border-theme-border hover:border-theme-muted/80 rounded-[2px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 offset-card group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted">
                  {language === 'pt' ? 'Atuação & Entregas' : 'Focus & Deliveries'}
                </span>
                <Layers className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text transition-colors" />
              </div>

              {/* Lista dos 5 domínios clicáveis */}
              <div className="space-y-1.5 pt-0.5">
                {engineeringDomains.map((dom) => (
                  <button
                    key={dom.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenServiceModal(dom.id);
                    }}
                    className="w-full flex items-center justify-between text-xs py-1.5 px-2.5 bg-theme-bg/50 hover:bg-theme-card border border-theme-border/50 hover:border-theme-muted rounded-[2px] text-left transition-all duration-150 group/item cursor-pointer"
                    title={language === 'pt' ? `Ver detalhes de ${dom.name}` : `View details for ${dom.name}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-theme-muted group-hover/item:bg-theme-text transition-colors shrink-0" />
                      <span className="font-mono text-theme-text font-medium text-[11px] truncate group-hover/item:text-theme-text">
                        {dom.name}
                      </span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-theme-muted group-hover/item:text-theme-text transition-transform group-hover/item:translate-x-0.5 shrink-0 opacity-40 group-hover/item:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            <div
              onClick={() => handleOpenServiceModal('web_products')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenServiceModal('web_products');
                }
              }}
              className="mt-2.5 pt-2 text-[9.5px] font-mono text-theme-muted flex items-center justify-between border-t border-theme-border/40 hover:text-theme-text cursor-pointer transition-colors"
            >
              <span className="group-hover:text-theme-text transition-colors">
                {language === 'pt' ? 'Clique em cada área para ver como ajudo' : 'Click any track to view how I help'}
              </span>
              <span className="text-theme-dim group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </div>

          {/* 4. BLOCO DE STACK PRINCIPAL (Lado a lado com Bloco 5 no landscape) */}
          <div className="order-4 sm:col-span-1 landscape:col-span-1 md:col-span-1 lg:col-span-5 bg-theme-surface border border-theme-border hover:border-theme-muted/80 rounded-[2px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 offset-card">
            <div className="space-y-2.5">
              <div className="flex items-center justify-end">
                <Cpu className="w-3.5 h-3.5 text-theme-muted" />
              </div>

              {/* Grid de Ícones das Tecnologias Suportadas com Legendinha / Tooltip */}
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                {coreStack.map((tech) => (
                  <TechBadge
                    key={tech}
                    tech={tech}
                    language={language}
                    size="sm"
                    fullWidth={true}
                    className="[&>button]:py-1.5 [&>button]:px-2.5 [&>button]:gap-2"
                  />
                ))}
              </div>
            </div>

            <div className="mt-2.5 pt-2 text-[9.5px] font-mono text-theme-muted flex items-center border-t border-theme-border/40">
              <span>{language === 'pt' ? 'Tecnologias em ambiente produtivo' : 'Technologies in production envs'}</span>
            </div>
          </div>

          {/* 5. BLOCO DE NAVEGAÇÃO (Lado a lado com Bloco 4 no landscape) */}
          <div className="order-5 sm:col-span-1 landscape:col-span-1 md:col-span-1 lg:col-span-3 bg-theme-surface border border-theme-border hover:border-theme-muted/80 rounded-[2px] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 offset-card group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-end">
                <Compass className="w-3.5 h-3.5 text-theme-muted" />
              </div>

              {/* Resumo com links rápidos */}
              <div className="space-y-1 text-xs font-mono pt-0.5">
                <div
                  onClick={() => scrollToSection('projetos')}
                  className="flex items-center justify-between text-theme-dim hover:text-theme-text py-0.5 cursor-pointer transition-colors group/item"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('projetos'); }}
                >
                  <span className="text-[11px] group-hover/item:text-theme-text transition-colors">
                    {language === 'pt'
                      ? `${portfolioProjectCount} ${portfolioProjectCount === 1 ? 'projeto no portfólio' : 'projetos no portfólio'}`
                      : `${portfolioProjectCount} ${portfolioProjectCount === 1 ? 'project in portfolio' : 'projects in portfolio'}`}
                  </span>
                  <span className="text-theme-muted group-hover/item:translate-x-0.5 transition-transform">→</span>
                </div>
                <div
                  onClick={() => scrollToSection('experiencia')}
                  className="flex items-center justify-between text-theme-dim hover:text-theme-text py-0.5 cursor-pointer transition-colors group/item"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('experiencia'); }}
                >
                  <span className="text-[11px] group-hover/item:text-theme-text transition-colors">{language === 'pt' ? 'Trajetória & Experiências' : 'Career & Experience'}</span>
                  <span className="text-theme-muted group-hover/item:translate-x-0.5 transition-transform">→</span>
                </div>
                <div
                  onClick={() => scrollToSection('tecnologias')}
                  className="flex items-center justify-between text-theme-dim hover:text-theme-text py-0.5 cursor-pointer transition-colors group/item"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('tecnologias'); }}
                >
                  <span className="text-[11px] group-hover/item:text-theme-text transition-colors">{language === 'pt' ? 'Domínios Técnicos' : 'Technical Domains'}</span>
                  <span className="text-theme-muted group-hover/item:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            </div>

            {/* Botão Ver Projetos */}
            <div className="pt-2.5 border-t border-theme-border/60">
              <button
                type="button"
                onClick={() => scrollToSection('projetos')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-theme-bg hover:bg-theme-text hover:text-theme-bg text-theme-text border border-theme-border hover:border-theme-text rounded-[2px] transition-all font-mono text-[11px] uppercase tracking-wider font-semibold cursor-pointer group/btn"
              >
                <span>{language === 'pt' ? 'VER PROJETOS' : 'VIEW PROJECTS'}</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <ServiceAreaModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        areaId={selectedServiceArea}
        onSelectArea={(id) => setSelectedServiceArea(id)}
        language={language}
      />
    </section>
  );
}
