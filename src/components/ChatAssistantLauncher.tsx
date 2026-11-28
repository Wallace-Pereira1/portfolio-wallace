import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ChatUiMessage } from './ChatAssistantWindow';

const ChatAssistantWindow = lazy(() => import('./ChatAssistantWindow'));

function getInitialGreeting(language: 'pt' | 'en'): ChatUiMessage {
  return {
    id: 'initial-greeting',
    role: 'assistant',
    content:
      language === 'pt'
        ? 'Olá! Sou o assistente local do Wallace. Posso ajudar você a conhecer projetos, experiência e tecnologias. Suas mensagens ficam no navegador. O que gostaria de saber?'
        : "Hello! I'm Wallace's local assistant. I can help you explore his projects, experience, and technologies. Your messages stay in this browser. What would you like to know?",
  };
}

export default function ChatAssistantLauncher() {
  const { language } = useApp();
  const isPt = language === 'pt';
  const isDisabledAtBuild = import.meta.env.VITE_CHAT_ENABLED === 'false';

  const [isOpen, setIsOpen] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [messages, setMessages] = useState<ChatUiMessage[]>(() => [getInitialGreeting(language)]);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Sync static greeting language only if user hasn't started a conversation yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'initial-greeting') {
        return [getInitialGreeting(language)];
      }
      return prev;
    });
  }, [language]);

  // Optional build-time switch for hiding the assistant.
  if (isDisabledAtBuild) {
    return null;
  }

  const handleToggle = () => {
    if (!hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
    setIsOpen((prev) => !prev);
  };

  const handleClear = () => {
    setMessages([getInitialGreeting(language)]);
  };

  const buttonLabel = isOpen
    ? isPt
      ? 'Fechar assistente do Wallace'
      : "Close Wallace's assistant"
    : isPt
      ? 'Abrir assistente do Wallace'
      : "Open Wallace's assistant";

  return (
    <>
      {hasLoadedOnce && (
        <Suspense fallback={null}>
          <ChatAssistantWindow
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            messages={messages}
            setMessages={setMessages}
            onClear={handleClear}
            triggerRef={launcherRef}
          />
        </Suspense>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={handleToggle}
        aria-label={buttonLabel}
        aria-expanded={isOpen}
        aria-controls="wallace-chat-dialog"
        title={buttonLabel}
        className="fixed right-4 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 h-11 w-11 rounded-full bg-theme-surface/95 text-theme-text border border-theme-border shadow-lg hover:border-theme-muted hover:bg-theme-card transition-colors flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-theme-text"
      >
        {isOpen ? (
          <X className="w-4 h-4" aria-hidden="true" />
        ) : (
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
