import React from 'react';
import { useApp } from '../context/AppContext';

interface ProjectMinimalCoverProps {
  projectId: string;
  isCenter: boolean;
  category?: string;
  isLight?: boolean;
}

/**
 * Capas ultra-minimalistas vetoriais geradas sob medida para cada projeto,
 * com estética editorial/engenharia técnica precisa.
 * Suporta modo Dark (fundo carbono, néon cirúrgico) e modo Light (papel técnico blueprint,
 * linhas nítidas de alta precisão e excelente contraste).
 */
export default function ProjectMinimalCover({
  projectId,
  isCenter,
  category,
  isLight,
}: ProjectMinimalCoverProps) {
  const { theme } = useApp();
  const light = isLight !== undefined ? isLight : theme === 'light';

  if (light) {
    return <LightCover projectId={projectId} isCenter={isCenter} />;
  }

  return <DarkCover projectId={projectId} isCenter={isCenter} />;
}

/* ==========================================================================
   VERSÃO LIGHT MODE: BLUEPRINT TÉCNICO & LINHAS DE ALTA PRECISÃO
   ========================================================================== */

function LightCover({ projectId }: { projectId: string; isCenter: boolean }) {
  switch (projectId) {
    case '01':
      // Agente de IA & Qualificação Imobiliária (ARBO CRM, OCR, Webhooks)
      return (
        <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">
          {/* Grade de fundo técnica suave */}
          <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-01-light" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-01-light)" />
          </svg>

          {/* Diagrama Esquemático: Casa Isométrica Blueprint + Rede de IA e CRM */}
          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Linhas de Barramento de Dados */}
            <path
              d="M 30 90 L 110 90 L 140 60 L 240 60 L 270 90 L 350 90"
              stroke="#2563eb"
              strokeWidth="1.4"
              strokeDasharray="4 3"
              strokeOpacity="0.75"
            />
            <path
              d="M 110 90 L 140 120 L 240 120 L 270 90"
              stroke="#0284c7"
              strokeWidth="1.4"
              strokeOpacity="0.7"
            />

            {/* Isometria de Imóvel Wireframe Blueprint */}
            <g transform="translate(145, 38)">
              {/* Telhado */}
              <polygon
                points="45,0 90,26 45,52 0,26"
                fill="#e2e8f0"
                fillOpacity="0.7"
                stroke="#2563eb"
                strokeWidth="1.2"
              />
              {/* Paredes */}
              <polygon
                points="0,26 45,52 45,102 0,76"
                fill="#f1f5f9"
                fillOpacity="0.9"
                stroke="#1d4ed8"
                strokeWidth="1.2"
              />
              <polygon
                points="45,52 90,26 90,76 45,102"
                fill="#e0e7ff"
                fillOpacity="0.8"
                stroke="#1e40af"
                strokeWidth="1.2"
              />
              {/* Vetor de Visão Computacional / OCR na porta */}
              <rect
                x="52"
                y="58"
                width="22"
                height="32"
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="2 2"
                fill="#bae6fd"
                fillOpacity="0.5"
              />
              <circle cx="63" cy="74" r="3" fill="#0284c7" />
            </g>

            {/* Nó 1: Lead Ingestion */}
            <g transform="translate(45, 90)">
              <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#2563eb" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="5" fill="#2563eb" />
              <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700" letterSpacing="0.05em">
                LEAD INGEST
              </text>
            </g>

            {/* Nó 2: ARBO CRM Core */}
            <g transform="translate(190, 148)">
              <rect x="-38" y="-12" width="76" height="24" rx="2" fill="#ffffff" stroke="#0284c7" strokeWidth="1.4" />
              <text x="0" y="3" textAnchor="middle" fill="#0369a1" fontSize="8.5" fontFamily="monospace" fontWeight="700">
                CRM ARBO SYNC
              </text>
            </g>

            {/* Nó 3: Google Calendar Lock */}
            <g transform="translate(335, 90)">
              <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#059669" strokeWidth="1.6" />
              <circle cx="0" cy="0" r="5" fill="#059669" />
              <text x="0" y="24" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700" letterSpacing="0.05em">
                CALENDAR
              </text>
            </g>
          </svg>
        </div>
      );

    case '02':
      // Plataforma de Consolidação de Investimentos (Dual-Engine, D3, Offline-First)
      return (
        <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-02-light" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#059669" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
              <linearGradient id="chartGrad-light" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-02-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Eixos */}
            <line x1="30" y1="140" x2="350" y2="140" stroke="#94a3b8" strokeWidth="1.4" />
            <line x1="30" y1="35" x2="30" y2="140" stroke="#94a3b8" strokeWidth="1.4" />

            {/* Candlesticks minimalistas */}
            <g stroke="#64748b" strokeWidth="1.2">
              <line x1="70" y1="85" x2="70" y2="125" />
              <rect x="66" y="95" width="8" height="20" fill="#10b981" stroke="#059669" />

              <line x1="120" y1="75" x2="120" y2="120" />
              <rect x="116" y="85" width="8" height="25" fill="#10b981" stroke="#059669" />

              <line x1="170" y1="65" x2="170" y2="110" />
              <rect x="166" y="70" width="8" height="30" fill="#06b6d4" stroke="#0891b2" />

              <line x1="220" y1="50" x2="220" y2="105" />
              <rect x="216" y="60" width="8" height="32" fill="#10b981" stroke="#059669" />

              <line x1="270" y1="40" x2="270" y2="90" />
              <rect x="266" y="48" width="8" height="28" fill="#10b981" stroke="#059669" />
            </g>

            {/* Curva de Desempenho Ponderado (D3) */}
            <path
              d="M 30 130 C 80 120, 110 100, 160 85 C 210 70, 260 55, 340 38"
              fill="none"
              stroke="#059669"
              strokeWidth="2.4"
            />
            <path
              d="M 30 130 C 80 120, 110 100, 160 85 C 210 70, 260 55, 340 38 L 340 140 L 30 140 Z"
              fill="url(#chartGrad-light)"
            />

            {/* Ponto de Alta no Topo */}
            <circle cx="340" cy="38" r="4" fill="#059669" />
            <circle cx="340" cy="38" r="8" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" />

            {/* Telemetria Inferior Nítida */}
            <text x="350" y="156" textAnchor="end" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
              OFFLINE CACHE: ACTIVE
            </text>
          </svg>
        </div>
      );

    case '03':
      // Modernização ASP para Angular (Migração, 70% menos latência, componentização)
      return (
        <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-03-light" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-03-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Esquerda: Bloco Monolítico Legado (ASP) */}
            <g transform="translate(40, 48)">
              <rect x="0" y="0" width="85" height="95" rx="2" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.4" />
              <line x1="0" y1="20" x2="85" y2="20" stroke="#cbd5e1" strokeWidth="1" />
              <circle cx="10" cy="10" r="3" fill="#ef4444" opacity="0.8" />
              <circle cx="20" cy="10" r="3" fill="#eab308" opacity="0.8" />
              <circle cx="30" cy="10" r="3" fill="#22c55e" opacity="0.8" />
              {/* Linhas de código monolítico */}
              <line x1="12" y1="35" x2="65" y2="35" stroke="#94a3b8" strokeWidth="2" />
              <line x1="12" y1="48" x2="75" y2="48" stroke="#94a3b8" strokeWidth="2" />
              <line x1="12" y1="61" x2="55" y2="61" stroke="#94a3b8" strokeWidth="2" />
              <line x1="12" y1="74" x2="70" y2="74" stroke="#94a3b8" strokeWidth="2" />
              <text x="42.5" y="112" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
                ASP MONOLITH
              </text>
            </g>

            {/* Centro: Vetor de Transição / Redução de Latência */}
            <g transform="translate(145, 85)">
              <path d="M 0 10 L 60 10" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 3" />
              <polygon points="68,10 56,4 56,16" fill="#4f46e5" />
              <rect x="10" y="-18" width="46" height="18" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
              <text x="33" y="-6" textAnchor="middle" fill="#312e81" fontSize="8" fontFamily="monospace" fontWeight="bold">
                -70% TIME
              </text>
            </g>

            {/* Direita: Componentes Modulares Desacoplados (Angular + TypeScript) */}
            <g transform="translate(235, 42)">
              {/* Componente 1 */}
              <rect x="0" y="0" width="48" height="42" rx="2" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.4" />
              <text x="24" y="24" textAnchor="middle" fill="#1e1b4b" fontSize="8" fontFamily="monospace" fontWeight="700">
                CORE.UI
              </text>
              {/* Componente 2 */}
              <rect x="58" y="0" width="48" height="42" rx="2" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.4" />
              <text x="82" y="24" textAnchor="middle" fill="#1e1b4b" fontSize="8" fontFamily="monospace" fontWeight="700">
                SVC.API
              </text>
              {/* Componente 3 */}
              <rect x="0" y="52" width="48" height="42" rx="2" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.4" />
              <text x="24" y="76" textAnchor="middle" fill="#1e1b4b" fontSize="8" fontFamily="monospace" fontWeight="700">
                RXJS.BUS
              </text>
              {/* Componente 4 */}
              <rect x="58" y="52" width="48" height="42" rx="2" fill="#ffffff" stroke="#7e22ce" strokeWidth="1.4" />
              <text x="82" y="76" textAnchor="middle" fill="#581c87" fontSize="8" fontFamily="monospace" fontWeight="700">
                TS.STORE
              </text>
              <text x="53" y="118" textAnchor="middle" fill="#1e1b4b" fontSize="8.5" fontFamily="monospace" fontWeight="800">
                ANGULAR SPA
              </text>
            </g>
          </svg>
        </div>
      );

    case '04':
      // Hub de Gestão de Parceiros Estratégicos (Multi-tenant, RLS, Supabase, PostgreSQL)
      return (
        <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-04-light" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-04-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Anéis de Segurança RLS (Row Level Security) */}
            <circle cx="190" cy="92" r="68" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="190" cy="92" r="50" stroke="#3b82f6" strokeWidth="1.2" opacity="0.7" />
            <circle cx="190" cy="92" r="32" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.5" />

            {/* Ícone Central de Cadeado / RLS Token */}
            <text x="190" y="88" textAnchor="middle" fill="#1e40af" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              RLS
            </text>
            <text x="190" y="100" textAnchor="middle" fill="#2563eb" fontSize="7" fontFamily="monospace" fontWeight="600">
              LOCK
            </text>

            {/* Tenants / Parceiros Conectados */}
            <g transform="translate(90, 60)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
                TENANT_01
              </text>
              <line x1="35" y1="0" x2="68" y2="20" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
            </g>

            <g transform="translate(90, 125)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
                TENANT_02
              </text>
              <line x1="35" y1="0" x2="68" y2="-20" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
            </g>

            <g transform="translate(290, 60)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
                TENANT_03
              </text>
              <line x1="-35" y1="0" x2="-68" y2="20" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
            </g>

            <g transform="translate(290, 125)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
              <text x="0" y="3" textAnchor="middle" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="700">
                TENANT_04
              </text>
              <line x1="-35" y1="0" x2="-68" y2="-20" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
            </g>
          </svg>
        </div>
      );

    case '05':
      // Sistema de Gestão e Comandas para Bistrô (Mobile-first, WhatsApp API, Comandas)
      return (
        <div className="relative w-full h-full bg-[#fdfaf7] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-05-light" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d97706" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-05-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Planta Minimalista de Mesas do Salão */}
            <g transform="translate(45, 45)">
              {/* Mesa 01 */}
              <rect x="0" y="0" width="36" height="36" rx="3" fill="#ffffff" stroke="#059669" strokeWidth="1.6" />
              <text x="18" y="22" textAnchor="middle" fill="#065f46" fontSize="8" fontFamily="monospace" fontWeight="700">
                M.01
              </text>
              {/* Mesa 02 */}
              <rect x="52" y="0" width="36" height="36" rx="3" fill="#ffffff" stroke="#d97706" strokeWidth="1.6" />
              <text x="70" y="22" textAnchor="middle" fill="#92400e" fontSize="8" fontFamily="monospace" fontWeight="700">
                M.02
              </text>
              {/* Mesa 03 */}
              <rect x="0" y="48" width="36" height="36" rx="3" fill="#ffffff" stroke="#059669" strokeWidth="1.6" />
              <text x="18" y="70" textAnchor="middle" fill="#065f46" fontSize="8" fontFamily="monospace" fontWeight="700">
                M.03
              </text>
              {/* Mesa 04 */}
              <rect x="52" y="48" width="36" height="36" rx="3" fill="#ffffff" stroke="#64748b" strokeWidth="1.4" />
              <text x="70" y="70" textAnchor="middle" fill="#1e293b" fontSize="8" fontFamily="monospace" fontWeight="700">
                LIVRE
              </text>
              <text x="44" y="105" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                FLOOR MATRIX
              </text>
            </g>

            {/* Ondas de Transmissão de Pedido para Cozinha */}
            <g transform="translate(170, 90)">
              <circle cx="0" cy="0" r="16" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
              <circle cx="0" cy="0" r="32" stroke="#d97706" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.5" />
              <path d="M -10 0 L 30 0" stroke="#d97706" strokeWidth="1.8" />
              <polygon points="36,0 26,-4 26,4" fill="#d97706" />
              <text x="10" y="-12" textAnchor="middle" fill="#78350f" fontSize="8" fontFamily="monospace" fontWeight="800">
                WA-API
              </text>
            </g>

            {/* Terminal da Cozinha / Fila de Preparo */}
            <g transform="translate(245, 45)">
              <rect x="0" y="0" width="100" height="85" rx="3" fill="#ffffff" stroke="#d97706" strokeWidth="1.4" />
              <rect x="8" y="12" width="84" height="18" rx="2" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
              <text x="14" y="24" fill="#78350f" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                #084 · RISOTO T.02
              </text>
              <rect x="8" y="36" width="84" height="18" rx="2" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
              <text x="14" y="48" fill="#14532d" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                #085 · PASTA T.01
              </text>
              <text x="50" y="76" textAnchor="middle" fill="#78350f" fontSize="8" fontFamily="monospace" fontWeight="800">
                KITCHEN LINE
              </text>
            </g>
          </svg>
        </div>
      );

    case '06':
      // Pipeline de OCR Estruturado & Validação Zod (Gemini 2.0 Flash)
      return (
        <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-06-light" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-06-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Documento Esquerdo com Raio Laser OCR */}
            <g transform="translate(45, 38)">
              <rect x="0" y="0" width="75" height="105" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="1.4" />
              {/* Linhas simuladas de texto da nota fiscal */}
              <line x1="10" y1="18" x2="45" y2="18" stroke="#64748b" strokeWidth="2" />
              <line x1="10" y1="28" x2="65" y2="28" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="10" y1="38" x2="55" y2="38" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="10" y1="58" x2="65" y2="58" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="10" y1="68" x2="50" y2="68" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Bounding box de OCR detectado */}
              <rect
                x="8"
                y="46"
                width="60"
                height="28"
                stroke="#0d9488"
                strokeWidth="1.4"
                strokeDasharray="2 2"
                fill="#ccfbf1"
                fillOpacity="0.5"
              />

              {/* Raio Laser Horizontal */}
              <line x1="-5" y1="52" x2="80" y2="52" stroke="#0d9488" strokeWidth="1.8" />
              <circle cx="80" cy="52" r="3" fill="#0d9488" />
            </g>

            {/* Setas e Motor Gemini Flash */}
            <g transform="translate(145, 88)">
              <path d="M 0 5 L 45 5" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 3" />
              <polygon points="50,5 40,1 40,9" fill="#0d9488" />
              <rect x="2" y="-22" width="45" height="18" rx="2" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
              <text x="24.5" y="-10" textAnchor="middle" fill="#042f2e" fontSize="7.5" fontFamily="monospace" fontWeight="800">
                GEMINI 2.0
              </text>
            </g>

            {/* Esquema JSON Tipado com Zod (Lado Direito) */}
            <g transform="translate(220, 38)">
              <rect x="0" y="0" width="125" height="105" rx="2" fill="#ffffff" stroke="#0d9488" strokeWidth="1.4" />
              <text x="12" y="20" fill="#042f2e" fontSize="8" fontFamily="monospace" fontWeight="800">
                &#123;
              </text>
              <text x="20" y="36" fill="#042f2e" fontSize="7.5" fontFamily="monospace" fontWeight="600">
                doc_id: <tspan fill="#0f766e" fontWeight="700">"NF_9410"</tspan>
              </text>
              <text x="20" y="52" fill="#042f2e" fontSize="7.5" fontFamily="monospace" fontWeight="600">
                tax_rate: <tspan fill="#b45309" fontWeight="700">0.18</tspan>
              </text>
              <text x="20" y="68" fill="#042f2e" fontSize="7.5" fontFamily="monospace" fontWeight="600">
                valid: <tspan fill="#047857" fontWeight="700">true</tspan>
              </text>
              <text x="20" y="84" fill="#042f2e" fontSize="7.5" fontFamily="monospace" fontWeight="600">
                schema: <tspan fill="#1d4ed8" fontWeight="700">z.object()</tspan>
              </text>
              <text x="12" y="98" fill="#042f2e" fontSize="8" fontFamily="monospace" fontWeight="800">
                &#125;
              </text>
            </g>
          </svg>
        </div>
      );

    case '07':
    default:
      // Fiscal Sentinel (Auditoria Fiscal, Conformidade, Daemon em Node & Postgres)
      return (
        <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-07-light" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#059669" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-07-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-3 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Radar Circular Concêntrico de Conformidade */}
            <circle cx="190" cy="95" r="70" stroke="#6ee7b7" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="190" cy="95" r="50" stroke="#34d399" strokeWidth="1.2" />
            <circle cx="190" cy="95" r="30" stroke="#059669" strokeWidth="1.5" />

            {/* Linhas de Cruzamento dos Quadrantes */}
            <line x1="100" y1="95" x2="280" y2="95" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />
            <line x1="190" y1="20" x2="190" y2="170" stroke="#059669" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.7" />

            {/* Feixe Rotativo do Radar */}
            <path
              d="M 190 95 L 245 45 A 70 70 0 0 0 190 25 Z"
              fill="#10b981"
              fillOpacity="0.2"
            />
            <line x1="190" y1="95" x2="245" y2="45" stroke="#047857" strokeWidth="1.8" />

            {/* Ponto de Validação Sem Anomalia */}
            <circle cx="215" cy="72" r="3.5" fill="#047857" />
            <circle cx="215" cy="72" r="8" stroke="#047857" strokeWidth="1" strokeDasharray="2 2" />

            {/* Tags e Indicadores */}
            <g transform="translate(35, 60)">
              <rect x="0" y="0" width="70" height="24" rx="2" fill="#ffffff" stroke="#059669" strokeWidth="1.4" />
              <text x="35" y="15" textAnchor="middle" fill="#065f46" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                0% ANOMALY
              </text>
            </g>

            <g transform="translate(275, 120)">
              <rect x="0" y="0" width="75" height="24" rx="2" fill="#ffffff" stroke="#059669" strokeWidth="1.4" />
              <text x="37.5" y="15" textAnchor="middle" fill="#065f46" fontSize="7.5" fontFamily="monospace" fontWeight="700">
                DAEMON: OK
              </text>
            </g>
          </svg>
        </div>
      );

    case '08':
    case 'capcrj':
      // CAPCRJ: Miniatura Estilizada da Home do Site Real (Navbar, Hero com Transformador e 3 Cards de Serviços)
      return (
        <div className="relative w-full h-full bg-[#f1f5f9] flex items-center justify-center overflow-hidden">
          {/* Grade de fundo blueprint suave */}
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-08-light" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0284c7" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-08-light)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-2.5 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Janela de Site Principal */}
            <g transform="translate(15, 8)">
              {/* Moldura da Janela */}
              <rect x="0" y="0" width="350" height="164" rx="4" fill="#ffffff" stroke="#0369a1" strokeWidth="1.4" />

              {/* Barra Superior do Navegador */}
              <rect x="0" y="0" width="350" height="18" rx="4" fill="#f8fafc" stroke="#0369a1" strokeWidth="1.4" />
              <line x1="0" y1="18" x2="350" y2="18" stroke="#cbd5e1" strokeWidth="1" />
              {/* Pontos de controle da janela */}
              <circle cx="12" cy="9" r="2.5" fill="#ef4444" opacity="0.8" />
              <circle cx="20" cy="9" r="2.5" fill="#f59e0b" opacity="0.8" />
              <circle cx="28" cy="9" r="2.5" fill="#10b981" opacity="0.8" />
              {/* Barra de Endereço URL */}
              <rect x="42" y="3.5" width="135" height="11" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
              <text x="50" y="11.5" fill="#64748b" fontSize="6.5" fontFamily="monospace">
                https://capcrj.pages.dev
              </text>

              {/* 1. NAVBAR DA CAPCRJ */}
              <g transform="translate(14, 20)">
                <rect x="0" y="0" width="322" height="18" fill="#ffffff" />
                <line x1="0" y1="18" x2="322" y2="18" stroke="#e2e8f0" strokeWidth="1" />
                
                {/* Logo / Identificação CAPCRJ à esquerda */}
                <path d="M 0 11 L 4 5 L 6 9 L 9 3" stroke="#0284c7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <text x="13" y="12.5" fill="#0369a1" fontSize="10" fontFamily="monospace" fontWeight="900" letterSpacing="0.05em">
                  CAPCRJ
                </text>
                <text x="58" y="12" fill="#64748b" fontSize="6.5" fontFamily="monospace" fontWeight="600">
                  | ENGENHARIA
                </text>

                {/* Traços representando links do menu à direita */}
                <line x1="190" y1="9" x2="212" y2="9" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="220" y1="9" x2="242" y2="9" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="250" y1="9" x2="272" y2="9" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
                {/* Botão de contato na navbar */}
                <rect x="280" y="3" width="41" height="12" rx="2" fill="#0284c7" />
                <text x="300.5" y="11" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">
                  CONTATO
                </text>
              </g>

              {/* 2. HERO EM DUAS COLUNAS */}
              <g transform="translate(14, 40)">
                {/* COLUNA ESQUERDA: TÍTULO, SUBTEXTO E BOTÕES */}
                <g transform="translate(4, 4)">
                  {/* Eyebrow badge */}
                  <rect x="0" y="0" width="98" height="11" rx="2" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="0.8" />
                  <text x="49" y="8" textAnchor="middle" fill="#0369a1" fontSize="6" fontFamily="monospace" fontWeight="700">
                    MANUTENÇÃO ESPECIALIZADA
                  </text>

                  {/* Título Principal */}
                  <text x="0" y="24" fill="#0f172a" fontSize="11.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="-0.02em">
                    Alta e Média Tensão
                  </text>
                  {/* Linha de acento azul sob o título */}
                  <rect x="0" y="29" width="118" height="2.5" rx="1" fill="#0284c7" />

                  {/* Traços representando textos de apoio */}
                  <line x1="0" y1="38" x2="135" y2="38" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="0" y1="44" x2="120" y2="44" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="0" y1="50" x2="105" y2="50" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" />

                  {/* Dois Botões de Ação */}
                  <g transform="translate(0, 56)">
                    {/* Botão Primário: Solicitar Orçamento */}
                    <rect x="0" y="0" width="70" height="16" rx="2" fill="#0284c7" />
                    <text x="35" y="10.5" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="700">
                      ORÇAMENTO ↗
                    </text>

                    {/* Botão Secundário: Ver Serviços */}
                    <rect x="76" y="0" width="58" height="16" rx="2" fill="#ffffff" stroke="#0284c7" strokeWidth="1.2" />
                    <text x="105" y="10.5" textAnchor="middle" fill="#0369a1" fontSize="6.5" fontFamily="monospace" fontWeight="700">
                      SERVIÇOS
                    </text>
                  </g>
                </g>

                {/* COLUNA DIREITA: TRANSFORMADOR / SUBESTAÇÃO VETORIAL RECONHECÍVEL */}
                <g transform="translate(170, 0)">
                  {/* Base / Piso da subestação */}
                  <rect x="10" y="68" width="134" height="4" rx="1" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />

                  {/* Tanque Principal do Transformador */}
                  <rect x="25" y="22" width="104" height="46" rx="2" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.4" />

                  {/* Aletas de Resfriamento / Radiador frontal */}
                  <line x1="33" y1="28" x2="33" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="41" y1="28" x2="41" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="49" y1="28" x2="49" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="57" y1="28" x2="57" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="65" y1="28" x2="65" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="73" y1="28" x2="73" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="81" y1="28" x2="81" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="89" y1="28" x2="89" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="97" y1="28" x2="97" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="105" y1="28" x2="105" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="113" y1="28" x2="113" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="121" y1="28" x2="121" y2="62" stroke="#93c5fd" strokeWidth="1.4" strokeLinecap="round" />

                  {/* Tanque de Expansão / Conservador de Óleo no topo */}
                  <rect x="44" y="10" width="66" height="9" rx="4.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
                  <line x1="77" y1="19" x2="77" y2="22" stroke="#0284c7" strokeWidth="1.6" />

                  {/* Buchas Isoladoras Cerâmicas de Alta Tensão (Fases A, B, C) */}
                  {/* Bucha 1 */}
                  <g transform="translate(38, 2)">
                    <rect x="0" y="4" width="7" height="4" rx="1" fill="#bae6fd" stroke="#0369a1" strokeWidth="0.8" />
                    <rect x="1" y="1" width="5" height="3" rx="1" fill="#7dd3fc" stroke="#0369a1" strokeWidth="0.8" />
                    <line x1="3.5" y1="1" x2="3.5" y2="-4" stroke="#0284c7" strokeWidth="1.4" />
                    <circle cx="3.5" cy="-4" r="1.5" fill="#f59e0b" />
                  </g>
                  {/* Bucha 2 */}
                  <g transform="translate(74, 2)">
                    <rect x="0" y="4" width="7" height="4" rx="1" fill="#bae6fd" stroke="#0369a1" strokeWidth="0.8" />
                    <rect x="1" y="1" width="5" height="3" rx="1" fill="#7dd3fc" stroke="#0369a1" strokeWidth="0.8" />
                    <line x1="3.5" y1="1" x2="3.5" y2="-4" stroke="#0284c7" strokeWidth="1.4" />
                    <circle cx="3.5" cy="-4" r="1.5" fill="#f59e0b" />
                  </g>
                  {/* Bucha 3 */}
                  <g transform="translate(110, 2)">
                    <rect x="0" y="4" width="7" height="4" rx="1" fill="#bae6fd" stroke="#0369a1" strokeWidth="0.8" />
                    <rect x="1" y="1" width="5" height="3" rx="1" fill="#7dd3fc" stroke="#0369a1" strokeWidth="0.8" />
                    <line x1="3.5" y1="1" x2="3.5" y2="-4" stroke="#0284c7" strokeWidth="1.4" />
                    <circle cx="3.5" cy="-4" r="1.5" fill="#f59e0b" />
                  </g>

                  {/* Barramento / Linha Elétrica Superior */}
                  <path d="M 41.5 -2 L 77.5 -2 L 113.5 -2 L 138 -2" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 2" />

                  {/* Plaqueta de Identificação Técnica: 13.8 kV */}
                  <rect x="63" y="38" width="28" height="12" rx="1.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
                  <text x="77" y="46.5" textAnchor="middle" fill="#0369a1" fontSize="6.5" fontFamily="monospace" fontWeight="800">
                    13.8 kV
                  </text>
                </g>
              </g>

              {/* 3. TRÊS CARDS DE SERVIÇOS INFERIORES */}
              <g transform="translate(14, 118)">
                <line x1="0" y1="0" x2="322" y2="0" stroke="#e2e8f0" strokeWidth="1" />

                {/* Card 1: Subestações */}
                <g transform="translate(4, 6)">
                  <rect x="0" y="0" width="98" height="30" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                  {/* Ícone */}
                  <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.8" />
                  <path d="M 8 13 L 11 9 L 14 13" stroke="#0284c7" strokeWidth="1" fill="none" />
                  {/* Textos */}
                  <text x="20" y="12" fill="#0f172a" fontSize="6" fontFamily="monospace" fontWeight="700">
                    SUBESTAÇÕES
                  </text>
                  <line x1="20" y1="18" x2="88" y2="18" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="23" x2="72" y2="23" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Card 2: Manutenção */}
                <g transform="translate(112, 6)">
                  <rect x="0" y="0" width="98" height="30" rx="2" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
                  {/* Ícone */}
                  <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#eff6ff" stroke="#2563eb" strokeWidth="0.8" />
                  <circle cx="11" cy="11" r="2.5" fill="#2563eb" />
                  {/* Textos */}
                  <text x="20" y="12" fill="#0369a1" fontSize="6" fontFamily="monospace" fontWeight="700">
                    MANUTENÇÃO
                  </text>
                  <line x1="20" y1="18" x2="90" y2="18" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="23" x2="75" y2="23" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Card 3: Urgência 24h */}
                <g transform="translate(220, 6)">
                  <rect x="0" y="0" width="98" height="30" rx="2" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
                  {/* Ícone */}
                  <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#dcfce7" stroke="#16a34a" strokeWidth="0.8" />
                  <circle cx="11" cy="11" r="2" fill="#16a34a" />
                  {/* Textos */}
                  <text x="20" y="12" fill="#14532d" fontSize="6" fontFamily="monospace" fontWeight="700">
                    URGÊNCIA 24/7
                  </text>
                  <line x1="20" y1="18" x2="88" y2="18" stroke="#86efac" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="23" x2="70" y2="23" stroke="#bbf7d0" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      );
  }
}

