import React, { useState } from 'react';
import Hero from '../components/Hero';
import { useApp } from '../context/AppContext';
import { projectsPt, projectsEn } from '../data/projects';
import EditorialColophon from '../components/EditorialColophon';
import ExperienceSection from '../components/ExperienceSection';
import StackSection from '../components/StackSection';
import ContactSection from '../components/ContactSection';
import ProjectsList from '../components/ProjectsList';
import ProjectStudyModal from '../components/ProjectStudyModal';
import { Project } from '../types';

export default function HomePage() {
  const { language } = useApp();
  const rawProjects = language === 'pt' ? projectsPt : projectsEn;
  const projects = rawProjects.filter((p) => !p.disabled);

  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProjectId(project.id);
    setIsStudyModalOpen(true);
  };

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
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <ProjectsList projects={projects} language={language} onOpen={handleOpenProjectDetails} />
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

      {/* Project Detailed Study Modal */}
      <ProjectStudyModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        initialProjectId={selectedProjectId}
      />
    </div>
  );
}
