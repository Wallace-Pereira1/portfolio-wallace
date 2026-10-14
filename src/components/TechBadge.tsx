import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import TechIcon from './TechIcon';

export interface TechInfo {
  fullName: string;
  category?: string;
  context: string;
}

export const techDescriptionsPt: Record<string, TechInfo> = {
  // Languages & Core Frameworks
  TypeScript: {
    fullName: 'TypeScript',
    category: 'Linguagem',
    context: 'Superset estático do JavaScript que adiciona tipagem rigorosa, garantindo contratos de dados seguros e menor incidência de bugs em produção.',
  },
  JavaScript: {
    fullName: 'JavaScript',
    category: 'Linguagem',
    context: 'Linguagem fundamental da web moderna para interfaces dinâmicas, assincronismo, manipulação do DOM e fluxos reativos.',
  },
  React: {
    fullName: 'React',
    category: 'Biblioteca UI',
    context: 'Biblioteca declarativa para construção de interfaces reativas baseadas em componentes reutilizáveis e ciclo de vida otimizado.',
  },
  Angular: {
    fullName: 'Angular Framework',
    category: 'Framework Frontend',
    context: 'Framework corporativo modular baseado em TypeScript, injeção de dependências, RxJS e arquitetura orientada a serviços.',
  },
  'Tailwind CSS': {
    fullName: 'Tailwind CSS',
    category: 'CSS Utility-First',
    context: 'Framework utilitário para estilização atômica ultra-rápida, design system consistente e layout responsivo de alto desempenho.',
  },
  Zustand: {
    fullName: 'Zustand State Manager',
    category: 'Gestão de Estado',
    context: 'Gerenciador de estado global leve e reativo para React, operando sem boilerplate desnecessário e com alta velocidade.',
  },
  Vite: {
    fullName: 'Vite Build Tool',
    category: 'Build & Bundler',
    context: 'Ferramenta moderna de bundling e servidor de desenvolvimento instantâneo baseado em ES Modules nativos e Rollup.',
  },
  'Node.js': {
    fullName: 'Node.js Runtime',
    category: 'Backend Runtime',
    context: 'Ambiente de execução JavaScript no servidor assíncrono e orientado a eventos, ideal para APIs de alta concorrência.',
  },
  Python: {
    fullName: 'Python 3',
    category: 'Linguagem',
    context: 'Linguagem de alto nível utilizada para scripting avançado, manipulação analítica de dados e pipelines de automação/IA.',
  },
  Java: {
    fullName: 'Java (JDK / JVM)',
    category: 'Linguagem',
    context: 'Linguagem robusta baseada em Programação Orientada a Objetos (POO), herança, encapsulamento e escalabilidade corporativa.',
  },

  // Databases & Backend
  PostgreSQL: {
    fullName: 'PostgreSQL Relational DB',
    category: 'Banco de Dados',
    context: 'SGBD relacional avançado de código aberto, com suporte estrito a transações ACID, tipagem complexa, índices e integridade.',
  },
  Supabase: {
    fullName: 'Supabase Platform',
    category: 'Backend as a Service',
    context: 'Plataforma BaaS moderna construída sobre PostgreSQL, com autenticação nativa, banco gerenciado, storage e endpoints REST.',
  },
  MySQL: {
    fullName: 'MySQL Database',
    category: 'Banco de Dados',
    context: 'Banco de dados relacional clássico e veloz para persistência transacional com alta disponibilidade e integridade referencial.',
  },
  SQL: {
    fullName: 'Structured Query Language',
    category: 'Linguagem de Consulta',
    context: 'Linguagem padrão para consultas relacionais, cruzamentos complexos (JOINs), agregações analíticas e consistência de dados.',
  },
  'PostgreSQL / Supabase': {
    fullName: 'PostgreSQL & Supabase BaaS',
    category: 'Banco & BaaS',
    context: 'Combinação de banco relacional robusto com camada gerenciada de autenticação, storage e APIs em tempo real.',
  },

  // Automation, APIs & Integrations
  n8n: {
    fullName: 'n8n Workflow Automation',
    category: 'Orquestração',
    context: 'Plataforma de orquestração assíncrona de workflows técnicos, consumindo webhooks, manipulando JSON e integrando serviços em tempo real.',
  },
  Make: {
    fullName: 'Make (Integromat)',
    category: 'Automação Cloud',
    context: 'Plataforma para integração de microsserviços em nuvem, roteamento de dados operacionais e automações de negócio.',
  },
  APIs: {
    fullName: 'Endpoints REST & Webhooks',
    category: 'Integrações',
    context: 'Comunicação assíncrona baseada em HTTP/JSON para interconexão e sincronização bidirecional entre diferentes sistemas.',
  },
  'APIs REST': {
    fullName: 'APIs RESTful Corporativas',
    category: 'Arquitetura',
    context: 'Padrão arquitetural HTTP para operações de leitura, mutação de recursos e integração desacoplada entre clientes e backends.',
  },
  'REST APIs': {
    fullName: 'Enterprise REST APIs',
    category: 'Arquitetura',
    context: 'Endpoints desacoplados para troca padronizada de dados com autenticação e validação estruturada de payloads.',
  },
  'APIs REST & Webhooks': {
    fullName: 'REST APIs & Webhooks Assíncronos',
    category: 'Integrações',
    context: 'Arquitetura de comunicação bidirecional com consumo de endpoints e disparo imediato de eventos via webhooks.',
  },
  Webhooks: {
    fullName: 'Webhooks Orientados a Eventos',
    category: 'Mensageria',
    context: 'Mecanismo de notificação HTTP reversa disparado imediatamente na ocorrência de eventos do sistema, reduzindo polling.',
  },
  'Google Calendar API': {
    fullName: 'Google Calendar API',
    category: 'Google Workspace',
    context: 'Integração oficial para consulta de disponibilidade de horários, verificação de conflitos e agendamento autônomo de eventos.',
  },
  'Cal.com': {
    fullName: 'Cal.com API & Webhooks',
    category: 'Agendamento & Calendário',
    context: 'Infraestrutura open source de agendamento com APIs e webhooks para reservas automatizadas, roteamento inteligente e sincronização com calendários.',
  },
  Calendly: {
    fullName: 'Calendly API & Webhooks',
    category: 'Agendamento & Calendário',
    context: 'Integração para captura de eventos de agendamento, confirmações de reuniões e sincronização direta de compromissos com CRMs e automações.',
  },
  'WhatsApp Business API': {
    fullName: 'WhatsApp Business Cloud API',
    category: 'Mensageria',
    context: 'Canal corporativo oficial para disparo transacional, envio de alertas de pedidos e interação automatizada com clientes.',
  },
  'CRM ARBO Imóveis': {
    fullName: 'CRM ARBO Imóveis',
    category: 'CRM Imobiliário',
    context: 'Fonte da verdade de inventário imobiliário, anúncios, histórico de clientes e gestão de oportunidades de corretores.',
  },
  'Integrações com CRM': {
    fullName: 'Integrações de CRM Corporativo',
    category: 'CRM & Vendas',
    context: 'Sincronização bidirecional de dados entre pipelines de atração de leads, fluxos comerciais e sistemas de vendas.',
  },
  'Disparo de E-mail': {
    fullName: 'Serviço de E-mail Transacional',
    category: 'Mensageria',
    context: 'Envio automatizado de confirmações de visitas, recibos e notificações operacionais com alta entregabilidade.',
  },
  'OLX Ingestion': {
    fullName: 'Ingestão de Leads da OLX',
    category: 'Webhooks & Ingestão',
    context: 'Captura contínua e tratamento imediato de leads originados em portais de anúncios, alimentando triagem automática.',
  },
  'Tratamento de Dados': {
    fullName: 'Tratamento & Higienização de Dados',
    category: 'Engenharia de Dados',
    context: 'Parsing, higienização, deduplicação e estruturação de grandes volumes de dados brutos para alimentar bancos e relatórios.',
  },
  'Relatórios & Dashboards': {
    fullName: 'Relatórios & Dashboards Visuais',
    category: 'Inteligência Operacional',
    context: 'Consolidação periódica de métricas, geração automática de resumos operacionais e visualização intuitiva de indicadores-chave.',
  },

  // AI & Vision
  LLM: {
    fullName: 'Large Language Models',
    category: 'Inteligência Artificial',
    context: 'Modelos de linguagem generativos aplicados para classificação semântica de intenções, sumarização e raciocínio textual.',
  },
  LLMs: {
    fullName: 'Large Language Models',
    category: 'Inteligência Artificial',
    context: 'Modelos de inteligência artificial generativa integrados a rotinas de processamento de texto e assistência cognitiva.',
  },
  'Agentes de IA': {
    fullName: 'Agentes Autônomos de IA',
    category: 'Agentes & IA',
    context: 'Sistemas inteligentes com capacidade de interpretar objetivos, tomar decisões, acionar ferramentas e executar fluxos.',
  },
  'Visão Computacional & OCR': {
    fullName: 'Visão Computacional & OCR',
    category: 'Visão & OCR',
    context: 'Modelos de inteligência artificial para reconhecimento óptico de caracteres em documentos, fotos de placas e formulários.',
  },
  OCR: {
    fullName: 'Optical Character Recognition (OCR)',
    category: 'Reconhecimento Óptico',
    context: 'Tecnologia para digitalização, detecção e conversão de textos impressos ou fotografados em dados estruturados legíveis por máquina.',
  },
  'Gemini 2.0 Flash': {
    fullName: 'Google Gemini 2.0 Flash',
    category: 'Modelo Multimodal',
    context: 'Modelo multimodal de ultra-baixa latência do Google para raciocínio visual, leitura de documentos e geração estruturada de JSON.',
  },
  Gemini: {
    fullName: 'Google Gemini AI',
    category: 'Modelo Multimodal',
    context: 'Família de modelos de IA de ponta para compreensão multimodal (texto, código e imagens) com geração estruturada.',
  },

  // UI, Visuals & Charts
  Recharts: {
    fullName: 'Recharts Composable Library',
    category: 'Visualização de Dados',
    context: 'Biblioteca declarativa baseada em componentes React e SVG para renderização fluida e reativa de gráficos de desempenho.',
  },
  D3: {
    fullName: 'D3.js (Data-Driven Documents)',
    category: 'Data Visualization',
    context: 'Biblioteca de baixo nível para cálculo de escalas, interpolação matemática e transformações visuais complexas de dados.',
  },
  'Design Systems': {
    fullName: 'Design Systems & Tokens',
    category: 'UI/UX Architecture',
    context: 'Arquitetura unificada de componentes visuais, tipografia, paletas e espaçamentos para garantir coerência no produto.',
  },
  Componentização: {
    fullName: 'Componentização Modular',
    category: 'Boas Práticas Frontend',
    context: 'Divisão de interfaces complexas em blocos desacoplados, independentes, testáveis e com responsabilidade única.',
  },
  'Context API': {
    fullName: 'React Context API',
    category: 'Estado Local',
    context: 'Mecanismo nativo do React para compartilhamento seguro de estado entre árvores de componentes sem prop drilling.',
  },
  'Mobile UX': {
    fullName: 'Mobile-First UX / UI Design',
    category: 'Experiência do Usuário',
    context: 'Design de interface pensado prioritariamente para telas sensíveis ao toque, ergonomia de uso e alta densidade de informação.',
  },

  // Architecture & Engineering Practices
  'Arquitetura SPA': {
    fullName: 'Single Page Application (SPA)',
    category: 'Arquitetura Web',
    context: 'Aplicações web sem recarga completa de página, onde a navegação e renderização ocorrem dinamicamente no navegador do cliente.',
  },
  'ASP Clássico / Legado': {
    fullName: 'Active Server Pages (Legado)',
    category: 'Stack Legada',
    context: 'Tecnologia corporativa legada migrada com sucesso para arquiteturas modernas desacopladas em Angular e TypeScript.',
  },
  'Clean Code': {
    fullName: 'Clean Code & Princípios SOLID',
    category: 'Engenharia de Software',
    context: 'Práticas de legibilidade, responsabilidade única, código autoexplicativo e fácil manutenção a longo prazo.',
  },
  'Clean Architecture': {
    fullName: 'Clean Architecture',
    category: 'Arquitetura',
    context: 'Desacoplamento estrito entre regras de negócio corporativas, casos de uso, interfaces de usuário e detalhes de persistência.',
  },
  'Service Layer Pattern': {
    fullName: 'Padrão Service Layer',
    category: 'Padrão de Projeto',
    context: 'Camada intermediária isolada que encapsula todas as regras transacionais e chamadas de rede, blindando os componentes visuais.',
  },
  'RLS Security': {
    fullName: 'Row Level Security (RLS)',
    category: 'Segurança de Dados',
    context: 'Políticas granulares no PostgreSQL que restringem o acesso às linhas de tabelas no próprio motor do banco por tenant ou usuário.',
  },
  'Zod Schemas': {
    fullName: 'Zod TypeScript Schema Validation',
    category: 'Validação Tipada',
    context: 'Validação e tipagem estrita de esquemas em tempo de execução, garantindo que dados de entrada respeitem os contratos definidos.',
  },

  // Enterprise Systems & Testing
  Tiny: {
    fullName: 'ERP Tiny (Olist)',
    category: 'ERP Corporativo',
    context: 'Sistema de gestão integrado para controle de faturamento, estoque, emissão de notas fiscais e vendas multi-canal.',
  },
  F360: {
    fullName: 'F360 Finanças',
    category: 'Gestão Financeira',
    context: 'Plataforma especializada em gestão financeira multi-unidade, conciliação bancária de cartões e DRE operacional.',
  },
  Git: {
    fullName: 'Git Version Control',
    category: 'Controle de Versão',
    context: 'Sistema distribuído de controle de versões, gerenciamento de branches, auditoria de mudanças e colaboração via pull requests.',
  },
  GitHub: {
    fullName: 'GitHub Platform',
    category: 'Colaboração & DevOps',
    context: 'Plataforma para hospedagem de código, revisões colaborativas de código (PRs), issues e automação de pipelines.',
  },
  Docker: {
    fullName: 'Docker Containerization',
    category: 'DevOps & Containers',
    context: 'Isolamento de dependências e ambientes em contêineres imutáveis, garantindo paridade entre desenvolvimento e produção.',
  },
  Jest: {
    fullName: 'Jest Testing Framework',
    category: 'Qualidade & Testes',
    context: 'Framework de testes automatizados para execução de suítes de testes unitários e de integração com asserções rápidas.',
  },
  'CI/CD Pipelines': {
    fullName: 'Integração & Entrega Contínua (CI/CD)',
    category: 'DevOps',
    context: 'Esteiras automatizadas de verificação estática, compilação, testes e deploy seguro sem intervenção manual.',
  },
  'CI/CD': {
    fullName: 'Integração e Entrega Contínua',
    category: 'DevOps',
    context: 'Esteiras automatizadas para testes contínuos, linting e deploy progressivo de software com zero downtime.',
  },
  Algoritmos: {
    fullName: 'Algoritmos & Complexidade',
    category: 'Ciência da Computação',
    context: 'Resolução sistemática de problemas computacionais, análise assintótica de eficiência (Big-O) e otimização de execução.',
  },
  'Estruturas de Dados': {
    fullName: 'Estruturas de Dados',
    category: 'Ciência da Computação',
    context: 'Organização eficiente de dados em memória: listas, tabelas hash, filas, pilhas e árvores de decisão.',
  },
};

