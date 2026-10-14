import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, Search, X, Check, Brain, Database, Code, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: number;
  category: 'software' | 'automation_ai' | 'data_infra';
  url: string;
}

const certificatesData: Certificate[] = [
  // IA & Automação (automation_ai)
  {
    id: 'ai-1',
    title: 'Carreira Especialista em IA: Primeiros passos',
    issuer: 'Alura',
    year: 2025,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-2',
    title: 'Make: automatizando respostas de clientes',
    issuer: 'Alura',
    year: 2025,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-3',
    title: 'Flash Skills: N8N e automação de processos com IA',
    issuer: 'Alura',
    year: 2025,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-4',
    title: 'Aprendizagem com IA: personalizando sua rotina com ChatGPT',
    issuer: 'Alura',
    year: 2024,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-5',
    title: 'Copywriting: criando textos persuasivos com Inteligência Artificial',
    issuer: 'Alura',
    year: 2024,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-6',
    title: 'ChatGPT: desvendando a IA em conversas e suas aplicações',
    issuer: 'Alura',
    year: 2024,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-7',
    title: 'ChatGPT: otimizando a qualidade dos resultados',
    issuer: 'Alura',
    year: 2024,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-8',
    title: 'Engenharia de Prompt: criando prompts eficazes para IA Generativa',
    issuer: 'Alura',
    year: 2024,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-9',
    title: 'IA: explorando o potencial da inteligência artificial generativa',
    issuer: 'Alura',
    year: 2024,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'ai-10',
    title: 'Negociação: treinando habilidades com IA',
    issuer: 'Alura',
    year: 2025,
    category: 'automation_ai',
    url: 'https://cursos.alura.com.br'
  },

  // Dados & Infraestrutura (data_infra)
  {
    id: 'data-1',
    title: 'Análise de Dados para Tomada de Decisão',
    issuer: 'Estácio',
    year: 2024,
    category: 'data_infra',
    url: 'https://estacio.br'
  },
  {
    id: 'data-2',
    title: 'Gerência, Organização e Recuperação das Informações',
    issuer: 'Estácio',
    year: 2023,
    category: 'data_infra',
    url: 'https://estacio.br'
  },
  {
    id: 'data-3',
    title: 'Data Science: explorando e analisando dados',
    issuer: 'Alura',
    year: 2025,
    category: 'data_infra',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'data-4',
    title: 'Python para Data Science: primeiros passos',
    issuer: 'Alura',
    year: 2025,
    category: 'data_infra',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'data-5',
    title: 'Modelagem de dados: construindo o modelo físico',
    issuer: 'Alura',
    year: 2025,
    category: 'data_infra',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'data-6',
    title: 'Modelagem de dados: aplicando a normalização',
    issuer: 'Alura',
    year: 2025,
    category: 'data_infra',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'data-7',
    title: 'Modelagem de dados: identificando entidades, atributos, relacionamentos',
    issuer: 'Alura',
    year: 2025,
    category: 'data_infra',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'data-8',
    title: 'MySQL: conhecendo a ferramenta',
    issuer: 'Alura',
    year: 2025,
    category: 'data_infra',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'infra-1',
    title: 'AWS Discovery Day',
    issuer: 'SAP Education',
    year: 2023,
    category: 'data_infra',
    url: 'https://aws.amazon.com'
  },

  // Engenharia de Software (software)
  {
    id: 'soft-1',
    title: 'Desenvolvimento Rápido de Aplicações em Python para Cloud, IOT e BigData',
    issuer: 'Estácio',
    year: 2024,
    category: 'software',
    url: 'https://estacio.br'
  },
  {
    id: 'soft-2',
    title: 'Programação de Sistemas de Informação',
    issuer: 'Estácio',
    year: 2023,
    category: 'software',
    url: 'https://estacio.br'
  },
  {
    id: 'soft-3',
    title: 'Programação para Internet',
    issuer: 'Estácio',
    year: 2023,
    category: 'software',
    url: 'https://estacio.br'
  },
  {
    id: 'soft-4',
    title: 'Python: crie a sua primeira aplicação',
    issuer: 'Alura',
    year: 2025,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-5',
    title: 'Lógica de programação: praticando com desafios',
    issuer: 'Alura',
    year: 2025,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-6',
    title: 'Git e GitHub: compartilhando e colaborando em projetos',
    issuer: 'Alura',
    year: 2025,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-7',
    title: 'Lógica de programação: explore funções e listas',
    issuer: 'Alura',
    year: 2025,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-8',
    title: 'Lógica de programação: mergulhe em JavaScript',
    issuer: 'Alura',
    year: 2024,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-9',
    title: 'Começando em Programação',
    issuer: 'Alura',
    year: 2024,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-10',
    title: 'HTML e CSS (Série Completa)',
    issuer: 'Alura',
    year: 2024,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  },
  {
    id: 'soft-11',
    title: 'Curso Web Moderno Completo com JavaScript',
    issuer: 'Udemy',
    year: 2022,
    category: 'software',
    url: 'https://www.udemy.com'
  },
  {
    id: 'soft-12',
    title: 'Complete JAVASCRIPT with HTML5, CSS3',
    issuer: 'Udemy',
    year: 2022,
    category: 'software',
    url: 'https://www.udemy.com'
  },
  {
    id: 'soft-13',
    title: 'Smart Summit 2025',
    issuer: 'be.smart',
    year: 2025,
    category: 'software',
    url: 'https://besmart.group'
  },
  {
    id: 'soft-14',
    title: 'SAP TO WORK. Você 5X Mais Valioso',
    issuer: 'AC International Group',
    year: 2022,
    category: 'software',
    url: 'https://www.sap.com'
  },
  {
    id: 'soft-15',
    title: 'Entrevista com CFO da Ericsson',
    issuer: 'Alura',
    year: 2025,
    category: 'software',
    url: 'https://cursos.alura.com.br'
  }
];

