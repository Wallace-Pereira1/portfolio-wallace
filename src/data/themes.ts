export type ThemeId =
  | 'dark'
  | 'light'
  | 'pink'
  | 'monochrome'
  | 'purple'
  | 'ocean'
  | 'green'
  | 'slate';

export interface ThemeOption {
  id: ThemeId;
  namePt: string;
  nameEn: string;
  descriptionPt: string;
  descriptionEn: string;
  color: string; // Cor principal para a bolinha do tema
  swatch: string[]; // 6 cores representativas da paleta
  isDarkPalette: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    namePt: 'Escuro',
    nameEn: 'Dark',
    descriptionPt: 'Padrão editorial em tons profundos de grafite e preto.',
    descriptionEn: 'Default editorial dark with deep graphite and black tones.',
    color: '#08090a',
    swatch: ['#08090a', '#121316', '#1c1e22', '#8d93a1', '#9ea4b0', '#f2f3f5'],
    isDarkPalette: true,
  },
  {
    id: 'light',
    namePt: 'Claro',
    nameEn: 'Light',
    descriptionPt: 'Interface nítida e minimalista com fundo claro e alto contraste.',
    descriptionEn: 'Crisp, minimalist interface with light background and high contrast.',
    color: '#ffffff',
    swatch: ['#ffffff', '#f3f4f6', '#e5e7eb', '#4b5563', '#374151', '#111827'],
    isDarkPalette: false,
  },
  {
    id: 'pink',
    namePt: 'Rosa',
    nameEn: 'Pink',
    descriptionPt: 'Vinho profundo e tons baga com contrastes quentes e toques de rosa.',
    descriptionEn: 'Deep wine and berry hues with warm contrasts and pink highlights.',
    color: '#C24366',
    swatch: ['#800021', '#881144', '#243A66', '#C24366', '#FF69B4', '#FFE4D8'],
    isDarkPalette: true,
  },
  {
    id: 'monochrome',
    namePt: 'Monocromático',
    nameEn: 'Monochrome',
    descriptionPt: 'Escala pura de cinzas, do ébano profundo ao branco puro.',
    descriptionEn: 'Pure grayscale spectrum from deep ebony to crisp white.',
    color: '#6B6B6B',
    swatch: ['#0B0B0B', '#1A1A1A', '#333333', '#6B6B6B', '#D9D9D9', '#FFFFFF'],
    isDarkPalette: true,
  },
  {
    id: 'purple',
    namePt: 'Roxo',
    nameEn: 'Purple',
    descriptionPt: 'Noite cósmica com superfícies violeta profundo e acentos lavanda.',
    descriptionEn: 'Cosmic night palette with deep violet surfaces and lavender accents.',
    color: '#6A2FC8',
    swatch: ['#0B0720', '#25134D', '#6A2FC8', '#9D71E8', '#D1B8FF', '#F2E9FF'],
    isDarkPalette: true,
  },
  {
    id: 'ocean',
    namePt: 'Azul oceano',
    nameEn: 'Ocean Blue',
    descriptionPt: 'Profundezas abissais com superfícies petróleo e ciano radiante.',
    descriptionEn: 'Abyssal depths with teal surfaces and radiant cyan accents.',
    color: '#0F969C',
    swatch: ['#05161A', '#072E33', '#0C7075', '#0F969C', '#6DA5C0', '#294D61'],
    isDarkPalette: true,
  },
  {
    id: 'green',
    namePt: 'Verde',
    nameEn: 'Green',
    descriptionPt: 'Floresta perene com superfícies pinho e sálvia suave.',
    descriptionEn: 'Evergreen forest with pine surfaces and gentle sage mint.',
    color: '#235347',
    swatch: ['#051F20', '#0B2B26', '#163832', '#235347', '#8EB69B', '#DAF1DE'],
    isDarkPalette: true,
  },
  {
    id: 'slate',
    namePt: 'Azul ardósia',
    nameEn: 'Slate Blue',
    descriptionPt: 'Ardósia mineral fria com superfícies tempestade e névoa prateada.',
    descriptionEn: 'Cool mineral slate with storm surfaces and silvery mist.',
    color: '#4A5C6A',
    swatch: ['#06141B', '#11212D', '#253745', '#4A5C6A', '#9BA8AB', '#CCD0CF'],
    isDarkPalette: true,
  },
];