export const techDescriptionsEn: Record<string, TechInfo> = {
  TypeScript: {
    fullName: 'TypeScript (Microsoft)',
    category: 'Language',
    context: 'Static superset of JavaScript providing compile-time type safety, robust data contracts, and seamless refactoring.',
  },
  JavaScript: {
    fullName: 'JavaScript (ECMAScript ES6+)',
    category: 'Language',
    context: 'Foundational language of the modern web for dynamic interfaces, asynchronous operations, and client-side logic.',
  },
  React: {
    fullName: 'React (Meta)',
    category: 'UI Library',
    context: 'Declarative component-based library for building reactive, high-performance web applications and stateful interfaces.',
  },
  Angular: {
    fullName: 'Angular Framework (Google)',
    category: 'Frontend Framework',
    context: 'Enterprise-grade modular framework featuring TypeScript, RxJS streams, dependency injection, and service layers.',
  },
  'Tailwind CSS': {
    fullName: 'Tailwind CSS',
    category: 'Utility-First CSS',
    context: 'Utility-first CSS framework enabling design token consistency, rapid UI development, and responsive layouts.',
  },
  Zustand: {
    fullName: 'Zustand State Manager',
    category: 'State Management',
    context: 'Fast, minimalist global state manager for React with zero boilerplate and reactive subscription optimizations.',
  },
  Vite: {
    fullName: 'Vite Build Tool',
    category: 'Build & Bundler',
    context: 'Next-generation build tool and instant dev server powered by native browser ES Modules and Rollup.',
  },
  'Node.js': {
    fullName: 'Node.js Runtime',
    category: 'Backend Runtime',
    context: 'Event-driven, asynchronous JavaScript runtime engineered for scalable backend services and high-concurrency APIs.',
  },
  Python: {
    fullName: 'Python 3',
    category: 'Language',
    context: 'High-level language for backend microservices, data extraction, OCR pipelines, and applied AI automation.',
  },
  Java: {
    fullName: 'Java (JDK / JVM)',
    category: 'Language',
    context: 'Robust object-oriented programming language emphasizing encapsulation, strong typing, and enterprise systems.',
  },
  PostgreSQL: {
    fullName: 'PostgreSQL Relational DB',
    category: 'Database',
    context: 'Advanced open-source relational database with strict ACID compliance, complex data types, and transactional safety.',
  },
  Supabase: {
    fullName: 'Supabase Platform',
    category: 'Backend as a Service',
    context: 'Open-source Firebase alternative powered by PostgreSQL, providing auth, row level security, storage, and APIs.',
  },
  MySQL: {
    fullName: 'MySQL Database',
    category: 'Database',
    context: 'High-performance transactional relational database with proven stability, indexing, and referential integrity.',
  },
  SQL: {
    fullName: 'Structured Query Language',
    category: 'Query Language',
    context: 'Standard language for relational queries, transactional aggregations, join logic, and relational consistency.',
  },
  'PostgreSQL / Supabase': {
    fullName: 'PostgreSQL & Supabase BaaS',
    category: 'Database & BaaS',
    context: 'Relational database architecture combined with managed authentication, realtime events, and storage.',
  },
  n8n: {
    fullName: 'n8n Workflow Automation',
    category: 'Orchestration',
    context: 'Extensible workflow automation tool for asynchronous pipeline orchestration, webhooks, and microservice integration.',
  },
  Make: {
    fullName: 'Make (formerly Integromat)',
    category: 'Cloud Automation',
    context: 'Visual platform for connecting enterprise cloud apps, webhook routing, and business workflow orchestration.',
  },
  APIs: {
    fullName: 'RESTful Endpoints & Webhooks',
    category: 'Integrations',
    context: 'Asynchronous HTTP communication protocol ensuring bidirectional synchronization between decoupled architectures.',
  },
  'APIs REST': {
    fullName: 'Enterprise REST APIs',
    category: 'Architecture',
    context: 'Standardized architectural style for stateless, typed HTTP data exchange between clients and server microservices.',
  },
  'REST APIs': {
    fullName: 'Enterprise REST APIs',
    category: 'Architecture',
    context: 'Stateless HTTP endpoints facilitating transactional data exchange with authentication and structured validation.',
  },
  'APIs REST & Webhooks': {
    fullName: 'REST APIs & Asynchronous Webhooks',
    category: 'Integrations',
    context: 'Bidirectional integration architecture combining synchronous REST endpoints with instant event-driven webhooks.',
  },
  Webhooks: {
    fullName: 'Event-Driven Webhooks',
    category: 'Messaging',
    context: 'Reverse HTTP callbacks fired instantly upon system events to eliminate wasteful client polling.',
  },
  'Google Calendar API': {
    fullName: 'Google Calendar API',
    category: 'Google Workspace',
    context: 'Workspace API for querying broker availability, checking conflict windows, and booking client visits autonomously.',
  },
  'Cal.com': {
    fullName: 'Cal.com API & Webhooks',
    category: 'Scheduling & Calendars',
    context: 'Open-source scheduling infrastructure with APIs and webhooks for automated bookings, intelligent routing, and calendar sync.',
  },
  Calendly: {
    fullName: 'Calendly API & Webhooks',
    category: 'Scheduling & Calendars',
    context: 'Integration for capturing booking webhooks, meeting notifications, and real-time appointment sync directly into CRMs and workflows.',
  },
  'WhatsApp Business API': {
    fullName: 'WhatsApp Business Cloud API',
    category: 'Messaging',
    context: 'Direct enterprise channel for transactional notifications, automated order updates, and customer communications.',
  },
  'CRM ARBO Imóveis': {
    fullName: 'ARBO Real Estate CRM',
    category: 'Real Estate CRM',
    context: 'Single source of truth for property listings, client lifecycle, commercial pipelines, and broker management.',
  },
  'Integrações com CRM': {
    fullName: 'CRM Systems Integration',
    category: 'CRM & Sales',
    context: 'Bidirectional sync connecting lead generation pipelines, commercial funnels, and enterprise customer data.',
  },
  'Disparo de E-mail': {
    fullName: 'Transactional Email Service',
    category: 'Messaging',
    context: 'Automated dispatch of visit confirmations, booking summaries, and transactional notifications with high deliverability.',
  },
  'OLX Ingestion': {
    fullName: 'OLX Lead Ingestion Pipeline',
    category: 'Webhooks & Ingestion',
    context: 'Real-time webhook listener and parsing layer capturing inbound inquiries from classified portals for instant triage.',
  },
  'Tratamento de Dados': {
    fullName: 'Data Cleaning & Normalization',
    category: 'Data Engineering',
    context: 'High-volume batch parsing, deduplication, and schema validation to clean raw operational data before storage.',
  },
  'Relatórios & Dashboards': {
    fullName: 'Reports & Visual Dashboards',
    category: 'Operational Intelligence',
    context: 'Automated periodic report generation, KPI aggregation, and clean visual status summaries for operational teams.',
  },
  LLM: {
    fullName: 'Large Language Models',
    category: 'Artificial Intelligence',
    context: 'Foundational generative language models used for semantic intent extraction, parsing, and automated client triage.',
  },
  LLMs: {
    fullName: 'Large Language Models',
    category: 'Artificial Intelligence',
    context: 'Generative AI models integrated into backend workflows for automated text reasoning and intelligent assistance.',
  },
  'Agentes de IA': {
    fullName: 'Autonomous AI Agents',
    category: 'Agents & AI',
    context: 'Autonomous software entities capable of reasoning over intents, invoking tools, and executing end-to-end workflows.',
  },
  'Visão Computacional & OCR': {
    fullName: 'Computer Vision & OCR',
    category: 'Vision & OCR',
    context: 'Vision AI models and optical character recognition for extracting structured text from street signs and documents.',
  },
  OCR: {
    fullName: 'Optical Character Recognition (OCR)',
    category: 'Text Extraction',
    context: 'Technology converting photographed or scanned text and tabular forms into machine-readable JSON data.',
  },
  'Gemini 2.0 Flash': {
    fullName: 'Google Gemini 2.0 Flash',
    category: 'Multimodal AI',
    context: 'High-speed, low-latency multimodal AI model specialized in document comprehension and structured JSON synthesis.',
  },
  Gemini: {
    fullName: 'Google Gemini AI',
    category: 'Multimodal AI',
    context: 'State-of-the-art multimodal AI family for reasoning across text, code, images, and audio with structured output.',
  },
  Recharts: {
    fullName: 'Recharts Composable Library',
    category: 'Data Visualization',
    context: 'Declarative React charting library built with SVG components, optimized for smooth financial data displays.',
  },
  D3: {
    fullName: 'D3.js (Data-Driven Documents)',
    category: 'Data Visualization',
    context: 'Low-level visualization library for mathematical transformations, scales, and precision vector rendering.',
  },
  'Design Systems': {
    fullName: 'Design Systems & UI Tokens',
    category: 'UI/UX Architecture',
    context: 'Standardized design language, reusable UI componentry, and tokens ensuring product accessibility and coherence.',
  },
  Componentização: {
    fullName: 'Modular Component Architecture',
    category: 'Frontend Engineering',
    context: 'Deconstructing UI views into decoupled, testable, and reusable components adhering to single-responsibility.',
  },
  'Context API': {
    fullName: 'React Context API',
    category: 'Local State',
    context: 'Native React state sharing mechanism avoiding prop drilling across nested component subtrees.',
  },
  'Mobile UX': {
    fullName: 'Mobile-First UX / UI Design',
    category: 'User Experience',
    context: 'Touch-optimized user experience engineered for tablets and phones with high informational density.',
  },
  'Arquitetura SPA': {
    fullName: 'Single Page Application (SPA)',
    category: 'Web Architecture',
    context: 'Client-side web architecture with seamless transitions, instant routing, and dynamic data rendering.',
  },
  'ASP Clássico / Legado': {
    fullName: 'Legacy Classic ASP',
    category: 'Legacy Stack',
    context: 'Legacy enterprise application stack systematically migrated to modern Angular and TypeScript SPAs.',
  },
  'Clean Code': {
    fullName: 'Clean Code & SOLID Principles',
    category: 'Software Engineering',
    context: 'Engineering discipline focusing on maintainability, readability, testability, and self-documenting code.',
  },
  'Clean Architecture': {
    fullName: 'Clean Architecture',
    category: 'Architecture',
    context: 'Architectural separation isolating core business logic from external frameworks, databases, and UI implementations.',
  },
  'Service Layer Pattern': {
    fullName: 'Service Layer Pattern',
    category: 'Design Pattern',
    context: 'Isolated intermediate layer encapsulating business logic, transactional rules, and network calls away from UI views.',
  },
  'RLS Security': {
    fullName: 'Row Level Security (RLS)',
    category: 'Data Security',
    context: 'Database-level security policies in PostgreSQL that restrict row access dynamically based on tenant or authenticated user.',
  },
  'Zod Schemas': {
    fullName: 'Zod TypeScript Schema Validation',
    category: 'Type Validation',
    context: 'Runtime schema validation library that guarantees data payload integrity and infers static TypeScript types.',
  },
  Tiny: {
    fullName: 'Tiny ERP (Olist)',
    category: 'Enterprise ERP',
    context: 'Cloud ERP platform for invoicing, inventory tracking, order fulfillment, and multi-channel e-commerce.',
  },
  F360: {
    fullName: 'F360 Finance Platform',
    category: 'Financial Management',
    context: 'Multi-store corporate finance intelligence platform managing cash flows, bank reconciliation, and fiscal balance.',
  },
  Git: {
    fullName: 'Git Version Control',
    category: 'Source Control',
    context: 'Distributed version control system for tracking codebase changes, branching, and pull request reviews.',
  },
  GitHub: {
    fullName: 'GitHub Platform',
    category: 'DevOps & Collaboration',
    context: 'Collaboration platform for code hosting, pull requests, automated GitHub Actions workflows, and issue tracking.',
  },
  Docker: {
    fullName: 'Docker Containerization',
    category: 'Containers & DevOps',
    context: 'Containerization technology packaging software with all runtime dependencies for reproducible environments.',
  },
  Jest: {
    fullName: 'Jest Testing Framework',
    category: 'Testing & Quality',
    context: 'Delightful automated testing framework for unit and integration tests with fast parallel execution.',
  },
  'CI/CD Pipelines': {
    fullName: 'Continuous Integration & Delivery',
    category: 'DevOps',
    context: 'Automated pipelines running test suites, static analysis, building artifacts, and deploying to production.',
  },
  'CI/CD': {
    fullName: 'Continuous Integration & Delivery',
    category: 'DevOps',
    context: 'Automated delivery pipelines ensuring zero-downtime releases and continuous automated quality validation.',
  },
  Algoritmos: {
    fullName: 'Algorithms & Complexity',
    category: 'Computer Science',
    context: 'Algorithmic problem solving, Big-O computational complexity evaluation, and execution optimization.',
  },
  'Estruturas de Dados': {
    fullName: 'Data Structures',
    category: 'Computer Science',
    context: 'Fundamental in-memory data structures: linked lists, hash tables, stacks, queues, and search trees.',
  },
};