// Highlight/Feature the top 3 most relevant certificates as default display cards
const featuredCertificateIds = ['ai-3', 'soft-1', 'data-1'];

export default function Certifications() {
  const { language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'software' | 'automation_ai' | 'data_infra'>('all');

  const featuredCerts = certificatesData.filter(cert => featuredCertificateIds.includes(cert.id));

  // Category labels with standard Translation handles
  const categoriesPt = {
    all: 'Todos',
    software: 'Engenharia de Software',
    automation_ai: 'Automação & IA',
    data_infra: 'Dados & Infraestrutura'
  };

  const categoriesEn = {
    all: 'All',
    software: 'Software Engineering',
    automation_ai: 'Automation & AI',
    data_infra: 'Data & Infrastructure'
  };

  const categories = language === 'pt' ? categoriesPt : categoriesEn;

  const labelsPt = {
    title: 'Certificações & Credenciais',
    subtitle: 'Qualificação Avançada',
    viewMore: 'Ver todas as credenciais',
    searchPlaceholder: 'Filtrar credências por nome ou instituição...',
    credentialBtn: 'Ver credencial',
    closed: 'Fechar',
    totalText: 'certificados no total',
    emptySearch: 'Nenhum certificado encontrado para sua busca.',
    featuredBadge: 'Destaque'
  };

  const labelsEn = {
    title: 'Certifications & Credentials',
    subtitle: 'Advanced Qualification',
    viewMore: 'View all credentials',
    searchPlaceholder: 'Filter credentials by name or emitter...',
    credentialBtn: 'View credential',
    closed: 'Close',
    totalText: 'total certificates',
    emptySearch: 'No certificates found for your search query.',
    featuredBadge: 'Featured'
  };

  const labels = language === 'pt' ? labelsPt : labelsEn;

  // Handle escape key to close modal
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const filteredCertificates = certificatesData.filter(cert => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: 'software' | 'automation_ai' | 'data_infra') => {
    switch (category) {
      case 'software':
        return <Code className="w-4 h-4 text-theme-text" />;
      case 'automation_ai':
        return <Brain className="w-4 h-4 text-theme-text" />;
      case 'data_infra':
        return <Database className="w-4 h-4 text-theme-text" />;
    }
  };

  return (
    <div className="mt-12">
      {/* Mini Title for the Section inside Experience & Journey Tab */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs uppercase text-theme-muted tracking-wider">
          {labels.title}
        </span>
        <div className="h-[1px] bg-theme-border flex-grow" />
      </div>

      {/* Grid displaying exactly 3 most relevant / featured certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredCerts.map((cert) => (
          <div
            key={cert.id}
            className="group relative flex flex-col justify-between bg-theme-surface border border-theme-border rounded-[2px] p-5 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-1.5 rounded-[2px] bg-theme-bg border border-theme-border text-theme-muted">
                  {getCategoryIcon(cert.category)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-theme-muted border border-theme-border bg-theme-bg px-1.5 py-0.5 rounded-[2px] font-normal uppercase">
                    {labels.featuredBadge}
                  </span>
                  <span className="font-mono text-[10px] text-theme-muted">{cert.year}</span>
                </div>
              </div>
              <h4 className="font-medium text-sm leading-snug text-theme-text group-hover:underline line-clamp-2">
                {cert.title}
              </h4>
              <p className="text-xs text-theme-dim mt-2">
                {cert.issuer}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-theme-border-subtle">
              <a
                href={cert.url}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-theme-text hover:underline uppercase"
              >
                {labels.credentialBtn} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Button to read all certificates */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-theme-border hover:border-theme-text/40 bg-theme-surface text-theme-text text-xs tracking-wider uppercase font-mono rounded-[2px] transition-colors"
        >
          <Award className="w-3.5 h-3.5 shrink-0 text-theme-muted" />
          <span>{labels.viewMore}</span>
          <span className="font-mono text-[10px] ml-1 bg-theme-bg text-theme-muted border border-theme-border px-1.5 py-0.5 rounded-[2px]">
            {certificatesData.length}
          </span>
        </button>
      </div>

      {/* Elegant, clean modal using AnimatePresence & Framer Motion overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col bg-theme-surface border border-theme-border rounded-[2px] shadow-2xl z-20"
            >
              
              {/* Header Title Bar */}
              <div className="flex items-center justify-between p-6 border-b border-theme-border bg-theme-bg">
                <div>
                  <h3 className="font-semibold text-lg text-theme-text flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-theme-text" />
                    <span>{labels.title}</span>
                  </h3>
                  <p className="text-theme-dim text-xs font-mono mt-1 uppercase tracking-wider">
                    {certificatesData.length} {labels.totalText}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-[2px] bg-theme-surface hover:bg-theme-border text-theme-dim hover:text-theme-text border border-theme-border transition-colors"
                  aria-label={labels.closed}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filtering Controls Row */}
              <div className="p-6 border-b border-theme-border bg-theme-surface space-y-4">
                
                {/* Search Text Input */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-dim">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder={labels.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-theme-bg text-theme-text border border-theme-border focus:border-theme-text rounded-[2px] pl-10 pr-4 py-2 text-xs font-mono outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-theme-dim hover:text-theme-text transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Categorization Tabs Selector Grid */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['all', 'software', 'automation_ai', 'data_infra'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-[2px] text-xs font-mono tracking-wide uppercase transition-colors border ${
                        selectedCategory === cat
                          ? 'bg-theme-text text-theme-bg border-theme-text font-semibold'
                          : 'bg-theme-bg border-theme-border text-theme-dim hover:text-theme-text'
                      }`}
                    >
                      {categories[cat]}
                    </button>
                  ))}
                </div>

              </div>

              {/* Scrollable list content area */}
              <div className="flex-grow p-6 overflow-y-auto bg-theme-bg space-y-4">
                {filteredCertificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCertificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="group flex flex-col justify-between p-4 bg-theme-surface border border-theme-border rounded-[2px] hover:border-theme-text/40 transition-colors"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-4 mb-2.5">
                            <span className="text-xs font-semibold text-theme-dim">
                              {cert.issuer}
                            </span>
                            <span className="font-mono text-[10px] bg-theme-bg px-1.5 py-0.5 rounded-[2px] border border-theme-border text-theme-dim flex items-center gap-1.5 shrink-0">
                              {getCategoryIcon(cert.category)}
                              {cert.year}
                            </span>
                          </div>
                          
                          <h5 className="font-semibold text-sm text-theme-text transition-colors leading-snug">
                            {cert.title}
                          </h5>
                        </div>

                        <div className="mt-4 pt-3 border-t border-theme-border-subtle flex justify-between items-center">
                          <span className="font-mono text-[9px] text-theme-muted tracking-wider uppercase">
                            {categories[cert.category]}
                          </span>
                          
                          <a
                            href={cert.url}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-theme-text hover:underline transition-colors uppercase"
                          >
                            {labels.credentialBtn} <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-theme-dim">
                    <Award className="w-10 h-10 text-theme-border mb-3" />
                    <p className="font-mono text-xs">{labels.emptySearch}</p>
                  </div>
                )}
              </div>

              {/* Footer Panel */}
              <div className="flex justify-end p-4 border-t border-theme-border bg-theme-surface">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-theme-bg hover:bg-theme-border border border-theme-border text-theme-text font-mono text-xs uppercase tracking-wider rounded-[2px] transition-colors"
                >
                  {labels.closed}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
