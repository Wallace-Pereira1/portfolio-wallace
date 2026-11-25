import React from 'react';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import DitherWaveBackground from './components/DitherWaveBackground';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import TrajetoriaPage from './pages/TrajetoriaPage';
import CompetenciasPage from './pages/CompetenciasPage';
import ContatoPage from './pages/ContatoPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatAssistantLauncher from './components/ChatAssistantLauncher';

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
        {/* Dither em escala de cinza: fino, lento e mascarado (só no topo) 
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
        />*/}
        <Navbar />
        <main className="flex-1 w-full flex flex-col relative z-10">
          <AnimatedRoutes />
        </main>
        <ChatAssistantLauncher />
      </div>
    </BrowserRouter>
  );
}
