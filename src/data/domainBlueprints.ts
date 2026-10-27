export interface BlueprintStep {
  step: string;
  name: string;
  tech: string;
  metric: string;
  description: string;
}

export interface DomainProofProject {
  id: string;
  title: string;
  role: string;
  highlight: string;
}

export interface DomainBlueprintData {
  index: string;
  pipelineTitle: string;
  pipelineSubtitle: string;
  guaranteeBadge: string;
  steps: BlueprintStep[];
  provenProjects: DomainProofProject[];
}

export const domainBlueprintsPt: Record<string, DomainBlueprintData> = {
  '01': {
    index: '01',
    pipelineTitle: 'Pipeline de Renderização & Estado Client-side',
    pipelineSubtitle: 'Fluxo reativo com latência sub-16ms, tipagem estrita e zero-lag no DOM',
    guaranteeBadge: '60 FPS · Zero Any · Clean Architecture',
    steps: [
      {
        step: '01',
        name: 'Interface & Eventos',
        tech: 'React 19 / Angular',
        metric: 'Acessível (a11y)',
        description: 'Componentização modular orientada a tokens de design e eventos desacoplados.',
      },
      {
        step: '02',
        name: 'Estado Reativo',
        tech: 'Zustand / Signals',
        metric: 'Zero overhead',
        description: 'Gerenciamento de estado atômico com mutações previsíveis e sem re-renders inúteis.',
      },
      {
        step: '03',
        name: 'Build & Otimização',
        tech: 'Vite / TypeScript',
        metric: 'Strict Types',
        description: 'Compilação ultrarrápida, tree-shaking rigoroso e validação estática completa.',
      },
      {
        step: '04',
        name: 'DOM & Design System',
        tech: 'Tailwind CSS',
        metric: 'Sub-16ms Paint',
        description: 'Renderização visual fluida com classes utilitárias e paleta semântica Dark/Light.',
      },
    ],
    provenProjects: [
      {
        id: '02',
        title: 'Plataforma de Investimentos',
        role: 'Full Stack & UI',
        highlight: 'React · Zustand · D3 · Cálculo sub-16ms no browser',
      },
      {
        id: '03',
        title: 'Modernização ASP → Angular',
        role: 'Front-end Engineer',
        highlight: 'Angular · TypeScript · SPA · 70% menos tempo de carga',
      },
      {
        id: '04',
        title: 'Totem Digital Bistrô',
        role: 'Front-end & UX',
        highlight: 'React · Tailwind · Interface tátil responsiva',
      },
    ],
  },
  '02': {
    index: '02',
    pipelineTitle: 'Pipeline de Dados & Gateway de APIs',
    pipelineSubtitle: 'Roteamento seguro com autorização a nível de linha e integridade relacional',
    guaranteeBadge: 'ACID · Row Level Security · Idempotência',
    steps: [
      {
        step: '01',
        name: 'Ingestão & Validação',
        tech: 'REST / Webhooks',
        metric: 'Schema Validation',
        description: 'Endpoints REST idempotentes com parsing rigoroso e sanitização de payloads.',
      },
      {
        step: '02',
        name: 'Gateway de Negócio',
        tech: 'Node.js / Express',
        metric: 'Async Non-blocking',
        description: 'Camada de serviços desacoplada com tratamento centralizado de erros e regras de negócio.',
      },
      {
        step: '03',
        name: 'Controle de Acesso',
        tech: 'Supabase Auth / RLS',
        metric: 'Zero-trust DB',
        description: 'Políticas de Row Level Security garantindo isolamento total por usuário/tenant.',
      },
      {
        step: '04',
        name: 'Persistência Relacional',
        tech: 'PostgreSQL / MySQL',
        metric: 'ACID Compliance',
        description: 'Modelagem normalizada, índices performáticos e integridade referencial nativa.',
      },
    ],
    provenProjects: [
      {
        id: '02',
        title: 'Plataforma de Investimentos',
        role: 'Full Stack & DB',
        highlight: 'Supabase · PostgreSQL · Políticas RLS · Sincronização Assíncrona',
      },
      {
        id: '06',
        title: 'Sentinela Fiscal: Auditoria',
        role: 'Back-end & DB',
        highlight: 'PostgreSQL · Auditoria relacional · Migrations e trilhas',
      },
      {
        id: '01',
        title: 'Agente Imobiliário',
        role: 'API & Integrations',
        highlight: 'PostgreSQL / Supabase · Webhooks de mensageria · CRM REST',
      },
    ],
  },
  '03': {
    index: '03',
    pipelineTitle: 'Pipeline Autônomo de Automação & IA',
    pipelineSubtitle: 'Orquestração de eventos, extração multimodal e transbordo humano seguro',
    guaranteeBadge: '24/7 Autônomo · Multimodal · RAG Seguro',
    steps: [
      {
        step: '01',
        name: 'Gatilho de Evento',
        tech: 'Webhook / WhatsApp',
        metric: 'Instant Trigger',
        description: 'Captura em tempo real de mensagens, leads e documentos via APIs de canais.',
      },
      {
        step: '02',
        name: 'Orquestrador de Fluxos',
        tech: 'n8n Workflow Engine',
        metric: 'Resilient Retries',
        description: 'Automação de nós lógicos com branches condicionais e filas de reprocessamento.',
      },
      {
        step: '03',
        name: 'Motor Cognitivo & OCR',
        tech: 'LLMs / Gemini / OCR',
        metric: 'JSON Estruturado',
        description: 'Extração semântica, classificação de intenção e parsing de imagens/PDFs.',
      },
      {
        step: '04',
        name: 'Sincronização & Ação',
        tech: 'CRM / Notificações',
        metric: 'Human Handoff',
        description: 'Atualização no sistema de origem (CRM/ERP) ou escalonamento assistido à equipe.',
      },
    ],
    provenProjects: [
      {
        id: '01',
        title: 'Agente de Qualificação Imobiliária',
        role: 'Engenheiro de IA & Automação',
        highlight: 'n8n · LLM · CRM ARBO · OCR de Placas · Agenda Google',
      },
      {
        id: '05',
        title: 'Pipeline de OCR & Documentos',
        role: 'Engenheiro de Automação',
        highlight: 'OCR · Visão Computacional · n8n · Extração estruturada de NF',
      },
      {
        id: '06',
        title: 'Sentinela Fiscal: Auditoria',
        role: 'Automação de Processos',
        highlight: 'Monitoramento contínuo de webhooks e alertas automáticos',
      },
    ],
  },
  '04': {
    index: '04',
    pipelineTitle: 'Pipeline de Entrega Contínua & Confiabilidade',
    pipelineSubtitle: 'Do commit ao deploy global na edge com testes e documentação reprodutível',
    guaranteeBadge: 'Zero Downtime · CI/CD Gates · Edge CDN',
    steps: [
      {
        step: '01',
        name: 'Controle de Versão',
        tech: 'Git & GitHub',
        metric: 'Conventional Commits',
        description: 'Ramificações protegidas, code reviews focados e histórico semântico rastreável.',
      },
      {
        step: '02',
        name: 'Portões de Qualidade (CI)',
        tech: 'GitHub Actions',
        metric: 'Automated Checks',
        description: 'Execução automatizada de linter, checagem de tipos estritos e testes.',
      },
      {
        step: '03',
        name: 'Empacotamento & Preview',
        tech: 'Vite / NPM',
        metric: 'Deploy Previews',
        description: 'Geração de bundles otimizados e ambientes efêmeros para validação por PR.',
      },
      {
        step: '04',
        name: 'Deploy na Edge (CD)',
        tech: 'Vercel / Edge CDN',
        metric: 'Zero-Downtime',
        description: 'Distribuição global em nós de borda com caching atômico e rollback instantâneo.',
      },
    ],
    provenProjects: [
      {
        id: '02',
        title: 'Plataforma de Investimentos',
        role: 'DevOps & CI/CD',
        highlight: 'Vercel Edge · TypeScript build · Continuous Deployment',
      },
      {
        id: '03',
        title: 'Modernização ASP → Angular',
        role: 'Front-end Architecture',
        highlight: 'Arquitetura modular sustentável · Redução técnica de débitos',
      },
      {
        id: '01',
        title: 'Agente Imobiliário',
        role: 'Confiabilidade em Produção',
        highlight: 'Monitoramento 24/7 · Webhooks resilientes · Fallbacks',
      },
    ],
  },
};

