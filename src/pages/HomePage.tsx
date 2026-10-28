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

  // Ativa o scroll snap exclusivo na HomePage
  React.useEffect(() => {
    document.documentElement.classList.add('snap-active');
    return () => {
      document.documentElement.classList.remove('snap-active');
    };
  }, []);

  return (
    <div className="w-full">
      {/* 1. Hero as Editorial Cover (Tela 1) */}
      <Hero />

      {/* 2. Selected Works: índice editorial (Tela 2) */}
      <section
        id="projetos"
        className="min-h-[100dvh] flex flex-col justify-center py-16 sm:py-20 md:py-24 bg-transparent px-6 md:px-12 transition-colors relative z-10 snap-start snap-always scroll-mt-6 sm:scroll-mt-10"
      >
        <div className="max-w-6xl xl:max-w-7xl mx-auto w-full relative z-10">
          <ProjectsList projects={projects} language={language} />
        </div>
      </section>

      {/* 3. Professional Trajectory & Experience (Tela 3) */}
      <ExperienceSection showHeader={true} />

      {/* 4. Technical Domains & Capabilities (Tela 4) */}
      <StackSection showHeader={true} />

      {/* 5. Direct Contact & Collaboration + Colophon (Tela 5) */}
      <div className="min-h-[100dvh] flex flex-col justify-between snap-start snap-always scroll-mt-6 sm:scroll-mt-10 pt-16 sm:pt-20">
        <div className="flex-1 flex flex-col justify-center">
          <ContactSection showHeader={true} />
        </div>
        <EditorialColophon />
      </div>
    </div>
  );
}
