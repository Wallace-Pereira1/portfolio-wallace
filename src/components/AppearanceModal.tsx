import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Palette } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { THEME_OPTIONS, ThemeId } from '../data/themes';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

interface AppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export default function AppearanceModal({
  isOpen,
  onClose,
  triggerElement,
}: AppearanceModalProps) {
  const { theme, setTheme, language } = useApp();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalAccessibility(isOpen, onClose, dialogRef, closeButtonRef, triggerElement);

  const isEnglish = language === 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[620px] max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] my-auto bg-theme-surface border border-theme-border rounded-xl shadow-2xl flex flex-col overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appearance-modal-title"
            aria-describedby="appearance-modal-desc"
          >
            {/* Header */}
            <header className="flex items-start justify-between p-5 sm:p-6 border-b border-theme-border bg-theme-surface shrink-0">
              <div className="space-y-1 pr-4 min-w-0">
                <div className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-theme-muted" aria-hidden="true" />
                  <span className="text-xs font-mono uppercase tracking-widest text-theme-muted block">
                    {isEnglish ? 'Settings → Appearance' : 'Configurações → Aparência'}
                  </span>
                </div>
                <h3
                  id="appearance-modal-title"
                  className="text-lg sm:text-xl font-semibold text-theme-text tracking-tight leading-snug"
                >
                  {isEnglish ? 'Color Themes' : 'Temas de Cores'}
                </h3>
                <p id="appearance-modal-desc" className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                  {isEnglish
                    ? 'Select a theme to personalize the portfolio. Light and Dark modes remain available alongside curated color palettes.'
                    : 'Selecione uma paleta para personalizar todo o portfólio. Os modos Claro e Escuro continuam disponíveis com novas opções de cores.'}
                </p>
              </div>

              {/* Botão Fechar */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={isEnglish ? 'Close appearance settings' : 'Fechar configurações de aparência'}
                className="p-1.5 sm:p-2 border border-theme-border rounded-lg bg-theme-bg hover:border-theme-text hover:text-theme-text text-theme-dim transition-colors cursor-pointer shrink-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* Content: Theme grid */}
            <div
              role="radiogroup"
              aria-label={isEnglish ? 'Theme options' : 'Opções de tema'}
              className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-theme-bg/40 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5"
            >
              {THEME_OPTIONS.map((option) => {
                const isSelected = theme === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setTheme(option.id)}
                    className={`group relative text-left p-3.5 sm:p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-theme-text ${
                      isSelected
                        ? 'border-theme-text bg-theme-surface shadow-sm ring-1 ring-theme-text/30'
                        : 'border-theme-border/70 bg-theme-surface/70 hover:border-theme-border hover:bg-theme-surface'
                    }`}
                  >
                    {/* Top Row: Name and Selection Indicator */}
                    <div className="flex items-center justify-between gap-2 w-full">
                      <div className="min-w-0">
                        <span
                          className={`block text-sm font-semibold tracking-tight transition-colors ${
                            isSelected ? 'text-theme-text' : 'text-theme-text group-hover:text-theme-text'
                          }`}
                        >
                          {isEnglish ? option.nameEn : option.namePt}
                        </span>
                        <span className="block text-[11px] text-theme-muted line-clamp-1 mt-0.5">
                          {isEnglish ? option.descriptionEn : option.descriptionPt}
                        </span>
                      </div>

                      {/* Check indicator */}
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? 'border-theme-text bg-theme-text text-theme-bg'
                            : 'border-theme-border/80 bg-theme-bg/60 text-transparent group-hover:border-theme-border'
                        }`}
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    </div>

                    {/* Color Swatch Preview (The 6 palette colors) */}
                    <div
                      className="w-full flex items-center h-5 rounded-md overflow-hidden border border-black/20 shadow-inner"
                      aria-label={`${isEnglish ? option.nameEn : option.namePt} ${isEnglish ? 'color palette' : 'paleta de cores'}`}
                    >
                      {option.swatch.map((hex, idx) => (
                        <div
                          key={idx}
                          className="flex-1 h-full transition-transform hover:scale-105"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <footer className="p-4 sm:p-5 border-t border-theme-border bg-theme-surface flex items-center justify-between text-xs font-mono shrink-0">
              <span className="text-theme-muted text-xs truncate max-w-[280px]">
                {isEnglish ? 'Active theme: ' : 'Tema ativo: '}
                <strong className="text-theme-text font-semibold">
                  {THEME_OPTIONS.find((o) => o.id === theme)?.[isEnglish ? 'nameEn' : 'namePt'] || theme}
                </strong>
              </span>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 border border-theme-border bg-theme-bg hover:border-theme-text text-theme-text rounded-md transition-colors cursor-pointer uppercase tracking-wider text-xs"
              >
                {isEnglish ? 'Done' : 'Concluído'}
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
