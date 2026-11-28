import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  FileDown,
  Mail,
  MessageCircle,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadResumePdf } from '../utils/generateResumePdf';
import { answerPortfolioQuestion } from '../utils/localPortfolioAssistant';
import { SafeChatText } from '../utils/safeChatText';

export interface ChatUiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isErrorFallback?: boolean;
}

interface ChatAssistantWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatUiMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatUiMessage[]>>;
  onClear: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MAX_INPUT_CHARS = 600;

const SUGGESTIONS_PT = [
  'Quais projetos ele desenvolveu?',
  'Qual é a experiência com integrações?',
  'Como entrar em contato?',
];

const SUGGESTIONS_EN = [
  'What projects has he built?',
  'What is his integration experience?',
  'How can I contact him?',
];

export default function ChatAssistantWindow({
  isOpen,
  onClose,
  messages,
  setMessages,
  onClear,
  triggerRef,
}: ChatAssistantWindowProps) {
  const { language } = useApp();
  const isPt = language === 'pt';
  const navigate = useNavigate();
  const location = useLocation();

  const [input, setInput] = useState('');
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(isOpen);

  const hasUserMessages = messages.some((m) => m.role === 'user');
  const suggestions = isPt ? SUGGESTIONS_PT : SUGGESTIONS_EN;

  // Focus input on open; restore focus to launcher button on close
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      wasOpenRef.current = true;
      return () => window.clearTimeout(timer);
    }

    if (!isOpen && wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  // Close cleanly with Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Keep latest message scrolled into view without moving focus away from textarea
  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [messages, isOpen]);

  const handleInternalNavigate = (href: string) => {
    const hash = href.startsWith('/') ? href.slice(1) : href;
    const targetId = hash.replace('#', '');

    if (location.pathname !== '/') {
      navigate(href);
    } else if (targetId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const navOffset = (document.getElementById('main-navbar')?.offsetHeight ?? 65) + 16;
        const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }

    if (window.innerWidth < 640) {
      onClose();
    }
  };

  const sendMessage = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    if (trimmed.length > MAX_INPUT_CHARS) {
      setInlineError(
        isPt
          ? `A mensagem excede o limite de ${MAX_INPUT_CHARS} caracteres.`
          : `Message exceeds the ${MAX_INPUT_CHARS}-character limit.`
      );
      return;
    }

    setInlineError(null);

    const userMsg: ChatUiMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    const previousQuestion = [...messages].reverse().find((message) => message.role === 'user')?.content || '';
    const reply = answerPortfolioQuestion(trimmed, language, previousQuestion);
    const assistantReply: ChatUiMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: reply,
    };
    setMessages([...nextMessages, assistantReply]);
    setLiveAnnouncement(reply);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const handleClearConversation = () => {
    setInlineError(null);
    setLiveAnnouncement(isPt ? 'Conversa limpa.' : 'Conversation cleared.');
    onClear();
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div
      id="wallace-chat-dialog"
      ref={dialogRef}
      role="dialog"
      aria-label={isPt ? 'Assistente do Wallace' : "Wallace's Assistant"}
      className="fixed right-4 sm:right-6 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] sm:bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-50 w-[calc(100vw-2rem)] max-w-[380px] h-[min(540px,calc(100dvh-6.25rem-env(safe-area-inset-bottom)))] flex flex-col bg-theme-surface border border-theme-border rounded-2xl shadow-2xl overflow-hidden text-theme-text"
    >
      {/* Header */}
      <header className="shrink-0 px-4 py-3 border-b border-theme-border bg-theme-bg/80 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-theme-text truncate">
            {isPt ? 'Assistente do Wallace' : "Wallace's Assistant"}
          </h2>
          <p className="text-[11px] font-mono text-theme-muted truncate">
            {isPt ? 'Busca local · perfil e projetos' : 'Local search · profile & projects'}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {hasUserMessages && (
            <button
              type="button"
              onClick={handleClearConversation}
              title={isPt ? 'Limpar conversa' : 'Clear conversation'}
              aria-label={isPt ? 'Limpar conversa' : 'Clear conversation'}
              className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-card/70 disabled:opacity-40 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            title={isPt ? 'Fechar assistente' : 'Close assistant'}
            aria-label={isPt ? 'Fechar assistente' : 'Close assistant'}
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-text hover:bg-theme-card/70 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Polite screen-reader announcement only on completed replies/errors */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3.5 overscroll-contain">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] rounded-xl px-3.5 py-2.5 ${
                msg.role === 'user'
                  ? 'bg-theme-text text-theme-bg text-[13.5px] leading-relaxed break-words'
                  : 'bg-theme-bg/85 border border-theme-border/80 text-theme-dim'
              }`}
            >
              {msg.role === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <SafeChatText text={msg.content} onInternalNavigate={handleInternalNavigate} />
              )}

              {msg.isErrorFallback && (
                <div className="mt-3 pt-2.5 border-t border-theme-border/70 flex flex-wrap gap-1.5">
                  <a
                    href="mailto:wcps2001@gmail.com"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-theme-border bg-theme-surface text-[11px] font-mono text-theme-text hover:border-theme-muted transition-colors"
                  >
                    <Mail className="w-3 h-3" aria-hidden="true" />
                    <span>E-mail</span>
                  </a>
                  <a
                    href="https://wa.me/5521999688381"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-theme-border bg-theme-surface text-[11px] font-mono text-theme-text hover:border-theme-muted transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="/#projetos"
                    onClick={(e) => {
                      e.preventDefault();
                      handleInternalNavigate('/#projetos');
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-theme-border bg-theme-surface text-[11px] font-mono text-theme-text hover:border-theme-muted transition-colors"
                  >
                    <span>{isPt ? 'Projetos' : 'Projects'}</span>
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <a
                    href="/#contato"
                    onClick={(e) => {
                      e.preventDefault();
                      handleInternalNavigate('/#contato');
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-theme-border bg-theme-surface text-[11px] font-mono text-theme-text hover:border-theme-muted transition-colors"
                  >
                    <span>{isPt ? 'Contato' : 'Contact'}</span>
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadResumePdf(language)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-theme-border bg-theme-surface text-[11px] font-mono text-theme-text hover:border-theme-muted transition-colors cursor-pointer"
                  >
                    <FileDown className="w-3 h-3" aria-hidden="true" />
                    <span>{isPt ? 'Currículo PDF' : 'Resume PDF'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Initial suggestions before first send (max 3) */}
        {!hasUserMessages && (
          <div className="pt-1 space-y-1.5">
            <span className="block text-[11px] font-mono text-theme-muted">
              {isPt ? 'Sugestões:' : 'Suggestions:'}
            </span>
            <div className="flex flex-col items-start gap-1.5">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendMessage(suggestion)}
                  className="text-left text-xs px-3 py-1.5 rounded-lg border border-theme-border/90 bg-theme-bg/60 text-theme-dim hover:text-theme-text hover:border-theme-muted transition-colors cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Privacy notice + Input composer */}
      <footer className="shrink-0 border-t border-theme-border bg-theme-bg/70 px-3.5 py-2.5 space-y-2">
        {!hasUserMessages && (
          <p className="text-[11px] leading-snug text-theme-muted">
            {isPt
              ? 'Respostas locais baseadas no portfólio. Suas mensagens não são enviadas a uma API de IA.'
              : 'Answers are generated locally from the portfolio. Your messages are not sent to an AI API.'}
          </p>
        )}

        {inlineError && (
          <p role="alert" className="text-[11px] font-mono text-theme-dim">
            {inlineError}
          </p>
        )}

        <form onSubmit={handleFormSubmit} className="flex items-end gap-2">
          <label htmlFor="wallace-chat-input" className="sr-only">
            {isPt ? 'Escreva sua pergunta sobre o Wallace' : 'Write your question about Wallace'}
          </label>
          <textarea
            id="wallace-chat-input"
            ref={inputRef}
            rows={1}
            value={input}
            maxLength={MAX_INPUT_CHARS}
            onChange={(e) => {
              setInput(e.target.value);
              if (inlineError) setInlineError(null);
            }}
            onKeyDown={handleTextareaKeyDown}
            placeholder={
              isPt
                ? 'Pergunte sobre projetos, stack ou contato...'
                : 'Ask about projects, stack, or contact...'
            }
            className="flex-1 min-h-[40px] max-h-24 resize-none rounded-xl border border-theme-border bg-theme-surface px-3 py-2 text-base sm:text-sm text-theme-text placeholder:text-theme-muted focus:border-theme-muted focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label={isPt ? 'Enviar mensagem' : 'Send message'}
            title={isPt ? 'Enviar mensagem' : 'Send message'}
            className="h-10 w-10 shrink-0 rounded-xl bg-theme-text text-theme-bg flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-theme-text"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
      </footer>
    </div>
  );
}
