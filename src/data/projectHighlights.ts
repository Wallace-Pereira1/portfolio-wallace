/**
 * Frase curta de destaque de cada projeto (aparece na lista de Projetos).
 * Chave = id do projeto em projects.ts. Se um id não estiver aqui,
 * a lista usa o `tagline` do projeto.
 */
const highlights: Record<string, { pt: string; en: string }> = {
  '01': { pt: 'Atendimento 24/7 em segundos', en: '24/7 instant lead response' },
  '02': { pt: 'Offline-first, sem travar por rede', en: 'Offline-first, no frozen UI' },
  '03': { pt: '−70% no tempo de carregamento', en: '−70% load time' },
  '04': { pt: 'Dados isolados por cliente (RLS)', en: 'Per-tenant data isolation (RLS)' },
  '05': { pt: 'Pedidos da mesa direto à cozinha', en: 'Table orders straight to the kitchen' },
  '06': { pt: 'Extração validada com Zod', en: 'Extraction validated with Zod' },
  '07': { pt: 'Auditoria fiscal preventiva', en: 'Preventive tax auditing' },
};

export function getProjectHighlight(id: string, language: string): string | undefined {
  const entry = highlights[id];
  if (!entry) return undefined;
  return language === 'en' ? entry.en : entry.pt;
}
