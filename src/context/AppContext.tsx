import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';
type Theme = 'dark' | 'light';

interface AppContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => any;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  pt: {
    // Navigation
    'nav.inicio': 'Sobre',
    'nav.projetos': 'Projetos',
    'nav.experiencia': 'Trajetória',
    'nav.tecnologias': 'Competências',
    'nav.contato': 'Contato',
    'nav.cta': 'Conversar',

    // Hero
    'hero.badge': 'Disponível',
    'hero.location': 'Rio de Janeiro, Brasil · Trabalho Remoto ou Híbrido',
    'hero.role': 'Engenheiro de Software Full Stack',
    'hero.headline': 'Construo produtos web robustos, APIs de alta integridade e automações críticas de negócio.',
    'hero.sub': 'Atuação em produtos web, arquitetura de APIs, integrações empresariais, automações e IA aplicada. Construo soluções escaláveis que conectam interfaces, dados e sistemas de negócio, reduzindo atrito operacional e convertendo processos complexos em experiências eficientes.',
    'hero.cta.projects': 'Projetos',
    'hero.cta.contact': 'Entrar em Contato',
    'hero.statement.title': 'Princípios de Engenharia',
    'hero.statement.desc': 'Priorizo previsibilidade técnica sobre complexidade desnecessária. IA entra como alavanca secundária onde realmente resolve problemas analíticos de forma mensurável.',

    // Stats / Highlights (Honest, specific)
    'hero.stat1.val': '4+ anos',
    'hero.stat1.lbl': 'Experiência em Engenharia',
    'hero.stat2.val': 'Full Stack',
    'hero.stat2.lbl': 'TypeScript, React & Node',
    'hero.stat3.val': 'APIs & Dados',
    'hero.stat3.lbl': 'PostgreSQL, Supabase & Webhooks',

    // Tech
    'tech.subtitle': 'Arquitetura & Fundamentos',
    'tech.title': 'Domínios Técnicos & Tecnologias',
    'tech.desc': 'As ferramentas que uso no dia a dia e onde cada uma entra.',
    'tech.highlight': 'Diretriz de Trabalho',
    'tech.highlight.desc': 'Engenharia orientada à longevidade',
    'tech.highlight.sub': 'Código testável, tipagem estrita de ponta a ponta e interfaces que respeitam a carga cognitiva do usuário.',

    // Experience
    'exp.badge': 'Carreira & Formação',
    'exp.title': 'Trajetória Profissional',
    'exp.tab.work': 'Experiência',
    'exp.tab.edu': 'Formação & Certificações',
    'exp.edu.title': 'Formação Acadêmica',
    'exp.edu.sub': 'Ensino Superior',
    'exp.edu.degree': 'Bacharelado em Ciência da Computação',
    'exp.edu.inst': 'Universidade Estácio de Sá',
    'exp.edu.period': 'Graduação: 2025',
    'exp.edu.status': 'Formação Concluída / Bacharel em 2025',
    'exp.cert.title': 'Certificações Selecionadas',
    'exp.cert.sub': 'Aprimoramento Contínuo',
    'exp.lang.title': 'Idiomas',
    'exp.lang.sub': 'Comunicação Global',

    // Projects
    'proj.badge': 'Portfólio de Engenharia',
    'proj.title': 'Estudos de Caso Selecionados',
    'proj.desc': 'Projetos reais com problemas de negócio concretos, decisões arquiteturais documentadas e soluções em produção.',
    'proj.filter.all': 'Todos',
    'proj.filter.web': 'Produtos Web & SaaS',
    'proj.filter.api': 'Integrações & APIs',
    'proj.filter.data': 'Bancos de Dados & Automação',
    'proj.label.challenge': 'Contexto & Desafio',
    'proj.label.solution': 'Arquitetura & Solução',
    'proj.label.impact': 'Resultados & Métricas',
    'proj.label.stack': 'Tecnologias Utilizadas',
    'proj.action.live': 'Acessar Aplicação',
    'proj.action.github': 'Repositório',
    'proj.action.details': 'Ver Detalhes do Caso',