/* ==========================================================================
   VERSÃO DARK MODE: CARBONO ELETRÔNICO & VETORES CIRÚRGICOS
   ========================================================================== */

function DarkCover({ projectId }: { projectId: string; isCenter: boolean }) {
  switch (projectId) {
    case '01':
      // Agente de IA & Qualificação Imobiliária (ARBO CRM, OCR, Webhooks)
      return (
        <div className="relative w-full h-full bg-[#090b10] flex items-center justify-center overflow-hidden">
          {/* Grade de fundo técnica */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-01-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-01-dark)" />
          </svg>

          {/* Diagrama Esquemático: Casa Isométrica + Rede de IA e CRM */}
          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Linhas de Barramento de Dados */}
            <path
              d="M 30 90 L 110 90 L 140 60 L 240 60 L 270 90 L 350 90"
              stroke="#3b82f6"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              strokeOpacity="0.6"
            />
            <path
              d="M 110 90 L 140 120 L 240 120 L 270 90"
              stroke="#06b6d4"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />

            {/* Isometria de Imóvel Wireframe */}
            <g transform="translate(145, 38)">
              {/* Telhado */}
              <polygon
                points="45,0 90,26 45,52 0,26"
                fill="#1e293b"
                fillOpacity="0.4"
                stroke="#60a5fa"
                strokeWidth="1.2"
              />
              {/* Paredes */}
              <polygon
                points="0,26 45,52 45,102 0,76"
                fill="#0f172a"
                fillOpacity="0.7"
                stroke="#3b82f6"
                strokeWidth="1.2"
              />
              <polygon
                points="45,52 90,26 90,76 45,102"
                fill="#0b1329"
                fillOpacity="0.9"
                stroke="#2563eb"
                strokeWidth="1.2"
              />
              {/* Vetor de Visão Computacional / OCR na porta */}
              <rect
                x="52"
                y="58"
                width="22"
                height="32"
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="2 2"
                fill="#0284c7"
                fillOpacity="0.15"
              />
              <circle cx="63" cy="74" r="3" fill="#38bdf8" />
            </g>

            {/* Nó 1: OLX Lead Ingestion */}
            <g transform="translate(45, 90)">
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="5" fill="#3b82f6" />
              <text x="0" y="24" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">
                LEAD INGEST
              </text>
            </g>

            {/* Nó 2: ARBO CRM Core */}
            <g transform="translate(190, 148)">
              <rect x="-38" y="-12" width="76" height="24" rx="2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" fontWeight="600">
                CRM ARBO SYNC
              </text>
            </g>

            {/* Nó 3: Google Calendar Lock */}
            <g transform="translate(335, 90)">
              <circle cx="0" cy="0" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="5" fill="#10b981" />
              <text x="0" y="24" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">
                CALENDAR
              </text>
            </g>
          </svg>
        </div>
      );

    case '02':
      // Plataforma de Consolidação de Investimentos (Dual-Engine, D3, Offline-First)
      return (
        <div className="relative w-full h-full bg-[#080b11] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-02-dark" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-02-dark)" />
          </svg>

          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Área sombreada do gráfico de rendimento */}
            <defs>
              <linearGradient id="chartGrad-dark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Eixos */}
            <line x1="30" y1="140" x2="350" y2="140" stroke="#334155" strokeWidth="1" />
            <line x1="30" y1="35" x2="30" y2="140" stroke="#334155" strokeWidth="1" />

            {/* Candlesticks minimalistas */}
            <g stroke="#64748b" strokeWidth="1">
              <line x1="70" y1="85" x2="70" y2="125" />
              <rect x="66" y="95" width="8" height="20" fill="#10b981" stroke="#10b981" />

              <line x1="120" y1="75" x2="120" y2="120" />
              <rect x="116" y="85" width="8" height="25" fill="#10b981" stroke="#10b981" />

              <line x1="170" y1="65" x2="170" y2="110" />
              <rect x="166" y="70" width="8" height="30" fill="#06b6d4" stroke="#06b6d4" />

              <line x1="220" y1="50" x2="220" y2="105" />
              <rect x="216" y="60" width="8" height="32" fill="#10b981" stroke="#10b981" />

              <line x1="270" y1="40" x2="270" y2="90" />
              <rect x="266" y="48" width="8" height="28" fill="#10b981" stroke="#10b981" />
            </g>

            {/* Curva de Desempenho Ponderado (D3) */}
            <path
              d="M 30 130 C 80 120, 110 100, 160 85 C 210 70, 260 55, 340 38"
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
            />
            <path
              d="M 30 130 C 80 120, 110 100, 160 85 C 210 70, 260 55, 340 38 L 340 140 L 30 140 Z"
              fill="url(#chartGrad-dark)"
            />

            {/* Ponto de Alta no Topo */}
            <circle cx="340" cy="38" r="4" fill="#34d399" />
            <circle cx="340" cy="38" r="8" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />

            <text x="350" y="155" textAnchor="end" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
              OFFLINE CACHE: ACTIVE
            </text>
          </svg>
        </div>
      );

    case '03':
      // Modernização ASP para Angular (Migração, 70% menos latência, componentização)
      return (
        <div className="relative w-full h-full bg-[#0b0c11] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-03-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#818cf8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-03-dark)" />
          </svg>

          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Esquerda: Bloco Monolítico Legado (ASP) */}
            <g transform="translate(40, 48)">
              <rect x="0" y="0" width="85" height="95" rx="2" fill="#18181b" stroke="#71717a" strokeWidth="1.2" />
              <line x1="0" y1="20" x2="85" y2="20" stroke="#52525b" strokeWidth="1" />
              <circle cx="10" cy="10" r="3" fill="#ef4444" opacity="0.8" />
              <circle cx="20" cy="10" r="3" fill="#eab308" opacity="0.8" />
              <circle cx="30" cy="10" r="3" fill="#22c55e" opacity="0.8" />
              {/* Linhas de código monolítico */}
              <line x1="12" y1="35" x2="65" y2="35" stroke="#71717a" strokeWidth="2" />
              <line x1="12" y1="48" x2="75" y2="48" stroke="#71717a" strokeWidth="2" />
              <line x1="12" y1="61" x2="55" y2="61" stroke="#71717a" strokeWidth="2" />
              <line x1="12" y1="74" x2="70" y2="74" stroke="#71717a" strokeWidth="2" />
              <text x="42.5" y="112" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">
                ASP MONOLITH
              </text>
            </g>

            {/* Centro: Vetor de Transição / Redução de Latência */}
            <g transform="translate(145, 85)">
              <path d="M 0 10 L 60 10" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
              <polygon points="68,10 56,4 56,16" fill="#818cf8" />
              <rect x="10" y="-18" width="46" height="18" rx="2" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <text x="33" y="-6" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontFamily="monospace" fontWeight="bold">
                -70% TIME
              </text>
            </g>

            {/* Direita: Componentes Modulares Desacoplados (Angular + TypeScript) */}
            <g transform="translate(235, 42)">
              {/* Componente 1 */}
              <rect x="0" y="0" width="48" height="42" rx="2" fill="#0f172a" stroke="#818cf8" strokeWidth="1.2" />
              <text x="24" y="24" textAnchor="middle" fill="#a5b4fc" fontSize="7.5" fontFamily="monospace">
                CORE.UI
              </text>
              {/* Componente 2 */}
              <rect x="58" y="0" width="48" height="42" rx="2" fill="#0f172a" stroke="#6366f1" strokeWidth="1.2" />
              <text x="82" y="24" textAnchor="middle" fill="#a5b4fc" fontSize="7.5" fontFamily="monospace">
                SVC.API
              </text>
              {/* Componente 3 */}
              <rect x="0" y="52" width="48" height="42" rx="2" fill="#0f172a" stroke="#6366f1" strokeWidth="1.2" />
              <text x="24" y="76" textAnchor="middle" fill="#a5b4fc" fontSize="7.5" fontFamily="monospace">
                RXJS.BUS
              </text>
              {/* Componente 4 */}
              <rect x="58" y="52" width="48" height="42" rx="2" fill="#0f172a" stroke="#c084fc" strokeWidth="1.2" />
              <text x="82" y="76" textAnchor="middle" fill="#e9d5ff" fontSize="7.5" fontFamily="monospace">
                TS.STORE
              </text>
              <text x="53" y="118" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontFamily="monospace">
                ANGULAR SPA
              </text>
            </g>
          </svg>
        </div>
      );

    case '04':
      // Hub de Gestão de Parceiros Estratégicos (Multi-tenant, RLS, Supabase, PostgreSQL)
      return (
        <div className="relative w-full h-full bg-[#080a10] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-04-dark" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-04-dark)" />
          </svg>

          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Anéis de Segurança RLS (Row Level Security) */}
            <circle cx="190" cy="92" r="68" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="190" cy="92" r="50" stroke="#2563eb" strokeWidth="1.2" opacity="0.8" />
            <circle cx="190" cy="92" r="32" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />

            {/* Ícone Central de Cadeado / RLS Token */}
            <text x="190" y="88" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace" fontWeight="bold">
              RLS
            </text>
            <text x="190" y="100" textAnchor="middle" fill="#93c5fd" fontSize="7" fontFamily="monospace">
              LOCK
            </text>

            {/* Tenants / Parceiros Conectados */}
            <g transform="translate(90, 60)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#0b1329" stroke="#3b82f6" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">
                TENANT_01
              </text>
              <line x1="35" y1="0" x2="68" y2="20" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            <g transform="translate(90, 125)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#0b1329" stroke="#3b82f6" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">
                TENANT_02
              </text>
              <line x1="35" y1="0" x2="68" y2="-20" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            <g transform="translate(290, 60)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#0b1329" stroke="#3b82f6" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">
                TENANT_03
              </text>
              <line x1="-35" y1="0" x2="-68" y2="20" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            <g transform="translate(290, 125)">
              <rect x="-35" y="-14" width="70" height="28" rx="2" fill="#0b1329" stroke="#3b82f6" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">
                TENANT_04
              </text>
              <line x1="-35" y1="0" x2="-68" y2="-20" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
            </g>
          </svg>
        </div>
      );

    case '05':
      // Sistema de Gestão e Comandas para Bistrô (Mobile-first, WhatsApp API, Comandas)
      return (
        <div className="relative w-full h-full bg-[#110e0c] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-05-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f59e0b" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-05-dark)" />
          </svg>

          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Planta Minimalista de Mesas do Salão */}
            <g transform="translate(45, 45)">
              {/* Mesa 01 */}
              <rect x="0" y="0" width="36" height="36" rx="3" fill="#1c1917" stroke="#22c55e" strokeWidth="1.2" />
              <text x="18" y="22" textAnchor="middle" fill="#86efac" fontSize="8" fontFamily="monospace">
                M.01
              </text>
              {/* Mesa 02 */}
              <rect x="52" y="0" width="36" height="36" rx="3" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="70" y="22" textAnchor="middle" fill="#fde68a" fontSize="8" fontFamily="monospace">
                M.02
              </text>
              {/* Mesa 03 */}
              <rect x="0" y="48" width="36" height="36" rx="3" fill="#1c1917" stroke="#22c55e" strokeWidth="1.2" />
              <text x="18" y="70" textAnchor="middle" fill="#86efac" fontSize="8" fontFamily="monospace">
                M.03
              </text>
              {/* Mesa 04 */}
              <rect x="52" y="48" width="36" height="36" rx="3" fill="#1c1917" stroke="#71717a" strokeWidth="1" />
              <text x="70" y="70" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">
                LIVRE
              </text>
              <text x="44" y="105" textAnchor="middle" fill="#a8a29e" fontSize="7.5" fontFamily="monospace">
                FLOOR MATRIX
              </text>
            </g>

            {/* Ondas de Transmissão de Pedido para Cozinha */}
            <g transform="translate(170, 90)">
              <circle cx="0" cy="0" r="16" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="0" cy="0" r="32" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <path d="M -10 0 L 30 0" stroke="#f59e0b" strokeWidth="1.5" />
              <polygon points="36,0 26,-4 26,4" fill="#fbbf24" />
              <text x="10" y="-12" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace">
                WA-API
              </text>
            </g>

            {/* Terminal da Cozinha / Fila de Preparo */}
            <g transform="translate(245, 45)">
              <rect x="0" y="0" width="100" height="85" rx="3" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.2" />
              <rect x="8" y="12" width="84" height="18" rx="2" fill="#292524" stroke="#44403c" strokeWidth="0.8" />
              <text x="14" y="24" fill="#fef08a" fontSize="7.5" fontFamily="monospace">
                #084 · RISOTO T.02
              </text>
              <rect x="8" y="36" width="84" height="18" rx="2" fill="#292524" stroke="#44403c" strokeWidth="0.8" />
              <text x="14" y="48" fill="#86efac" fontSize="7.5" fontFamily="monospace">
                #085 · PASTA T.01
              </text>
              <text x="50" y="76" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="monospace" fontWeight="600">
                KITCHEN LINE
              </text>
            </g>
          </svg>
        </div>
      );

    case '06':
      // Pipeline de OCR Estruturado & Validação Zod (Gemini 2.0 Flash)
      return (
        <div className="relative w-full h-full bg-[#080d11] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-06-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-06-dark)" />
          </svg>

          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Documento Esquerdo com Raio Laser OCR */}
            <g transform="translate(45, 38)">
              <rect x="0" y="0" width="75" height="105" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
              {/* Linhas simuladas de texto da nota fiscal */}
              <line x1="10" y1="18" x2="45" y2="18" stroke="#64748b" strokeWidth="2" />
              <line x1="10" y1="28" x2="65" y2="28" stroke="#64748b" strokeWidth="1.5" />
              <line x1="10" y1="38" x2="55" y2="38" stroke="#64748b" strokeWidth="1.5" />
              <line x1="10" y1="58" x2="65" y2="58" stroke="#64748b" strokeWidth="1.5" />
              <line x1="10" y1="68" x2="50" y2="68" stroke="#64748b" strokeWidth="1.5" />

              {/* Bounding box de OCR detectado */}
              <rect
                x="8"
                y="46"
                width="60"
                height="28"
                stroke="#2dd4bf"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                fill="#14b8a6"
                fillOpacity="0.15"
              />

              {/* Raio Laser Horizontal */}
              <line x1="-5" y1="52" x2="80" y2="52" stroke="#14b8a6" strokeWidth="1.5" />
              <circle cx="80" cy="52" r="2.5" fill="#5eead4" />
            </g>

            {/* Setas e Motor Gemini Flash */}
            <g transform="translate(145, 88)">
              <path d="M 0 5 L 45 5" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="50,5 40,1 40,9" fill="#2dd4bf" />
              <rect x="2" y="-22" width="45" height="18" rx="2" fill="#042f2e" stroke="#14b8a6" strokeWidth="0.8" />
              <text x="24.5" y="-10" textAnchor="middle" fill="#5eead4" fontSize="7" fontFamily="monospace" fontWeight="bold">
                GEMINI 2.0
              </text>
            </g>

            {/* Esquema JSON Tipado com Zod (Lado Direito) */}
            <g transform="translate(220, 38)">
              <rect x="0" y="0" width="125" height="105" rx="2" fill="#042f2e" stroke="#14b8a6" strokeWidth="1.2" />
              <text x="12" y="20" fill="#99f6e4" fontSize="8" fontFamily="monospace">
                &#123;
              </text>
              <text x="20" y="36" fill="#ccfbf1" fontSize="7.5" fontFamily="monospace">
                doc_id: <tspan fill="#5eead4">"NF_9410"</tspan>
              </text>
              <text x="20" y="52" fill="#ccfbf1" fontSize="7.5" fontFamily="monospace">
                tax_rate: <tspan fill="#f59e0b">0.18</tspan>
              </text>
              <text x="20" y="68" fill="#ccfbf1" fontSize="7.5" fontFamily="monospace">
                valid: <tspan fill="#10b981">true</tspan>
              </text>
              <text x="20" y="84" fill="#5eead4" fontSize="7.5" fontFamily="monospace">
                schema: <tspan fill="#99f6e4">z.object()</tspan>
              </text>
              <text x="12" y="98" fill="#99f6e4" fontSize="8" fontFamily="monospace">
                &#125;
              </text>
            </g>
          </svg>
        </div>
      );

    case '07':
    default:
      // Fiscal Sentinel (Auditoria Fiscal, Conformidade, Daemon em Node & Postgres)
      return (
        <div className="relative w-full h-full bg-[#090b0e] flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-07-dark" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-07-dark)" />
          </svg>

          <svg
            viewBox="0 0 380 180"
            className="w-full h-full p-3 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Radar Circular Concêntrico de Conformidade */}
            <circle cx="190" cy="95" r="70" stroke="#064e3b" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="190" cy="95" r="50" stroke="#047857" strokeWidth="1" />
            <circle cx="190" cy="95" r="30" stroke="#10b981" strokeWidth="1.2" />

            {/* Linhas de Cruzamento dos Quadrantes */}
            <line x1="100" y1="95" x2="280" y2="95" stroke="#047857" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="190" y1="20" x2="190" y2="170" stroke="#047857" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Feixe Rotativo do Radar */}
            <path
              d="M 190 95 L 245 45 A 70 70 0 0 0 190 25 Z"
              fill="#10b981"
              fillOpacity="0.12"
            />
            <line x1="190" y1="95" x2="245" y2="45" stroke="#34d399" strokeWidth="1.5" />

            {/* Ponto de Validação Sem Anomalia */}
            <circle cx="215" cy="72" r="3" fill="#34d399" />
            <circle cx="215" cy="72" r="7" stroke="#34d399" strokeWidth="0.8" strokeDasharray="2 2" />

            {/* Tags e Indicadores */}
            <g transform="translate(35, 60)">
              <rect x="0" y="0" width="70" height="24" rx="2" fill="#062e24" stroke="#059669" strokeWidth="0.8" />
              <text x="35" y="15" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontFamily="monospace">
                0% ANOMALY
              </text>
            </g>

            <g transform="translate(275, 120)">
              <rect x="0" y="0" width="75" height="24" rx="2" fill="#062e24" stroke="#059669" strokeWidth="0.8" />
              <text x="37.5" y="15" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontFamily="monospace">
                DAEMON: OK
              </text>
            </g>
          </svg>
        </div>
      );

    case '08':
    case 'capcrj':
      // CAPCRJ: Miniatura Estilizada da Home do Site Real (Navbar, Hero com Transformador e 3 Cards de Serviços)
      return (
        <div className="relative w-full h-full bg-[#050811] flex items-center justify-center overflow-hidden">
          {/* Grade de fundo técnica sutil */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-08-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0284c7" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-08-dark)" />
          </svg>

          <svg viewBox="0 0 380 180" className="w-full h-full p-2.5 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Janela de Site Principal */}
            <g transform="translate(15, 8)">
              {/* Moldura da Janela em Azul Marinho Profundo */}
              <rect x="0" y="0" width="350" height="164" rx="4" fill="#080e1a" stroke="#1e3a5f" strokeWidth="1.4" />

              {/* Barra Superior do Navegador */}
              <rect x="0" y="0" width="350" height="18" rx="4" fill="#0c1527" stroke="#1e3a5f" strokeWidth="1.4" />
              <line x1="0" y1="18" x2="350" y2="18" stroke="#1e293b" strokeWidth="1" />
              {/* Pontos de controle da janela */}
              <circle cx="12" cy="9" r="2.5" fill="#ef4444" opacity="0.8" />
              <circle cx="20" cy="9" r="2.5" fill="#f59e0b" opacity="0.8" />
              <circle cx="28" cy="9" r="2.5" fill="#10b981" opacity="0.8" />
              {/* Barra de Endereço URL */}
              <rect x="42" y="3.5" width="135" height="11" rx="2" fill="#050a14" stroke="#1e293b" strokeWidth="0.8" />
              <text x="50" y="11.5" fill="#64748b" fontSize="6.5" fontFamily="monospace">
                https://capcrj.pages.dev
              </text>

              {/* 1. NAVBAR DA CAPCRJ */}
              <g transform="translate(14, 20)">
                <rect x="0" y="0" width="322" height="18" fill="#080e1a" />
                <line x1="0" y1="18" x2="322" y2="18" stroke="#172540" strokeWidth="1" />

                {/* Logo / Identificação CAPCRJ à esquerda */}
                <path d="M 0 11 L 4 5 L 6 9 L 9 3" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <text x="13" y="12.5" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="900" letterSpacing="0.05em">
                  CAPCRJ
                </text>
                <text x="58" y="12" fill="#94a3b8" fontSize="6.5" fontFamily="monospace" fontWeight="600">
                  | ENGENHARIA
                </text>

                {/* Traços representando links do menu à direita */}
                <line x1="190" y1="9" x2="212" y2="9" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="220" y1="9" x2="242" y2="9" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="250" y1="9" x2="272" y2="9" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                {/* Botão de contato na navbar */}
                <rect x="280" y="3" width="41" height="12" rx="2" fill="#0284c7" />
                <text x="300.5" y="11" textAnchor="middle" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">
                  CONTATO
                </text>
              </g>

              {/* 2. HERO EM DUAS COLUNAS */}
              <g transform="translate(14, 40)">
                {/* COLUNA ESQUERDA: TÍTULO, SUBTEXTO E BOTÕES */}
                <g transform="translate(4, 4)">
                  {/* Eyebrow badge */}
                  <rect x="0" y="0" width="98" height="11" rx="2" fill="#0c203c" stroke="#1e40af" strokeWidth="0.8" />
                  <text x="49" y="8" textAnchor="middle" fill="#60a5fa" fontSize="6" fontFamily="monospace" fontWeight="700">
                    MANUTENÇÃO ESPECIALIZADA
                  </text>

                  {/* Título Principal */}
                  <text x="0" y="24" fill="#f8fafc" fontSize="11.5" fontFamily="sans-serif" fontWeight="800" letterSpacing="-0.02em">
                    Alta e Média Tensão
                  </text>
                  {/* Linha de acento azul sob o título */}
                  <rect x="0" y="29" width="118" height="2.5" rx="1" fill="#38bdf8" />

                  {/* Traços representando textos de apoio */}
                  <line x1="0" y1="38" x2="135" y2="38" stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="0" y1="44" x2="120" y2="44" stroke="#475569" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="0" y1="50" x2="105" y2="50" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />

                  {/* Dois Botões de Ação */}
                  <g transform="translate(0, 56)">
                    {/* Botão Primário: Solicitar Orçamento */}
                    <rect x="0" y="0" width="70" height="16" rx="2" fill="#0284c7" />
                    <text x="35" y="10.5" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontFamily="monospace" fontWeight="700">
                      ORÇAMENTO ↗
                    </text>

                    {/* Botão Secundário: Ver Serviços */}
                    <rect x="76" y="0" width="58" height="16" rx="2" fill="#0c182c" stroke="#38bdf8" strokeWidth="1.2" />
                    <text x="105" y="10.5" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontFamily="monospace" fontWeight="700">
                      SERVIÇOS
                    </text>
                  </g>
                </g>

                {/* COLUNA DIREITA: TRANSFORMADOR / SUBESTAÇÃO VETORIAL RECONHECÍVEL */}
                <g transform="translate(170, 0)">
                  {/* Base / Piso da subestação */}
                  <rect x="10" y="68" width="134" height="4" rx="1" fill="#0f1d33" stroke="#1e3a5f" strokeWidth="0.8" />

                  {/* Tanque Principal do Transformador */}
                  <rect x="25" y="22" width="104" height="46" rx="2" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.4" />

                  {/* Aletas de Resfriamento / Radiador frontal */}
                  <line x1="33" y1="28" x2="33" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="41" y1="28" x2="41" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="49" y1="28" x2="49" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="57" y1="28" x2="57" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="65" y1="28" x2="65" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="73" y1="28" x2="73" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="81" y1="28" x2="81" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="89" y1="28" x2="89" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="97" y1="28" x2="97" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="105" y1="28" x2="105" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="113" y1="28" x2="113" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />
                  <line x1="121" y1="28" x2="121" y2="62" stroke="#1e40af" strokeWidth="1.4" strokeLinecap="round" />

                  {/* Tanque de Expansão / Conservador de Óleo no topo */}
                  <rect x="44" y="10" width="66" height="9" rx="4.5" fill="#0f2647" stroke="#38bdf8" strokeWidth="1.2" />
                  <line x1="77" y1="19" x2="77" y2="22" stroke="#38bdf8" strokeWidth="1.6" />

                  {/* Buchas Isoladoras Cerâmicas de Alta Tensão (Fases A, B, C) */}
                  {/* Bucha 1 */}
                  <g transform="translate(38, 2)">
                    <rect x="0" y="4" width="7" height="4" rx="1" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="0.8" />
                    <rect x="1" y="1" width="5" height="3" rx="1" fill="#2563eb" stroke="#93c5fd" strokeWidth="0.8" />
                    <line x1="3.5" y1="1" x2="3.5" y2="-4" stroke="#38bdf8" strokeWidth="1.4" />
                    <circle cx="3.5" cy="-4" r="1.5" fill="#facc15" />
                  </g>
                  {/* Bucha 2 */}
                  <g transform="translate(74, 2)">
                    <rect x="0" y="4" width="7" height="4" rx="1" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="0.8" />
                    <rect x="1" y="1" width="5" height="3" rx="1" fill="#2563eb" stroke="#93c5fd" strokeWidth="0.8" />
                    <line x1="3.5" y1="1" x2="3.5" y2="-4" stroke="#38bdf8" strokeWidth="1.4" />
                    <circle cx="3.5" cy="-4" r="1.5" fill="#facc15" />
                  </g>
                  {/* Bucha 3 */}
                  <g transform="translate(110, 2)">
                    <rect x="0" y="4" width="7" height="4" rx="1" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="0.8" />
                    <rect x="1" y="1" width="5" height="3" rx="1" fill="#2563eb" stroke="#93c5fd" strokeWidth="0.8" />
                    <line x1="3.5" y1="1" x2="3.5" y2="-4" stroke="#38bdf8" strokeWidth="1.4" />
                    <circle cx="3.5" cy="-4" r="1.5" fill="#facc15" />
                  </g>

                  {/* Barramento / Linha Elétrica Superior */}
                  <path d="M 41.5 -2 L 77.5 -2 L 113.5 -2 L 138 -2" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />

                  {/* Plaqueta de Identificação Técnica: 13.8 kV */}
                  <rect x="63" y="38" width="28" height="12" rx="1.5" fill="#071529" stroke="#0284c7" strokeWidth="1" />
                  <text x="77" y="46.5" textAnchor="middle" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" fontWeight="800">
                    13.8 kV
                  </text>
                </g>
              </g>

              {/* 3. TRÊS CARDS DE SERVIÇOS INFERIORES */}
              <g transform="translate(14, 118)">
                <line x1="0" y1="0" x2="322" y2="0" stroke="#172540" strokeWidth="1" />

                {/* Card 1: Subestações */}
                <g transform="translate(4, 6)">
                  <rect x="0" y="0" width="98" height="30" rx="2" fill="#091426" stroke="#1e3a5f" strokeWidth="1" />
                  {/* Ícone */}
                  <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#0c203c" stroke="#38bdf8" strokeWidth="0.8" />
                  <path d="M 8 13 L 11 9 L 14 13" stroke="#38bdf8" strokeWidth="1" fill="none" />
                  {/* Textos */}
                  <text x="20" y="12" fill="#f1f5f9" fontSize="6" fontFamily="monospace" fontWeight="700">
                    SUBESTAÇÕES
                  </text>
                  <line x1="20" y1="18" x2="88" y2="18" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="23" x2="72" y2="23" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Card 2: Manutenção */}
                <g transform="translate(112, 6)">
                  <rect x="0" y="0" width="98" height="30" rx="2" fill="#0a1830" stroke="#0284c7" strokeWidth="1.2" />
                  {/* Ícone */}
                  <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#0d2b54" stroke="#60a5fa" strokeWidth="0.8" />
                  <circle cx="11" cy="11" r="2.5" fill="#60a5fa" />
                  {/* Textos */}
                  <text x="20" y="12" fill="#93c5fd" fontSize="6" fontFamily="monospace" fontWeight="700">
                    MANUTENÇÃO
                  </text>
                  <line x1="20" y1="18" x2="90" y2="18" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="23" x2="75" y2="23" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* Card 3: Urgência 24h */}
                <g transform="translate(220, 6)">
                  <rect x="0" y="0" width="98" height="30" rx="2" fill="#071b18" stroke="#059669" strokeWidth="1" />
                  {/* Ícone */}
                  <rect x="6" y="6" width="10" height="10" rx="1.5" fill="#062e26" stroke="#34d399" strokeWidth="0.8" />
                  <circle cx="11" cy="11" r="2" fill="#34d399" />
                  {/* Textos */}
                  <text x="20" y="12" fill="#6ee7b7" fontSize="6" fontFamily="monospace" fontWeight="700">
                    URGÊNCIA 24/7
                  </text>
                  <line x1="20" y1="18" x2="88" y2="18" stroke="#065f46" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="20" y1="23" x2="70" y2="23" stroke="#044332" strokeWidth="1.2" strokeLinecap="round" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      );
  }
}