export const getTechInfo = (tech: string, language: 'pt' | 'en'): TechInfo => {
  const dictionary = language === 'pt' ? techDescriptionsPt : techDescriptionsEn;
  if (dictionary[tech]) return dictionary[tech];

  // Try trimmed or case-insensitive match
  const lower = tech.trim().toLowerCase();
  for (const [key, value] of Object.entries(dictionary)) {
    if (key.toLowerCase() === lower) {
      return value;
    }
  }

  // Graceful fallback
  return {
    fullName: tech,
    category: language === 'pt' ? 'Tecnologia' : 'Technology',
    context:
      language === 'pt'
        ? 'Tecnologia aplicada na arquitetura, desenvolvimento e rotinas de produção.'
        : 'Core technology applied across engineering workflows and production architecture.',
  };
};

interface TechBadgeProps {
  key?: React.Key;
  tech: string;
  language?: 'pt' | 'en';
  size?: 'xs' | 'sm' | 'md';
  className?: string;
  fullWidth?: boolean;
}

export default function TechBadge({
  tech,
  language = 'pt',
  size = 'sm',
  className = '',
  fullWidth = false,
}: TechBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const info = getTechInfo(tech, language);

  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    showBelow: boolean;
    caretLeft: number;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCoords(null);
      return;
    }

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current;

      const tooltipWidth = tooltip ? tooltip.offsetWidth : 270;
      const tooltipHeight = tooltip ? tooltip.offsetHeight : 95;
      const margin = 16;

      const badgeCenterX = rect.left + rect.width / 2;

      // Ensure horizontal position never clips on the left or right of the screen
      let left = badgeCenterX - tooltipWidth / 2;
      if (left < margin) {
        left = margin;
      } else if (left + tooltipWidth > window.innerWidth - margin) {
        left = window.innerWidth - margin - tooltipWidth;
      }

      // Caret arrow position pointing directly to badge center
      const caretLeft = Math.max(16, Math.min(tooltipWidth - 16, badgeCenterX - left));

      // Decide whether to show above or below based on viewport space
      const showBelow = rect.top < tooltipHeight + 20;
      const top = showBelow ? rect.bottom + 8 : rect.top - tooltipHeight - 8;

      setCoords({ top, left, showBelow, caretLeft });
    };

    updatePosition();
    const rafId = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[10px] gap-1',
    sm: 'px-2 py-0.5 text-[11px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-2',
  }[size];

  const iconSize = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  }[size];

  return (
    <div
      ref={containerRef}
      className={`tech-stack-item relative ${fullWidth ? 'w-full block' : 'inline-block'} ${isOpen ? 'is-open z-40' : 'z-0'} transition-all duration-300 ease-out overflow-visible ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={`${fullWidth ? 'w-full flex justify-start' : 'inline-flex'} items-center whitespace-nowrap font-mono rounded-[2px] transition-all duration-300 ease-out cursor-help border leading-none text-left bg-theme-bg border-theme-border text-theme-text hover:border-theme-muted hover:bg-theme-surface/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-theme-text overflow-visible ${sizeClasses}`}
        aria-label={`${tech}: ${info.fullName}`}
      >
        <TechIcon name={tech} className={`${iconSize} shrink-0`} />
        <span className="text-[10.5px] font-mono text-left whitespace-nowrap transition-all duration-300 ease-out overflow-visible">
          {tech}
        </span>
      </button>

      {/* Popover Legend / Tooltip: Renderizado via Portal diretamente no document.body para NUNCA ser cortado por overflow ou outros cards */}
      {isOpen && coords && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className="fixed pointer-events-none transition-opacity duration-200 ease-out backdrop-blur-md rounded-[2px] shadow-2xl p-2.5 sm:p-3 border border-theme-border bg-theme-surface w-max min-w-[220px] max-w-[min(90vw,420px)] opacity-100 visible"
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            zIndex: 99999,
          }}
        >
          {/* Dynamic Caret Triangle */}
          {coords.showBelow ? (
            <>
              <div
                className="absolute bottom-full -mb-[1px] border-4 border-transparent border-b-theme-border"
                style={{ left: `${coords.caretLeft}px`, transform: 'translateX(-50%)' }}
              />
              <div
                className="absolute bottom-full -mb-[2px] border-4 border-transparent border-b-theme-surface"
                style={{ left: `${coords.caretLeft}px`, transform: 'translateX(-50%)' }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute top-full -mt-[1px] border-4 border-transparent border-t-theme-border"
                style={{ left: `${coords.caretLeft}px`, transform: 'translateX(-50%)' }}
              />
              <div
                className="absolute top-full -mt-[2px] border-4 border-transparent border-t-theme-surface"
                style={{ left: `${coords.caretLeft}px`, transform: 'translateX(-50%)' }}
              />
            </>
          )}

          <div className="space-y-1.5 text-left">
            {/* Header com Nome Completo da Stack e Tag de Categoria */}
            <div className="flex items-center justify-between gap-3 border-b border-theme-border/60 pb-1.5 whitespace-nowrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11.5px] font-mono font-semibold text-theme-text whitespace-nowrap">
                  {info.fullName}
                </span>
              </div>
              {info.category && (
                <span className="text-[9px] font-mono uppercase tracking-widest text-theme-muted shrink-0 px-1.5 py-0.5 bg-theme-bg border border-theme-border/50 rounded-[2px]">
                  {info.category}
                </span>
              )}
            </div>
            <p className="text-[11px] text-theme-dim leading-snug font-sans font-normal pt-0.5 break-words">
              {info.context}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
