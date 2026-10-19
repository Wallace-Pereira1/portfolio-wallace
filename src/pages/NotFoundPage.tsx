import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EditorialColophon from '../components/EditorialColophon';
import { useApp } from '../context/AppContext';
import { usePageSeo } from '../utils/usePageSeo';

export default function NotFoundPage() {
  const { language } = useApp();

  usePageSeo({
    title:
      language === 'pt'
        ? 'Página Não Encontrada (404) | Wallace Pereira'
        : 'Page Not Found (404) | Wallace Pereira',
    description:
      language === 'pt'
        ? 'A página que você tentou acessar não foi encontrada.'
        : 'The page you requested could not be found.',
    path: '/404',
    noIndex: true,
  });

  return (
    <div className="w-full flex flex-col justify-between min-h-[calc(100dvh-5rem)]">
      <div className="w-full">
        <PageHeader
          eyebrow="HTTP 404"
          title={language === 'pt' ? 'Página não encontrada.' : 'Page not found.'}
          description={
            language === 'pt'
              ? 'O endereço acessado não existe, foi movido ou está temporariamente indisponível.'
              : 'The requested address does not exist, has been moved, or is temporarily unavailable.'
          }
          meta={[
            { label: 'Status', value: '404 Not Found' },
            { label: language === 'pt' ? 'Destino Sugerido' : 'Suggested Destination', value: 'Início (/)' },
          ]}
        />

        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <div className="p-8 bg-theme-surface border border-theme-border rounded-[2px] max-w-xl offset-card space-y-5">
            <div className="flex items-center gap-3 text-theme-muted">
              <Compass className="w-5 h-5" />
              <span className="font-mono text-xs uppercase tracking-wider">
                {language === 'pt' ? 'Navegação Segura' : 'Safe Navigation'}
              </span>
            </div>
            <p className="text-sm text-theme-dim leading-relaxed">
              {language === 'pt'
                ? 'Você pode retornar à página inicial para explorar os projetos, experiência e competências técnicas, ou entrar em contato direto.'
                : 'You can return to the home page to explore projects, professional experience, and technical competencies, or get in touch directly.'}
            </p>
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-theme-bg bg-theme-text hover:opacity-90 rounded-[2px] transition-opacity font-semibold cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'pt' ? 'Voltar ao Início' : 'Back to Home'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <EditorialColophon />
    </div>
  );
}
