import React from 'react';
import PageHeader from '../components/PageHeader';
import StackSection from '../components/StackSection';
import EditorialColophon from '../components/EditorialColophon';
import { useApp } from '../context/AppContext';
import { usePageSeo } from '../utils/usePageSeo';

export default function CompetenciasPage() {
  const { language } = useApp();

  usePageSeo({
    title:
      language === 'pt'
        ? 'Competências e Tecnologias | Wallace Pereira - Desenvolvedor Full Stack'
        : 'Skills & Technologies | Wallace Pereira - Full Stack Developer',
    description:
      language === 'pt'
        ? 'Domínios técnicos de Wallace Pereira: TypeScript, React, Angular, Node.js, PostgreSQL, Supabase, n8n, webhooks e APIs REST.'
        : 'Technical domains and skill architecture of Wallace Pereira: TypeScript, React, Angular, Node.js, PostgreSQL, Supabase, n8n, webhooks, and REST APIs.',
    path: '/competencias',
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <PageHeader
        eyebrow={language === 'pt' ? 'COMPETÊNCIAS & TECNOLOGIAS' : 'SKILLS & TECHNOLOGIES'}
        title={language === 'pt' ? 'Domínios Técnicos.' : 'Technical Domains.'}
        description={
          language === 'pt'
            ? 'Front-end, APIs, dados e automações: as ferramentas que uso no dia a dia e onde cada uma entra.'
            : 'Front-end, APIs, data and automation: the tools I use day to day and where each one fits.'
        }
        meta={[
          { label: language === 'pt' ? 'Linguagem Principal' : 'Primary Language', value: 'TypeScript' },
          { label: language === 'pt' ? 'Frontend' : 'Frontend', value: 'React & Angular' },
          { label: language === 'pt' ? 'Backend & Banco' : 'Backend & DB', value: 'Node.js, Supabase & MySQL' },
          { label: language === 'pt' ? 'Orquestração' : 'Orchestration', value: 'n8n & Webhooks' },
        ]}
      />

      {/* Competencies Body */}
      <main className="bg-transparent">
        <StackSection showHeader={false} />
      </main>

      {/* Editorial Colophon */}
      <EditorialColophon
        nextRoute={{
          path: '/contato',
          label: language === 'pt' ? 'Contato & Disponibilidade' : 'Contact & Availability',
        }}
      />
    </div>
  );
}
