import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Certifications from './Certifications';
import ExperienceDetailModal, { WorkExperienceItem } from './ExperienceDetailModal';

interface ExperienceSectionProps {
  showHeader?: boolean;
}

export default function ExperienceSection({ showHeader = true }: ExperienceSectionProps) {
  const { t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'trabalho' | 'educacao_certificados'>('trabalho');
  const [selectedExperience, setSelectedExperience] = useState<WorkExperienceItem | null>(null);

  const workExperiencesPt: WorkExperienceItem[] = [
    {
      company: 'Prata e Prata',
      role: 'Analista de Automação, Integrações e Operações Financeiras',
      period: 'Junho de 2026 — Presente',
      location: 'Rio de Janeiro, RJ · Remoto',
      summary: 'Responsável técnico pelo e-commerce e pelas integrações que conectam ERP, CRM, WhatsApp e as 10 lojas da marca, mantendo pedidos, estoque e cadastros de clientes sincronizados.',
      impact: 'Conectei pedidos, estoque e cadastros de clientes de 10 lojas e do e-commerce por APIs e webhooks, com tratamento de falhas e monitoramento.',
      technologies: ['Olist', 'APIs REST', 'Webhooks', 'WhatsApp API', 'GA4 & GTM', 'Cloudflare'],
      buttonText: 'VER EXPERIÊNCIA ↗',
      isCurrent: true,
      description: [
        'Administração técnica do e-commerce na Olist (antiga VNDA): customização em HTML, CSS, JavaScript e Liquid, versionamento no GitLab, gestão de homologação e produção, DNS e Cloudflare.',
        'Integração entre ERP, e-commerce e as 10 lojas via APIs e webhooks, para consulta e sincronização de pedidos, produtos, estoque e cadastros de clientes, com tratamento de falhas e monitoramento de tokens e credenciais.',
        'Integração do CRM e do WhatsApp Business ao cadastro de clientes e aos formulários de captação, com distribuição de contatos entre lojas e acompanhamento de falhas de envio.',
        'Implementação de rastreamento e mensuração: Meta Pixel, GA4, Google Tag Manager, eventos de conversão e UTMs, para atribuir a origem das vendas.',
        'Gestão de acessos, permissões, autenticação em dois fatores e credenciais de API, além de suporte técnico às lojas (equipamentos, rede e PDV).',
        'Mapeamento de relatórios e indicadores comerciais (vendas por loja, ticket médio, estoque e giro) e de oportunidades de automação com n8n e agentes de IA.'
      ]
    },
    {
      company: 'Conversão.ai',
      role: 'Desenvolvedor de IA & Full Stack',
      period: 'Junho de 2024 — Presente',
      location: 'Rio de Janeiro, RJ · Remoto',
      summary: 'Desenvolvi agentes de IA conversacionais e automações em n8n para atender e qualificar leads, integrando vendas, e-commerce e CRM, do mapeamento do escopo até a produção.',
      impact: 'Automatizei etapas manuais do atendimento e da qualificação de leads, com integrações em produção com Olist, Salesforce e RD Station.',
      technologies: ['n8n', 'Node.js', 'APIs REST', 'MySQL', 'Salesforce', 'RD Station', 'LLMs'],
      buttonText: 'VER EXPERIÊNCIA ↗',
      isCurrent: false,
      description: [
        'Conduzi projetos de IA de ponta a ponta: levantamento de escopo, cronograma, métricas de sucesso e implantação em produção, para soluções internas e para clientes.',
        'Projetei e mantive fluxos no n8n que conectam sistemas de vendas, e-commerce e CRM, removendo etapas manuais e gargalos da operação.',
        'Construí agentes conversacionais de atendimento e de qualificação de leads, com aquecimento antes do contato comercial, para melhorar a conversão e a experiência do cliente.',
        'Integrei a plataforma Olist por API para automatizar rotinas de vendas online e manter o estoque sincronizado entre os canais.',
        'Desenvolvi integrações em JavaScript e Node.js com APIs REST (JSON) e webhooks, apoiadas em consultas e modelagem em MySQL para garantir a consistência dos dados transacionais.',
        'Gerenciei e integrei CRMs: Salesforce para a visão corporativa, RD Station para réguas de relacionamento e Zoppy para retenção e pós-venda no e-commerce.',
        'Dei sustentação técnica às soluções entregues, acompanhando o uso pelas contas e ajustando o que fosse preciso para manter o atendimento eficiente.'
      ]
    },
    {
      company: 'Mestra Informática e Tecnologia',
      role: 'Desenvolvedor Front-end',
      period: 'Março de 2022 — Março de 2023',
      location: 'Rio de Janeiro, RJ',
      summary: 'Desenvolvimento e sustentação de interfaces empresariais com Angular e TypeScript, integradas a APIs REST e orientadas à evolução gradual de sistemas corporativos.',
      impact: 'Contribuí para modernizar o sistema legado ASP em uma arquitetura modular, com redução reportada de mais de 70% no tempo de carregamento.',
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'APIs REST', 'Design Systems'],
      buttonText: 'VER PROJETO RELACIONADO ↗',
      projectUrl: '#projetos',
      isCurrent: false,
      description: [
        'Desenvolvimento e sustentação de sistemas empresariais utilizando TypeScript e JavaScript.',
        'Implementação de interfaces de usuário escaláveis, seguras e performáticas utilizando o ecossistema Angular.',
        'Desenvolvimento de novas funcionalidades e manutenção preventiva e corretiva com foco em qualidade de código.',
        'Integração com APIs REST para conexão de dados e serviços auxiliares de negócio.',
        'Colaboração próxima com analistas de sistemas em todas as fases do ciclo de desenvolvimento, desde a prototipação até a entrega.',
        'Aplicação de boas práticas contínuas de engenharia de software e arquitetura limpa.'
      ]
    },
    {
      company: 'FORSOFT Academy',
      role: 'Bolsista de Desenvolvimento de Software',
      period: 'Abril de 2021 — Dezembro de 2021',
      location: 'Rio de Janeiro, Brasil',
      summary: 'Formação prática em fundamentos de computação, algoritmos, estruturas de dados e desenvolvimento com Java e JavaScript.',
      impact: 'Construí uma base técnica com exercícios práticos, lógica de programação e desenvolvimento orientado a objetos.',
      technologies: ['Java', 'JavaScript', 'Git', 'Algoritmos', 'Estruturas de Dados'],
      buttonText: 'VER EXPERIÊNCIA ↗',
      isCurrent: false,
      description: [
        'Capacitação intensiva em engenharia de software, fundamentos de computação, algoritmos, orientação a objetos com Java, manipulação de DOM com JavaScript e versionamento de código com Git.'
      ]
    }
  ];

  const workExperiencesEn: WorkExperienceItem[] = [
    {
      company: 'Prata e Prata',
      role: 'Automation, Integrations & Financial Operations Analyst',
      period: 'June 2026 — Present',
      location: 'Rio de Janeiro, RJ · Remote',
      summary: 'Technical owner of the e-commerce platform and of the integrations connecting ERP, CRM, WhatsApp and the brand’s 10 stores, keeping orders, inventory and customer records in sync.',
      impact: 'Connected orders, inventory and customer records across 10 stores and the online shop through APIs and webhooks, with failure handling and monitoring.',
      technologies: ['Olist', 'REST APIs', 'Webhooks', 'WhatsApp API', 'GA4 & GTM', 'Cloudflare'],
      buttonText: 'VIEW EXPERIENCE ↗',
      isCurrent: true,
      description: [
        'Technical administration of the Olist (formerly VNDA) e-commerce: customization in HTML, CSS, JavaScript and Liquid, GitLab version control, staging and production environments, DNS and Cloudflare.',
        'Integration between ERP, e-commerce and the 10 stores through APIs and webhooks to query and sync orders, products, inventory and customer records, with failure handling and token and credential monitoring.',
        'Integration of the CRM and WhatsApp Business with customer records and lead-capture forms, including contact distribution across stores and delivery-failure tracking.',
        'Implementation of tracking and measurement: Meta Pixel, GA4, Google Tag Manager, conversion events and UTMs, to attribute sales to their source.',
        'Access, permissions, two-factor authentication and API credential management, plus technical support for the stores (equipment, network and POS).',
        'Mapping of commercial reports and indicators (sales by store, average ticket, stock and turnover) and of automation opportunities with n8n and AI agents.'
      ]
    },
    {
      company: 'Conversão.ai',
      role: 'AI & Full Stack Developer',
      period: 'June 2024 — Present',
      location: 'Rio de Janeiro, RJ · Remote',
      summary: 'Built conversational AI agents and n8n automations to handle and qualify leads, integrating sales, e-commerce and CRM, from scoping to production.',
      impact: 'Automated manual steps in customer service and lead qualification, with live integrations with Olist, Salesforce and RD Station.',
      technologies: ['n8n', 'Node.js', 'REST APIs', 'MySQL', 'Salesforce', 'RD Station', 'LLMs'],
      buttonText: 'VIEW EXPERIENCE ↗',
      isCurrent: false,
      description: [
        'Led AI projects end to end: scoping, timelines, success metrics and production rollout, for internal and client-facing solutions.',
        'Designed and maintained n8n workflows connecting sales, e-commerce and CRM systems, removing manual steps and operational bottlenecks.',
        'Built conversational agents for customer service and lead qualification, warming leads up before the sales contact, to improve conversion and the customer experience.',
        'Integrated the Olist platform through its API to automate online-sales routines and keep inventory in sync across channels.',
        'Developed integrations in JavaScript and Node.js with REST APIs (JSON) and webhooks, backed by MySQL queries and data modeling to keep transactional data consistent.',
        'Managed and integrated CRMs: Salesforce for the corporate view, RD Station for relationship cadences, and Zoppy for e-commerce retention and post-sale.',
        'Provided technical support for the delivered solutions, following up with accounts and adjusting what was needed to keep service efficient.'
      ]
    },
    {
      company: 'Mestra Informática e Tecnologia',
      role: 'Front-end Developer',
      period: 'March 2022 — March 2023',
      location: 'Rio de Janeiro, RJ',
      summary: 'Development and maintenance of enterprise interfaces with Angular and TypeScript, integrated with REST APIs and focused on the gradual evolution of corporate systems.',
      impact: 'Contributed to modernizing a legacy ASP system into a modular architecture, with a reported 70%+ reduction in loading time.',
      technologies: ['Angular', 'TypeScript', 'JavaScript', 'REST APIs', 'Design Systems'],
      buttonText: 'VIEW RELATED PROJECT ↗',
      projectUrl: '#projetos',
      isCurrent: false,
      description: [
        'Development and modernization of enterprise systems utilizing TypeScript and JavaScript.',
        'Implementation of secure, modular, and performant user interfaces using the Angular framework.',
        'Engineering new features and maintaining production systems with high quality standards.',
        'Integration of REST APIs to add functional extensions and third-party services.',
        'Active collaboration with systems analysts across all project phases, from prototyping to final delivery.',
        'Continuous adoption of modern frontend engineering practices and decoupled component architecture.'
      ]
    },
    {
      company: 'FORSOFT Academy',
      role: 'Software Development Fellow',
      period: 'April 2021 — December 2021',
      location: 'Rio de Janeiro, Brazil',
      summary: 'Hands-on training in computer science fundamentals, algorithms, data structures, and development with Java and JavaScript.',
      impact: 'Built a technical foundation through practical coding, computational logic, and object-oriented development.',
      technologies: ['Java', 'JavaScript', 'Git', 'Algorithms', 'Data Structures'],
      buttonText: 'VIEW EXPERIENCE ↗',
      isCurrent: false,
      description: [
        'Intensive software engineering training covering core computer science foundations, algorithms, object-oriented programming in Java, JavaScript DOM interactions, and Git workflows.'
      ]
    }
  ];

  const workExperiences = language === 'pt' ? workExperiencesPt : workExperiencesEn;

  const languagesPt = [
    { name: 'Português', level: 'Nativo / Fluente' },
    { name: 'Inglês', level: 'Intermediário Operacional (Proficiência de Leitura Técnica, Escrita e Discussão Profissional)' }
  ];

  const languagesEn = [
    { name: 'Portuguese', level: 'Native / Fluent' },
    { name: 'English', level: 'Intermediate Working Proficiency (Technical Reading, Writing & Professional Discussion)' }
  ];

  const languages = language === 'pt' ? languagesPt : languagesEn;

  const handleActionClick = (exp: WorkExperienceItem) => {
    setSelectedExperience(exp);
  };

  return (
    <section
      id="experiencia"
      className="portfolio-section bg-transparent transition-colors"
    >
      <div className="portfolio-container space-y-6 md:space-y-8">
        {/* Section Header or Tabs Bar */}
        {showHeader ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pb-5">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-mono text-theme-muted uppercase tracking-widest block">
                {language === 'pt' ? 'Trajetória Profissional' : 'Professional Trajectory'}
              </span>
              <h2 className="font-serif text-2xl sm:text-[26px] leading-[1.15] font-medium text-theme-text tracking-[-0.015em]">
                {language === 'pt' ? 'Trajetória' : 'Experience'}
              </h2>
            </div>

            {/* Minimalist Monospace Tab Toggle */}
            <div className="md:col-span-4 flex md:justify-end">
              <div className="flex items-center gap-4 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('trabalho')}
                  className={`transition-colors cursor-pointer ${
                    activeTab === 'trabalho'
                      ? 'text-theme-text font-semibold underline underline-offset-4'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  {t('exp.tab.work')}
                </button>
                <span className="text-theme-border">/</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('educacao_certificados')}
                  className={`transition-colors cursor-pointer ${
                    activeTab === 'educacao_certificados'
                      ? 'text-theme-text font-semibold underline underline-offset-4'
                      : 'text-theme-muted hover:text-theme-text'
                  }`}
                >
                  {t('exp.tab.edu')}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-theme-muted">
              {activeTab === 'trabalho'
                ? (language === 'pt' ? 'Atuação Profissional' : 'Work History')
                : (language === 'pt' ? 'Formação & Certificados' : 'Education & Credentials')}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('trabalho')}
                className={`transition-colors cursor-pointer ${
                  activeTab === 'trabalho'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {t('exp.tab.work')}
              </button>
              <span className="text-theme-border">/</span>
              <button
                type="button"
                onClick={() => setActiveTab('educacao_certificados')}
                className={`transition-colors cursor-pointer ${
                  activeTab === 'educacao_certificados'
                    ? 'text-theme-text font-semibold underline underline-offset-4'
                    : 'text-theme-muted hover:text-theme-text'
                }`}
              >
                {t('exp.tab.edu')}
              </button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'trabalho' ? (
          <div className="divide-y divide-theme-border/70 border-b border-theme-border/70">
            {workExperiences.map((exp) => (
              <article key={exp.company} className="py-5 sm:py-6">
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h3 className="text-base sm:text-lg font-medium text-theme-text">{exp.company}</h3>
                      <span aria-hidden="true" className="text-theme-muted">—</span>
                      <p className="text-sm sm:text-[15px] text-theme-dim">{exp.role}</p>
                    </div>
                    <p className="text-[12px] font-mono text-theme-muted">
                      {exp.period} · {exp.location}
                    </p>
                  </div>
                  <p className="max-w-4xl text-sm sm:text-[15px] leading-relaxed text-theme-dim">
                    {exp.summary}
                  </p>

                  <details className="group pt-1">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm text-theme-text underline decoration-theme-border underline-offset-4 hover:decoration-theme-text focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text [&::-webkit-details-marker]:hidden">
                      {language === 'pt' ? 'Ver mais' : 'Read more'}
                      <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-3 space-y-3 pl-3 border-l border-theme-border/70">
                      {exp.impact && (
                        <ul className="list-disc pl-5 text-sm leading-relaxed text-theme-dim">
                          <li>
                            <strong className="font-semibold text-theme-text">{exp.impact.split(' ')[0]}</strong>{' '}
                            {exp.impact.slice(exp.impact.indexOf(' ') + 1)}
                          </li>
                        </ul>
                      )}
                      <p className="text-xs sm:text-[13px] leading-relaxed text-theme-muted">
                        <span className="text-theme-dim">{language === 'pt' ? 'Tecnologias: ' : 'Technologies: '}</span>
                        {exp.technologies.slice(0, 5).join(' · ')}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleActionClick(exp)}
                        className="inline-flex items-center gap-1.5 text-sm text-theme-text underline decoration-theme-border underline-offset-4 hover:decoration-theme-text focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-theme-text"
                      >
                        {exp.buttonText || (language === 'pt' ? 'Ver experiência completa' : 'View full experience')}
                      </button>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="space-y-8 md:space-y-10">
            {/* Education & Languages (12-col Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
              {/* Higher Education */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-theme-muted block">
                  {t('exp.edu.title')}
                </span>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-theme-text tracking-tight">
                    {t('exp.edu.degree')}
                  </h3>
                  <p className="text-sm font-medium text-theme-dim">
                    {t('exp.edu.inst')}
                  </p>
                  <p className="text-sm font-mono text-theme-muted">
                    {t('exp.edu.period')} · {t('exp.edu.status')}
                  </p>
                </div>
              </div>

              {/* Languages */}
              <div className="md:col-span-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-theme-muted block">
                  {t('exp.lang.title')}
                </span>
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="space-y-1">
                      <span className="text-base font-semibold text-theme-text block">
                        {lang.name}
                      </span>
                      <span className="text-sm font-mono text-theme-dim block">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Component */}
            <div>
              <Certifications />
            </div>
          </div>
        )}
      </div>

      {/* Detailed Experience Read More Modal */}
      <ExperienceDetailModal
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        experience={selectedExperience}
        language={language}
      />
    </section>
  );
}
