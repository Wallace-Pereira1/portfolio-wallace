import React from 'react';
import { BrainCircuit, Boxes, Terminal, Waypoints, Workflow, Webhook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { currentStack } from '../data/stack';
import TechIcon from './TechIcon';

interface SkillGroup {
  id: string;
  namePt: string;
  nameEn: string;
  technologies: string[];
  projectPt: string;
  projectEn: string;
  projectUrl: string;
}

const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    namePt: 'Front-end',
    nameEn: 'Front-end',
    technologies: ['React', 'TypeScript', 'Angular', 'Tailwind CSS'],
    projectPt: 'Modernização de Sistema Corporativo Legado',
    projectEn: 'Legacy Enterprise System Modernization',
    projectUrl: '/projetos/04',
  },
  {
    id: 'apis-dados',
    namePt: 'APIs & Dados',
    nameEn: 'APIs & Data',
    technologies: ['Node.js', 'PostgreSQL', 'Supabase', 'APIs REST'],
    projectPt: 'Fiscal Sentinel: Auditoria e Conformidade Fiscal',
    projectEn: 'Fiscal Sentinel: Audit & Compliance',
    projectUrl: '/projetos/08',
  },
  {
    id: 'automacoes-ia',
    namePt: 'Automação & IA',
    nameEn: 'Automation & AI',
    technologies: ['n8n', 'Webhooks', 'CRM / ERP', 'LLMs & OCR'],
    projectPt: 'Agente de IA & Pipeline de Qualificação Imobiliária',
    projectEn: 'AI Agent & Real Estate Qualification Pipeline',
    projectUrl: '/projetos/02',
  },
  {
    id: 'entrega-qualidade',
    namePt: 'Entrega & Qualidade',
    nameEn: 'Delivery & Quality',
    technologies: ['Git', 'CI/CD', 'Vercel', 'Cloudflare'],
    projectPt: 'CAPCRJ | Presença Digital & Orçamentos',
    projectEn: 'CAPCRJ | Digital Presence & Quotes',
    projectUrl: '/projetos/01',
  },
];

const neutralIcons = {
  n8n: Workflow,
  webhook: Webhook,
  api: Waypoints,
  crm: Boxes,
  llm: BrainCircuit,
  cloudflare: Terminal,
  cicd: Waypoints,
} as const;

function getNeutralIcon(technology: string) {
  const normalized = technology.toLowerCase();
  if (normalized.includes('n8n')) return neutralIcons.n8n;
  if (normalized.includes('webhook')) return neutralIcons.webhook;
  if (normalized.includes('api')) return neutralIcons.api;
  if (normalized.includes('crm')) return neutralIcons.crm;
  if (normalized.includes('llm') || normalized.includes('ocr')) return neutralIcons.llm;
  if (normalized.includes('cloudflare')) return neutralIcons.cloudflare;
  if (normalized.includes('ci/cd')) return neutralIcons.cicd;
  return null;
}

const SkillItem: React.FC<{ technology: string }> = ({ technology }) => {
  const NeutralIcon = getNeutralIcon(technology);

  return (
    <li className="flex min-h-8 items-center gap-2 text-[13px] leading-5 text-theme-dim">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-theme-border/80 bg-theme-surface">
        {NeutralIcon ? (
          <NeutralIcon aria-hidden="true" className="h-4 w-4 text-theme-muted" strokeWidth={1.7} />
        ) : (
          <TechIcon name={technology} className="h-4 w-4" colorMode="brand" />
        )}
      </span>
      <span>{technology}</span>
    </li>
  );
};

interface DomainsListProps {
  language?: string;
}

export default function DomainsList({ language: propLanguage }: DomainsListProps) {
  const { language: contextLanguage } = useApp();
  const isEnglish = (propLanguage || contextLanguage) === 'en';

  return (
    <div className="w-full space-y-7 sm:space-y-9">
      <div className="border-b border-theme-border/70 pb-5 sm:pb-6">
        <div className="space-y-3 sm:flex sm:items-center sm:gap-8 sm:space-y-0">
          <span className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-theme-muted">
            {isEnglish ? 'Current stack' : 'Stack atual'}
          </span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
            {currentStack.map((technology) => (
              <li key={technology} className="flex items-center gap-2 text-sm text-theme-text">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-theme-border/80 bg-theme-surface">
                  <TechIcon name={technology} className="h-4 w-4 opacity-100" colorMode="brand" />
                </span>
                <span>{technology}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-x-7 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {skillGroups.map((group) => (
          <section key={group.id} aria-labelledby={`skill-group-${group.id}`} className="min-w-0">
            <h3
              id={`skill-group-${group.id}`}
              className="mb-3 min-h-5 font-mono text-xs uppercase tracking-[0.06em] text-theme-muted"
            >
              {isEnglish ? group.nameEn : group.namePt}
            </h3>
            <ul className="space-y-0.5">
              {group.technologies.map((technology) => (
                <SkillItem key={technology} technology={technology} />
              ))}
            </ul>
            <p className="mt-3 border-t border-theme-border/60 pt-2.5 text-[12px] leading-relaxed text-theme-muted">
              <span>{isEnglish ? 'Used in: ' : 'Usado em: '}</span>
              <Link
                to={group.projectUrl}
                className="text-theme-dim underline decoration-theme-border underline-offset-4 hover:text-theme-text hover:decoration-theme-text transition-colors"
              >
                {isEnglish ? group.projectEn : group.projectPt}
                <span aria-hidden="true"> ↗</span>
              </Link>
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
