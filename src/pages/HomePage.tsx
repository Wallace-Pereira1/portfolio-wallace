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

  return (
    <div className="w-full">
      {/* Hero as Editorial Cover */}
      <Hero />

      {/* Selected Works: índice editorial */}
      <section
        id="projetos"
        className="py-12 md:py-16 bg-transparent px-6 md:px-10 lg:px-12 transition-colors relative z-10"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <ProjectsList projects={projects} language={language} onOpen={handleOpenProjectDetails} />
        </div>
      </section>

      {/* Professional Trajectory & Experience */}
      <ExperienceSection showHeader={true} />

      {/* Technical Domains & Capabilities */}
      <StackSection showHeader={true} />

      {/* Direct Contact & Collaboration */}
      <ContactSection showHeader={true} />

      {/* Editorial Colophon */}
      <EditorialColophon />

      {/* Project Detailed Study Modal */}
      <ProjectStudyModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        initialProjectId={selectedProjectId}
      />
    </div>
  );
}
