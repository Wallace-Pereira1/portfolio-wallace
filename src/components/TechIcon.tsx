import React from 'react';
import {
  SiTypescript,
  SiReact,
  SiAngular,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiMysql,
  SiN8N,
  SiMake,
  SiWhatsapp,
  SiGit,
  SiGithub,
  SiJest,
  SiDocker,
  SiGithubactions,
  SiJavascript,
  SiPython,
  SiVite,
  SiD3,
  SiGooglecalendar,
  SiVercel,
  SiLinux,
} from 'react-icons/si';
import { FaSalesforce, FaJava } from 'react-icons/fa6';
import {
  TbApi,
  TbWebhook,
  TbBrain,
  TbScan,
  TbInfinity,
  TbStack2,
  TbPalette,
  TbLayersLinked,
  TbCode,
  TbDatabase,
  TbChartLine,
  TbMail,
  TbBuildingStore,
  TbReceipt2,
  TbRobot,
  TbBinaryTree,
  TbCpu,
  TbShieldCheck,
  TbDeviceMobile,
  TbTopologyFull,
  TbComponents,
  TbSparkles,
  TbFileCheck,
  TbNetwork,
  TbChecklist,
  TbBrowserCheck,
  TbServer2,
  TbBuildingSkyscraper,
  TbEye,
  TbFileText,
  TbDeviceFloppy,
} from 'react-icons/tb';

interface TechIconProps {
  name: string;
  className?: string;
}

const renderIcon = (IconComponent: React.ComponentType<any>, colorClass: string, className: string) => {
  const Component = IconComponent as any;
  return <Component className={`${className} ${colorClass}`} />;
};