export const domainBlueprintsEn: Record<string, DomainBlueprintData> = {
  '01': {
    index: '01',
    pipelineTitle: 'Client-side Rendering & State Pipeline',
    pipelineSubtitle: 'Reactive architecture with sub-16ms latency, strict typing, and zero DOM drift',
    guaranteeBadge: '60 FPS · Zero Any · Clean Architecture',
    steps: [
      {
        step: '01',
        name: 'Interface & Events',
        tech: 'React 19 / Angular',
        metric: 'Accessible (a11y)',
        description: 'Modular component design powered by design tokens and decoupled event listeners.',
      },
      {
        step: '02',
        name: 'Reactive State',
        tech: 'Zustand / Signals',
        metric: 'Zero overhead',
        description: 'Atomic state store with predictable mutations and elimination of unnecessary re-renders.',
      },
      {
        step: '03',
        name: 'Build & Optimizations',
        tech: 'Vite / TypeScript',
        metric: 'Strict Types',
        description: 'Blazing-fast compile times, strict tree-shaking, and full static type checking.',
      },
      {
        step: '04',
        name: 'DOM & Design System',
        tech: 'Tailwind CSS',
        metric: 'Sub-16ms Paint',
        description: 'Fluid styling with composable utility classes and semantic Dark/Light tokens.',
      },
    ],
    provenProjects: [
      {
        id: '02',
        title: 'Investment Portfolio Platform',
        role: 'Full Stack & UI',
        highlight: 'React · Zustand · D3 · Sub-16ms client-side calculations',
      },
      {
        id: '03',
        title: 'Legacy ASP → Angular Overhaul',
        role: 'Front-end Engineer',
        highlight: 'Angular · TypeScript · SPA · 70% load time drop',
      },
      {
        id: '04',
        title: 'Bistro Digital Menu Totem',
        role: 'Front-end & UX',
        highlight: 'React · Tailwind · Responsive tactile touchscreen UI',
      },
    ],
  },
  '02': {
    index: '02',
    pipelineTitle: 'Data Pipeline & API Gateway',
    pipelineSubtitle: 'Secure routing with row-level authorization and relational integrity guarantees',
    guaranteeBadge: 'ACID · Row Level Security · Idempotency',
    steps: [
      {
        step: '01',
        name: 'Ingestion & Validation',
        tech: 'REST / Webhooks',
        metric: 'Schema Validation',
        description: 'Idempotent REST endpoints with strict payload parsing and sanitization.',
      },
      {
        step: '02',
        name: 'Business Gateway',
        tech: 'Node.js / Express',
        metric: 'Async Non-blocking',
        description: 'Decoupled service layer with centralized error handling and domain business rules.',
      },
      {
        step: '03',
        name: 'Access Control',
        tech: 'Supabase Auth / RLS',
        metric: 'Zero-trust DB',
        description: 'Row Level Security policies guaranteeing strict tenant/user data isolation.',
      },
      {
        step: '04',
        name: 'Relational Persistence',
        tech: 'PostgreSQL / MySQL',
        metric: 'ACID Compliance',
        description: 'Normalized database schemas, performant indexes, and native referential integrity.',
      },
    ],
    provenProjects: [
      {
        id: '02',
        title: 'Investment Portfolio Platform',
        role: 'Full Stack & DB',
        highlight: 'Supabase · PostgreSQL · RLS Policies · Async Data Sync',
      },
      {
        id: '06',
        title: 'Fiscal Sentinel Audit System',
        role: 'Back-end & DB',
        highlight: 'PostgreSQL · Audit trails · Structured schema migrations',
      },
      {
        id: '01',
        title: 'Real Estate Autonomous Agent',
        role: 'API & Integrations',
        highlight: 'PostgreSQL / Supabase · Messaging webhooks · CRM REST',
      },
    ],
  },
  '03': {
    index: '03',
    pipelineTitle: 'Autonomous Automation & AI Pipeline',
    pipelineSubtitle: 'Event orchestration, multimodal extraction, and reliable human-in-the-loop escalation',
    guaranteeBadge: '24/7 Autonomous · Multimodal · Safe RAG',
    steps: [
      {
        step: '01',
        name: 'Event Trigger',
        tech: 'Webhook / WhatsApp',
        metric: 'Instant Trigger',
        description: 'Real-time capture of inbound messaging, leads, and documents via channel APIs.',
      },
      {
        step: '02',
        name: 'Workflow Orchestrator',
        tech: 'n8n Workflow Engine',
        metric: 'Resilient Retries',
        description: 'Branching node automation with conditional routing and retry queues.',
      },
      {
        step: '03',
        name: 'Cognitive Engine & OCR',
        tech: 'LLMs / Gemini / OCR',
        metric: 'Structured JSON',
        description: 'Semantic intent parsing, entity extraction, and image/document OCR analysis.',
      },
      {
        step: '04',
        name: 'Sync & Execution',
        tech: 'CRM / Notifications',
        metric: 'Human Handoff',
        description: 'Direct write-back to CRM/ERP and smooth handoff to human agents when needed.',
      },
    ],
    provenProjects: [
      {
        id: '01',
        title: 'Real Estate Autonomous Agent',
        role: 'AI & Automation Engineer',
        highlight: 'n8n · LLM · ARBO CRM · Street Sign OCR · Google Calendar',
      },
      {
        id: '05',
        title: 'OCR & Document Extraction Pipeline',
        role: 'Automation Engineer',
        highlight: 'Computer Vision · LLM Parsing · n8n · Invoice extraction',
      },
      {
        id: '06',
        title: 'Fiscal Sentinel Audit System',
        role: 'Process Automation',
        highlight: 'Continuous webhook monitoring and automated anomaly alerts',
      },
    ],
  },
  '04': {
    index: '04',
    pipelineTitle: 'Continuous Delivery & Reliability Pipeline',
    pipelineSubtitle: 'From git commit to global edge deployment with automated gates and reproducible docs',
    guaranteeBadge: 'Zero Downtime · CI/CD Gates · Edge CDN',
    steps: [
      {
        step: '01',
        name: 'Version Control',
        tech: 'Git & GitHub',
        metric: 'Conventional Commits',
        description: 'Protected branches, strict code reviews, and semantic commit history.',
      },
      {
        step: '02',
        name: 'Quality Gates (CI)',
        tech: 'GitHub Actions',
        metric: 'Automated Checks',
        description: 'Automated linter checks, strict type validation, and unit test suites.',
      },
      {
        step: '03',
        name: 'Packaging & Preview',
        tech: 'Vite / NPM',
        metric: 'Deploy Previews',
        description: 'Optimized bundle generation and ephemeral preview environments per pull request.',
      },
      {
        step: '04',
        name: 'Edge Deployment (CD)',
        tech: 'Vercel / Edge CDN',
        metric: 'Zero-Downtime',
        description: 'Global multi-region edge rollout with atomic cache invalidation and quick rollbacks.',
      },
    ],
    provenProjects: [
      {
        id: '02',
        title: 'Investment Portfolio Platform',
        role: 'DevOps & CI/CD',
        highlight: 'Vercel Edge · TypeScript build · Continuous Deployment',
      },
      {
        id: '03',
        title: 'Legacy ASP → Angular Overhaul',
        role: 'Front-end Architecture',
        highlight: 'Maintainable modular structure · Zero architectural debt',
      },
      {
        id: '01',
        title: 'Real Estate Autonomous Agent',
        role: 'Production Reliability',
        highlight: '24/7 Uptime · Resilient Webhooks · Autonomous Failover',
      },
    ],
  },
};
