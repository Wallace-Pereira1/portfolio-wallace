import React from 'react';
import Hero from '../components/Hero';
import { useApp } from '../context/AppContext';
import { projectsPt, projectsEn } from '../data/projects';
import EditorialColophon from '../components/EditorialColophon';
import ExperienceSection from '../components/ExperienceSection';
import StackSection from '../components/StackSection';
import ContactSection from '../components/ContactSection';
import ProjectsList from '../components/ProjectsList';
import { usePageSeo } from '../utils/usePageSeo';

export default function HomePage() {
  const { language } = useApp();
  const rawProjects = language === 'pt' ? projectsPt : projectsEn;
  const projects = rawProjects.filter((p) => !p.disabled);

  usePageSeo({
    title:
      language === 'pt'
        ? 'Wallace Pereira | Desenvolvedor Full Stack e Automações'
        : 'Wallace Pereira | Full Stack Developer & Automations',
    description:
      language === 'pt'
        ? 'Desenvolvedor Full Stack no Rio de Janeiro. Aplicações web, integrações de APIs, automações com n8n e IA aplicada. Conheça meus projetos e entre em contato.'
        : 'Full Stack Software Engineer based in Rio de Janeiro. Web applications, REST APIs, n8n automations, and applied AI. Explore my projects and get in touch.',
    path: '/',
  });

  return (
    <div className="w-full">
      {/* 1. Hero and home introduction */}
      <Hero />

      {/* 2. Selected work */}
      <section
        id="projetos"
        className="portfolio-section bg-transparent transition-colors relative z-10"
      >
        <div className="portfolio-container relative z-10">
          <ProjectsList projects={projects} language={language} />
        </div>
      </section>

      {/* 3. Professional trajectory */}
      <ExperienceSection showHeader={true} />

      {/* 4. Technical capabilities */}
      <StackSection showHeader={true} />

      {/* 5. Contact and footer */}
      <div>
        <ContactSection showHeader={true} />
        <EditorialColophon />
      </div>
    </div>
  );
}
