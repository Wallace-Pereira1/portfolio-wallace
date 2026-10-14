import React from 'react';
import PageHeader from '../components/PageHeader';
import ExperienceSection from '../components/ExperienceSection';
import EditorialColophon from '../components/EditorialColophon';
import { useApp } from '../context/AppContext';

export default function TrajetoriaPage() {
  const { language } = useApp();

  return (
    <div className="w-full">
      {/* Page Header */}
      <PageHeader
        eyebrow={language === 'pt' ? 'TRAJETÓRIA PROFISSIONAL' : 'CAREER TRAJECTORY'}
        title={language === 'pt' ? 'Trajetória.' : 'Trajectory.'}
        description={
          language === 'pt'
            ? 'Trajetória profissional e formação: mais de 4 anos de prática contínua construindo e sustentando softwares em produção, da automação e integrações de dados ao front-end corporativo e graduação em Ciência da Computação.'
            : 'Professional career and education: over 4 years of continuous practice building and scaling production software, from data integrations to enterprise front-end systems and a B.S. in Computer Science.'
        }
        meta={[
          { label: language === 'pt' ? 'Prática em Produção' : 'Production Practice', value: '4+ Anos' },
          { label: language === 'pt' ? 'Graduação' : 'Degree', value: 'Ciência da Computação (2025)' },
          { label: language === 'pt' ? 'Localização' : 'Location', value: 'Rio de Janeiro · Remoto/Híbrido' },
          { label: language === 'pt' ? 'Foco Atual' : 'Current Focus', value: 'Engenharia Full Stack & APIs' },
        ]}
      />

      {/* Trajectory Body Content */}
      <main className="bg-transparent">
        <ExperienceSection showHeader={false} />
      </main>

      {/* Editorial Colophon */}
      <EditorialColophon
        nextRoute={{
          path: '/competencias',
          label: language === 'pt' ? 'Competências & Domínios Técnicos' : 'Skills & Technical Domains',
        }}
      />
    </div>
  );
}
