import React from 'react';
import { BrowserRouter, useLocation, useParams, useRoutes, useSearchParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import TrajetoriaPage from './pages/TrajetoriaPage';
import CompetenciasPage from './pages/CompetenciasPage';
import ContatoPage from './pages/ContatoPage';
import NotFoundPage from './pages/NotFoundPage';
import EstudosPage from './pages/EstudosPage';
import ChatAssistantLauncher from './components/ChatAssistantLauncher';
import { projectsPt } from './data/projects';

function CaseStudiesRoute() {
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const rawProjectId = id || searchParams.get('id');
  const projectId = rawProjectId?.length === 1 ? `0${rawProjectId}` : rawProjectId;
  const projectExists = !projectId || projectsPt.some((project) => project.id === projectId && !project.disabled);

  return projectExists ? <EstudosPage /> : <NotFoundPage />;
}

function AnimatedRoutes() {
  const location = useLocation();

  const prevPathRef = React.useRef(location.pathname);
  const isInitialRef = React.useRef(true);

  // Scroll to top only on subsequent route navigations, NEVER fight initial mount scroll gestures
  React.useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      if (!location.hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        });
      }
    }
  }, [location.pathname, location.hash]);

  const element = useRoutes(
    [
      { path: '/', element: <HomePage /> },
      { path: '/trajetoria', element: <TrajetoriaPage /> },
      { path: '/competencias', element: <CompetenciasPage /> },
      { path: '/contato', element: <ContatoPage /> },
      { path: '/estudos', element: <CaseStudiesRoute /> },
      { path: '/projetos/:id', element: <CaseStudiesRoute /> },
      { path: '*', element: <NotFoundPage /> },
    ],
    location
  );

  return (
    <>
      {element && (
        <PageTransition key={location.pathname}>
          {element}
        </PageTransition>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-theme-bg text-theme-text min-h-screen selection:bg-brand-blue/20 selection:text-theme-text transition-colors duration-200 flex flex-col justify-between relative">
        {/* Fundo global: grade, brilho de acento, retângulos sobrepostos e grão */}
        <Backdrop />
        <Navbar />
        <main className="flex-1 w-full flex flex-col relative z-10">
          <AnimatedRoutes />
        </main>
        <ChatAssistantLauncher />
      </div>
    </BrowserRouter>
  );
}
