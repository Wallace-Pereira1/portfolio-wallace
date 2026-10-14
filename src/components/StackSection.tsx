import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TiltDomainCard, { DomainItem } from './TiltDomainCard';
import DomainStudyModal from './DomainStudyModal';

interface StackSectionProps {
  showHeader?: boolean;
}

export default function StackSection({ showHeader = true }: StackSectionProps) {
  const { language, t } = useApp();
  const [selectedDomain, setSelectedDomain] = useState<DomainItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDomainModal = (domain: DomainItem) => {
    setSelectedDomain(domain);
    setIsModalOpen(true);
  };

  const domainsPt: DomainItem[] = [
    {
      index: '01',
      title: 'Front-end & Produtos Web',
      description: 'Interfaces em React e Angular, com TypeScript do começo ao fim, pensadas para quem usa e para quem vai manter o código.',
      primarySkills: [
        'TypeScript',
        'React',
        'Angular',
        'Tailwind CSS'
      ],
      secondarySkills: [
        'Vite',
        'Zustand',
        'Design Systems',
        'Interfaces responsivas'
      ]
    },
    {
      index: '02',
      title: 'APIs & Dados',
      description: 'APIs em Node.js e bancos relacionais: Supabase e PostgreSQL para o que precisa sair rápido, MySQL quando o projeto pede um banco mais robusto.',
      primarySkills: [
        'Node.js',
        'APIs REST',
        'Webhooks',
        'PostgreSQL',
        'MySQL',
        'Supabase'
      ],
      secondarySkills: [
        'Row Level Security (RLS)',
        'Modelagem relacional',
        'Autenticação'
      ]
    },
    {
      index: '03',
      title: 'Integrações, Automações & IA',
      description: 'Conecto ERP, CRM e WhatsApp, automatizo rotinas com n8n e coloco agentes de IA onde eles realmente ajudam.',
      primarySkills: [
        'n8n',
        'LLMs',
        'WhatsApp Business API',
        'Integrações com CRM',
        'OCR'
      ],
      secondarySkills: [
        'Salesforce',
        'RD Station',
        'Gemini',
        'Transbordo para atendimento humano'
      ]
    },
    {
      index: '04',
      title: 'Entrega & Qualidade',
      description: 'Versionamento, deploy e documentação para entregar software que dá para manter.',
      primarySkills: [
        'Git',
        'GitHub',
        'GitHub Actions',
        'Vercel'
      ],
      secondarySkills: [
        'CI/CD',
        'Documentação técnica'
      ]
    }
  ];

  const domainsEn: DomainItem[] = [
    {
      index: '01',
      title: 'Front-end & Web Products',
      description: 'Interfaces in React and Angular, with TypeScript end to end, built for the people who use them and the people who will maintain the code.',
      primarySkills: [
        'TypeScript',
        'React',
        'Angular',
        'Tailwind CSS'
      ],
      secondarySkills: [
        'Vite',
        'Zustand',
        'Design Systems',
        'Responsive interfaces'
      ]
    },
    {
      index: '02',
      title: 'APIs & Data',
      description: 'APIs in Node.js and relational databases: Supabase and PostgreSQL for what has to ship fast, MySQL when the project needs a more robust database.',
      primarySkills: [
        'Node.js',
        'REST APIs',
        'Webhooks',
        'PostgreSQL',
        'MySQL',
        'Supabase'
      ],
      secondarySkills: [
        'Row Level Security (RLS)',
        'Relational modeling',
        'Authentication'
      ]
    },
    {
      index: '03',
      title: 'Integrations, Automations & AI',
      description: 'I connect ERP, CRM and WhatsApp, automate routines with n8n, and put AI agents where they actually help.',
      primarySkills: [
        'n8n',
        'LLMs',
        'WhatsApp Business API',
        'CRM Integrations',
        'OCR'
      ],
      secondarySkills: [
        'Salesforce',
        'RD Station',
        'Gemini',
        'Handoff to human support'
      ]
    },
    {
      index: '04',
      title: 'Delivery & Quality',
      description: 'Version control, deployment and documentation to ship software that can be maintained.',
      primarySkills: [
        'Git',
        'GitHub',
        'GitHub Actions',
        'Vercel'
      ],
      secondarySkills: [
        'CI/CD',
        'Technical documentation'
      ]
    }
  ];

  const domains = language === 'pt' ? domainsPt : domainsEn;

  return (
    <section
      id="tecnologias"
      className={`${showHeader ? 'py-12 md:py-16' : 'py-8 md:py-12'} bg-transparent px-6 md:px-12 transition-colors relative`}
    >
      <div id="competencias" className="absolute -top-20 opacity-0 pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
        {/* Section Header */}
        {showHeader && (
          <div className="space-y-2 pb-5">
            <span className="text-[11px] font-mono text-theme-muted uppercase tracking-widest block">
              {language === 'pt' ? 'Competências & Arquitetura' : 'Skills & Architecture'}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-medium text-theme-text tracking-[-0.015em]">
              {t('tech.title')}
            </h3>
            <p className="text-sm sm:text-base text-theme-dim max-w-2xl leading-relaxed">
              {t('tech.desc')}
            </p>
          </div>
        )}

        {/* 2x2 Grid on Desktop / Single Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {domains.map((item) => (
            <TiltDomainCard
              key={item.index}
              item={item}
              onOpenDetails={handleOpenDomainModal}
              language={language}
            />
          ))}
        </div>

        {/* Modal de Detalhes do Domínio com Ícones */}
        <DomainStudyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          domain={selectedDomain}
          allDomains={domains}
          onSelectDomain={(d) => setSelectedDomain(d)}
          language={language}
        />
      </div>
    </section>
  );
}
