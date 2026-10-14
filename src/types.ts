export interface ProjectWorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'web_product' | 'integration_api' | 'data_backend';
  role: string;
  period?: string;
  challenge: string;
  solution: string;
  impact?: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  disabled?: boolean;
  workflow?: ProjectWorkflowStep[];
  highlights?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

export interface StackCategory {
  name: string;
  headline?: string;
  skills: string[];
}

