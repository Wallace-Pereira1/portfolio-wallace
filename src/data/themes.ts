export type ThemeId = 'dark' | 'light' | 'cream' | 'graphite';

export interface ThemeOption {
  id: ThemeId;
  namePt: string;
  nameEn: string;
  descriptionPt: string;
  descriptionEn: string;
  color: string; // Cor principal para a bolinha do tema
  swatch: string[];
  isDarkPalette: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    namePt: 'Escuro',
    nameEn: 'Dark',
    descriptionPt: 'Padrão editorial em tons profundos de grafite e preto.',
    descriptionEn: 'Default editorial dark with deep black tones.',
    color: '#08090a',
    swatch: ['#08090a', '#0d0e10', '#121316', '#8d93a1', '#9ea4b0', '#f2f3f5'],
    isDarkPalette: true,
  },
  {
    id: 'graphite',
    namePt: 'Cinza Apple',
    nameEn: 'Graphite Dark',
    descriptionPt: 'Modo escuro em cinza neutro elevado no estilo Apple.',
    descriptionEn: 'Apple-inspired elevated neutral gray dark mode.',
    color: '#3a3a3c',
    swatch: ['#1c1c1e', '#2c2c2e', '#3a3a3c', '#8e8e93', '#aeaeb2', '#f5f5f7'],
    isDarkPalette: true,
  },
  {
    id: 'cream',
    namePt: 'Creme (Leitura)',
    nameEn: 'Cream (Reading)',
    descriptionPt: 'Tom papel quente e suave para leitura confortável.',
    descriptionEn: 'Warm paper tone designed for comfortable reading.',
    color: '#ebe0cc',
    swatch: ['#f4efe6', '#faf6ee', '#ebe3d3', '#756b5f', '#574e44', '#2b2620'],
    isDarkPalette: false,
  },
  {
    id: 'light',
    namePt: 'Claro',
    nameEn: 'Light',
    descriptionPt: 'Interface nítida e minimalista com fundo claro e alto contraste.',
    descriptionEn: 'Crisp, minimalist interface with light background and high contrast.',
    color: '#ffffff',
    swatch: ['#ffffff', '#f9fafb', '#f3f4f6', '#4b5563', '#374151', '#111827'],
    isDarkPalette: false,
  },
];

export function isLightTheme(theme: ThemeId | string): boolean {
  return theme === 'light' || theme === 'cream';
}