    // Footer
    'foot.cta': 'Pronto para colaborar em projetos desafiadores.',
    'foot.desc': 'Seja para posições full stack em tempo integral, estruturação de integrações complexas ou desenvolvimento de novos produtos web, vamos conversar.',
    'foot.mail': 'E-mail Direto',
    'foot.linkedin': 'LinkedIn',
    'foot.github': 'GitHub',
    'foot.form.title': 'Envie uma mensagem direta',
    'foot.form.name': 'Nome',
    'foot.form.name.placeholder': 'Seu nome completo',
    'foot.form.email': 'E-mail corporativo',
    'foot.form.subject': 'Natureza da conversa',
    'foot.form.sub.rec': 'Oportunidade Profissional (Full-time / Remoto)',
    'foot.form.sub.ai': 'Projeto de Integração / APIs / Automação',
    'foot.form.sub.full': 'Desenvolvimento de Produto Web',
    'foot.form.sub.other': 'Outro Assunto',
    'foot.form.msg': 'Mensagem',
    'foot.form.msg.placeholder': 'Descreva brevemente o projeto, escopo ou oportunidade...',
    'foot.form.btn.sending': 'Enviando...',
    'foot.form.btn.sent': 'Mensagem enviada com sucesso',
    'foot.form.btn.send': 'Enviar Mensagem',
    'foot.form.success': 'Mensagem entregue com sucesso. Responderei em breve.',
    'foot.copy': '© 2026 Wallace de Carvalho Pereira. Todos os direitos reservados.',
    'foot.powered': 'Construído com React, TypeScript & Tailwind CSS',
    'foot.top': 'Topo'
  },
  en: {
    // Navigation
    'nav.inicio': 'About',
    'nav.projetos': 'Projects',
    'nav.experiencia': 'Career',
    'nav.tecnologias': 'Skills',
    'nav.contato': 'Contact',
    'nav.cta': 'Get in Touch',

    // Hero
    'hero.badge': 'Available',
    'hero.location': 'Rio de Janeiro, Brazil · Remote or Hybrid',
    'hero.role': 'Full Stack Software Engineer',
    'hero.headline': 'Building robust web products, high-integrity APIs, and mission-critical business automations.',
    'hero.sub': 'Full Stack Software Engineer with over 4 years of experience in TypeScript, JavaScript, React, Angular, APIs, databases, automations, and applied AI. I build solutions connecting web products, data, and business processes.',
    'hero.cta.projects': 'Projects',
    'hero.cta.contact': 'Get in Touch',
    'hero.statement.title': 'Engineering Values',
    'hero.statement.desc': 'Prioritizing architectural predictability over premature complexity. AI is used as a secondary leverage multiplier where it genuinely solves analytical bottlenecks.',

    // Stats / Highlights
    'hero.stat1.val': '4+ years',
    'hero.stat1.lbl': 'Engineering Experience',
    'hero.stat2.val': 'Full Stack',
    'hero.stat2.lbl': 'TypeScript, React & Node',
    'hero.stat3.val': 'APIs & Data',
    'hero.stat3.lbl': 'PostgreSQL, Supabase & Webhooks',

    // Tech
    'tech.subtitle': 'Architecture & Foundations',
    'tech.title': 'Technical Domains & Capabilities',
    'tech.desc': 'The tools I use day to day and where each one fits.',
    'tech.highlight': 'Working Principle',
    'tech.highlight.desc': 'Engineering for longevity',
    'tech.highlight.sub': 'Testable code, strict end-to-end typing, and clean user interfaces that respect mental bandwidth.',

    // Experience
    'exp.badge': 'Career & Education',
    'exp.title': 'Professional Journey',
    'exp.tab.work': 'Experience',
    'exp.tab.edu': 'Education & Credentials',
    'exp.edu.title': 'Academic Degree',
    'exp.edu.sub': 'Higher Education',
    'exp.edu.degree': 'Bachelor of Science in Computer Science',
    'exp.edu.inst': 'Estácio de Sá University',
    'exp.edu.period': 'Graduation: 2025',
    'exp.edu.status': 'Formally Completed / Graduated in 2025',
    'exp.cert.title': 'Selected Certifications',
    'exp.cert.sub': 'Continuous Mastery',
    'exp.lang.title': 'Languages',
    'exp.lang.sub': 'Global Communication',

    // Projects
    'proj.badge': 'Engineering Portfolio',
    'proj.title': 'Featured Case Studies',
    'proj.desc': 'Real-world projects with defined business challenges, documented architectural choices, and deployed production solutions.',
    'proj.filter.all': 'All',
    'proj.filter.web': 'Web Products & SaaS',
    'proj.filter.api': 'Integrations & APIs',
    'proj.filter.data': 'Databases & Automation',
    'proj.label.challenge': 'Context & Challenge',
    'proj.label.solution': 'Architecture & Solution',
    'proj.label.impact': 'Key Impact & Metrics',
    'proj.label.stack': 'Tech Stack',
    'proj.action.live': 'View Live Application',
    'proj.action.github': 'Source Code',
    'proj.action.details': 'Case Study Breakdown',

    // Footer
    'foot.cta': 'Open to engineering challenges and meaningful collaboration.',
    'foot.desc': 'Whether for full-time full stack positions, structuring complex integration pipelines, or building modern web applications, let us start a conversation.',
    'foot.mail': 'Direct Email',
    'foot.linkedin': 'LinkedIn',
    'foot.github': 'GitHub',
    'foot.form.title': 'Send a direct message',
    'foot.form.name': 'Name',
    'foot.form.name.placeholder': 'Your full name',
    'foot.form.email': 'Work Email',
    'foot.form.subject': 'Inquiry Topic',
    'foot.form.sub.rec': 'Engineering Opportunity (Full-time / Remote)',
    'foot.form.sub.ai': 'Integration / API / Automation Pipeline',
    'foot.form.sub.full': 'Web Product Development',
    'foot.form.sub.other': 'Other Subject',
    'foot.form.msg': 'Message',
    'foot.form.msg.placeholder': 'Briefly describe your team, problem space or opportunity...',
    'foot.form.btn.sending': 'Sending...',
    'foot.form.btn.sent': 'Message sent successfully',
    'foot.form.btn.send': 'Send Message',
    'foot.form.success': 'Your message has been delivered. I will get back to you shortly.',
    'foot.copy': '© 2026 Wallace de Carvalho Pereira. All rights reserved.',
    'foot.powered': 'Built with React, TypeScript & Tailwind CSS',
    'foot.top': 'Top'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'pt';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const t = (key: string): any => {
    return translations[language][key] || translations['pt'][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
