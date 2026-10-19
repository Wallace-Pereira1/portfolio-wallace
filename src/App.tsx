import React from 'react';
import { BrowserRouter, useLocation, useRoutes, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import DitherWaveBackground from './components/DitherWaveBackground';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import EstudosPage from './pages/EstudosPage';
import TrajetoriaPage from './pages/TrajetoriaPage';
import CompetenciasPage from './pages/CompetenciasPage';
import ContatoPage from './pages/ContatoPage';
import NotFoundPage from './pages/NotFoundPage';

function AnimatedRoutes() {
  const location = useLocation();

  // Reset scroll restoration on mount and enforce initial top scroll
  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // If opening root page with leftover hash from prior session, start clean at top
    if (window.location.pathname === '/' && window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, []);

  React.useEffect(() => {
    if (!location.hash || location.hash === '#inicio') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    }
  }, [location.pathname, location.hash]);

  const element = useRoutes(
    [
      { path: '/', element: <HomePage /> },
      { path: '/estudos', element: <EstudosPage /> },
      { path: '/projetos/:id', element: <EstudosPage /> },
      { path: '/trajetoria', element: <TrajetoriaPage /> },
      { path: '/competencias', element: <CompetenciasPage /> },
      { path: '/contato', element: <ContatoPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
    location
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {element && (
        <PageTransition key={location.pathname}>
          {element}
        </PageTransition>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-theme-bg text-theme-text min-h-screen selection:bg-brand-blue/20 selection:text-theme-text transition-colors duration-200 flex flex-col justify-between overflow-x-hidden relative">
        {/* Fundo global: grade, brilho de acento, retângulos sobrepostos e grão */}
        <Backdrop />
        {/* Dither em escala de cinza: fino, lento e mascarado (só no topo) */}
        <DitherWaveBackground
          isFixed={true}
          className="dither-mask"
          baseColor="#08090a"
          waveColor="#4a4a4a"
          pixelSize={3}
          colorNum={4}
          waveSpeed={0.012}
          waveFrequency={1.6}
          waveAmplitude={0.18}
          opacity={0.26}
        />
        <Navbar />
        <main className="flex-1 w-full flex flex-col overflow-x-hidden relative z-10">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