export const getTechIcon = (name: string, className = 'w-3.5 h-3.5'): React.ReactNode => {
  const normalized = name.trim().toLowerCase();

  // Languages & Core Frameworks
  if (normalized.includes('typescript')) {
    return renderIcon(SiTypescript, 'text-[#3178C6]', className);
  }
  if (normalized.includes('javascript')) {
    return renderIcon(SiJavascript, 'text-[#F7DF1E]', className);
  }
  if (normalized === 'react' || normalized.includes('react')) {
    return renderIcon(SiReact, 'text-[#61DAFB]', className);
  }
  if (normalized.includes('angular')) {
    return renderIcon(SiAngular, 'text-[#DD0031]', className);
  }
  if (normalized.includes('python')) {
    return renderIcon(SiPython, 'text-[#3776AB]', className);
  }
  if (normalized === 'java' || normalized.includes('java ') || normalized.startsWith('java')) {
    return renderIcon(FaJava, 'text-[#E76F00]', className);
  }
  if (normalized.includes('node')) {
    return renderIcon(SiNodedotjs, 'text-[#5FA04E]', className);
  }
  if (normalized.includes('vite')) {
    return renderIcon(SiVite, 'text-[#646CFF]', className);
  }
  if (normalized.includes('tailwind')) {
    return renderIcon(SiTailwindcss, 'text-[#06B6D4]', className);
  }
  if (normalized.includes('zustand')) {
    return renderIcon(TbLayersLinked, 'text-[#E17055]', className);
  }

  // Databases & Backend
  if (normalized.includes('postgres')) {
    return renderIcon(SiPostgresql, 'text-[#4169E1]', className);
  }
  if (normalized.includes('supabase')) {
    return renderIcon(SiSupabase, 'text-[#3ECF8E]', className);
  }
  if (normalized.includes('mysql')) {
    return renderIcon(SiMysql, 'text-[#4479A1]', className);
  }
  if (normalized === 'sql' || normalized.includes('sql')) {
    return renderIcon(TbDatabase, 'text-[#00B4D8]', className);
  }

  // APIs, Webhooks & Integrations
  if (normalized.includes('webhook') && normalized.includes('api')) {
    return renderIcon(TbApi, 'text-theme-accent', className);
  }
  if (normalized.includes('webhook')) {
    return renderIcon(TbWebhook, 'text-[#FF6B6B]', className);
  }
  if (normalized.includes('api') || normalized.includes('rest')) {
    return renderIcon(TbApi, 'text-theme-accent', className);
  }
  if (normalized.includes('n8n')) {
    return renderIcon(SiN8N, 'text-[#EA4B71]', className);
  }
  if (normalized.includes('make')) {
    return renderIcon(SiMake, 'text-[#6D28D9]', className);
  }
  if (normalized.includes('whatsapp')) {
    return renderIcon(SiWhatsapp, 'text-[#25D366]', className);
  }
  if (normalized.includes('google calendar')) {
    return renderIcon(SiGooglecalendar, 'text-[#4285F4]', className);
  }
  if (normalized.includes('arbo') || normalized.includes('crm')) {
    return renderIcon(FaSalesforce, 'text-[#00A1E0]', className);
  }
  if (normalized.includes('e-mail') || normalized.includes('email')) {
    return renderIcon(TbMail, 'text-[#EA4335]', className);
  }
  if (normalized.includes('olx')) {
    return renderIcon(TbNetwork, 'text-[#6E0AD6]', className);
  }

  // AI & Vision
  if (normalized.includes('gemini')) {
    return renderIcon(TbSparkles, 'text-[#1A73E8]', className);
  }
  if (normalized.includes('ocr') || normalized.includes('visão') || normalized.includes('vision')) {
    return renderIcon(TbScan, 'text-[#00F5D4]', className);
  }
  if (normalized.includes('agente') || normalized.includes('agent')) {
    return renderIcon(TbRobot, 'text-[#7B2CBF]', className);
  }
  if (normalized.includes('llm')) {
    return renderIcon(TbBrain, 'text-[#10A37F]', className);
  }

  // Charts & UI
  if (normalized.includes('rechart') || normalized.includes('chart')) {
    return renderIcon(TbChartLine, 'text-[#22C55E]', className);
  }
  if (normalized === 'd3' || normalized.includes('d3')) {
    return renderIcon(SiD3, 'text-[#F9A03F]', className);
  }
  if (normalized.includes('design system') || normalized.includes('tokens')) {
    return renderIcon(TbPalette, 'text-theme-accent', className);
  }
  if (normalized.includes('component')) {
    return renderIcon(TbComponents, 'text-[#38BDF8]', className);
  }
  if (normalized.includes('context')) {
    return renderIcon(TbTopologyFull, 'text-[#A855F7]', className);
  }
  if (normalized.includes('mobile')) {
    return renderIcon(TbDeviceMobile, 'text-[#F59E0B]', className);
  }

  // Architecture & Engineering Practices
  if (normalized.includes('clean arch') || normalized.includes('clean architecture')) {
    return renderIcon(TbStack2, 'text-theme-accent', className);
  }
  if (normalized.includes('clean code')) {
    return renderIcon(TbChecklist, 'text-[#10B981]', className);
  }
  if (normalized.includes('service layer')) {
    return renderIcon(TbTopologyFull, 'text-[#3B82F6]', className);
  }
  if (normalized.includes('rls') || normalized.includes('security')) {
    return renderIcon(TbShieldCheck, 'text-[#EF4444]', className);
  }
  if (normalized.includes('spa')) {
    return renderIcon(TbBrowserCheck, 'text-[#6366F1]', className);
  }
  if (normalized.includes('zod')) {
    return renderIcon(TbFileCheck, 'text-[#3068B7]', className);
  }
  if (normalized.includes('asp')) {
    return renderIcon(TbServer2, 'text-[#94A3B8]', className);
  }

  // ERP & Enterprise
  if (normalized.includes('tiny')) {
    return renderIcon(TbBuildingStore, 'text-[#FF8800]', className);
  }
  if (normalized.includes('f360')) {
    return renderIcon(TbReceipt2, 'text-[#00C49F]', className);
  }

  // Engineering & Delivery
  if (normalized === 'git') {
    return renderIcon(SiGit, 'text-[#F05032]', className);
  }
  if (normalized.includes('github actions')) {
    return renderIcon(SiGithubactions, 'text-[#2088FF]', className);
  }
  if (normalized.includes('github')) {
    return renderIcon(SiGithub, 'text-theme-text', className);
  }
  if (normalized.includes('docker')) {
    return renderIcon(SiDocker, 'text-[#2496ED]', className);
  }
  if (normalized.includes('ci/cd') || normalized.includes('pipeline')) {
    return renderIcon(TbInfinity, 'text-[#2088FF]', className);
  }
  if (normalized.includes('jest') || normalized.includes('teste')) {
    return renderIcon(SiJest, 'text-[#C21325]', className);
  }
  if (normalized.includes('vercel')) {
    return renderIcon(SiVercel, 'text-theme-text', className);
  }
  if (normalized.includes('linux') || normalized.includes('bash')) {
    return renderIcon(SiLinux, 'text-[#FCC624]', className);
  }
  if (normalized.includes('openai') || normalized.includes('whisper')) {
    return renderIcon(TbRobot, 'text-[#10A37F]', className);
  }
  if (normalized.includes('salesforce')) {
    return renderIcon(FaSalesforce, 'text-[#00A1E0]', className);
  }
  if (normalized.includes('acessibilidade') || normalized.includes('accessibility') || normalized.includes('a11y')) {
    return renderIcon(TbEye, 'text-[#38BDF8]', className);
  }
  if (normalized.includes('documentação') || normalized.includes('documentation')) {
    return renderIcon(TbFileText, 'text-[#3B82F6]', className);
  }
  if (normalized.includes('offline') || normalized.includes('localstorage')) {
    return renderIcon(TbDeviceFloppy, 'text-[#F59E0B]', className);
  }
  if (normalized.includes('auth') || normalized.includes('autenticação')) {
    return renderIcon(TbShieldCheck, 'text-[#10B981]', className);
  }
  if (normalized.includes('crud') || normalized.includes('modelagem') || normalized.includes('relacional')) {
    return renderIcon(TbDatabase, 'text-[#00B4D8]', className);
  }
  if (normalized.includes('estrutura') || normalized.includes('data structure')) {
    return renderIcon(TbBinaryTree, 'text-[#8B5CF6]', className);
  }
  if (normalized.includes('algoritmo') || normalized.includes('algorithm')) {
    return renderIcon(TbCpu, 'text-[#EC4899]', className);
  }

  return renderIcon(TbCode, 'text-theme-muted', className);
};

export default function TechIcon({ name, className = 'w-3.5 h-3.5' }: TechIconProps) {
  return <>{getTechIcon(name, className)}</>;
}
