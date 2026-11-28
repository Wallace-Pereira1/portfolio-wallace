import { projectsEn, projectsPt } from '../data/projects';
import { currentStack } from '../data/stack';

type Language = 'pt' | 'en';

const CONTACT = {
  email: 'mailto:wcps2001@gmail.com',
  linkedin: 'https://www.linkedin.com/in/wallacepereira-in/',
  github: 'https://github.com/Wallace-Pereira1',
  whatsapp: 'https://wa.me/5521999688381',
};

const PROJECT_ALIASES: Record<string, string[]> = {
  '01': ['capcrj', 'engenharia eletrica', 'electrical engineering'],
  '02': ['agente imobiliario', 'agente de ia imobiliaria', 'imobiliaria', 'real estate', 'arbo'],
  '03': ['investimento', 'investimentos', 'investment', 'portfolio financeiro'],
  '04': ['modernizacao', 'sistema legado', 'angular', 'asp'],
  '06': ['comandas', 'bistro', 'bistro', 'restaurante', 'kitchen'],
  '07': ['ocr', 'extrator de documentos', 'document intelligence'],
  '08': ['auditoria fiscal', 'fiscal sentinel', 'compliance'],
  '09': ['sac manager', 'pos-venda', 'atendimento ao cliente', 'reverse logistics'],
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(normalize(term)));
}

function findProjectId(text: string): string | null {
  for (const [id, aliases] of Object.entries(PROJECT_ALIASES)) {
    if (containsAny(text, aliases)) return id;
  }
  return null;
}

function getProjectId(question: string, previousQuestion = ''): string | null {
  const currentText = normalize(question);
  const currentProjectId = findProjectId(currentText);
  if (currentProjectId) return currentProjectId;

  const isFollowUp = containsAny(currentText, [
    'tecnologias', 'technologies', 'stack', 'impacto', 'impact', 'resultado', 'result',
    'como funciona', 'how does it work', 'mais detalhes', 'more details', 'fale mais', 'tell me more',
  ]);
  return isFollowUp ? findProjectId(normalize(previousQuestion)) : null;
}

function getProjectAnswer(question: string, previousQuestion: string, language: Language) {
  const projects = (language === 'en' ? projectsEn : projectsPt).filter((project) => !project.disabled);
  const id = getProjectId(question, previousQuestion);
  const project = id ? projects.find((item) => item.id === id) : undefined;
  if (!project) return null;

  const text = normalize(question);
  const previous = normalize(previousQuestion);
  const asksForStack = containsAny(text, ['tecnologia', 'stack', 'framework', 'tech used', 'technologies']) ||
    (containsAny(text, ['quais', 'what', 'which']) && containsAny(text, ['usou', 'utiliza', 'used', 'built with']));

  if (asksForStack) {
    return language === 'pt'
      ? `No **${project.title}**, usei: ${project.technologies.join(' · ')}.\n\n[Ver projetos](#projetos)`
      : `For **${project.title}**, the stack includes: ${project.technologies.join(' · ')}.\n\n[View projects](#projetos)`;
  }

  const intro = project.subtitle || project.tagline;
  const outcome = project.impact || project.solution;
  const link = project.liveUrl
    ? (language === 'pt' ? `[Abrir projeto](${project.liveUrl})` : `[Open project](${project.liveUrl})`)
    : (language === 'pt' ? '[Ver estudo de caso](#projetos)' : '[View case study](#projetos)');

  return language === 'pt'
    ? `**${project.title}** — ${intro}\n\n${outcome}\n\nTecnologias: ${project.technologies.slice(0, 6).join(' · ')}\n\n${link}`
    : `**${project.title}** — ${intro}\n\n${outcome}\n\nTechnologies: ${project.technologies.slice(0, 6).join(' · ')}\n\n${link}`;
}

function getProjectList(language: Language) {
  const projects = (language === 'en' ? projectsEn : projectsPt).filter((project) => !project.disabled);
  const items = projects.map((project) => {
    const title = project.title;
    const href = project.liveUrl || '/#projetos';
    return `- [${title}](${href}) — ${project.subtitle || project.tagline}`;
  });
  return language === 'pt'
    ? `Estes são os projetos publicados no portfólio:\n\n${items.join('\n')}`
    : `These are the projects featured in the portfolio:\n\n${items.join('\n')}`;
}

function getExperienceAnswer(language: Language) {
  return language === 'pt'
    ? `Wallace atua com desenvolvimento full stack, automação e integrações.\n\n- **Prata e Prata:** integra e-commerce, ERP, CRM, WhatsApp e 10 lojas usando APIs e webhooks.\n- **Conversão.ai:** desenvolve agentes conversacionais e automações com n8n, Node.js, Salesforce e RD Station.\n- **Mestra Informática:** trabalhou com Angular e TypeScript na modernização de sistema legado, com redução reportada de mais de 70% no tempo de carregamento.\n\n[Ver trajetória](#experiencia)`
    : `Wallace works across full-stack development, automation, and integrations.\n\n- **Prata e Prata:** connects e-commerce, ERP, CRM, WhatsApp, and 10 stores through APIs and webhooks.\n- **Conversão.ai:** builds conversational agents and n8n automations with Node.js, Salesforce, and RD Station.\n- **Mestra Informática:** worked with Angular and TypeScript on a legacy-system modernization, with a reported load-time reduction above 70%.\n\n[View experience](#experiencia)`;
}

function getContactAnswer(language: Language) {
  return language === 'pt'
    ? `Você pode falar diretamente com Wallace:\n\n- [E-mail](mailto:${CONTACT.email.slice(7)})\n- [LinkedIn](${CONTACT.linkedin})\n- [GitHub](${CONTACT.github})\n- [WhatsApp](${CONTACT.whatsapp})\n\n[Ir para contato](#contato)`
    : `You can reach Wallace directly:\n\n- [Email](mailto:${CONTACT.email.slice(7)})\n- [LinkedIn](${CONTACT.linkedin})\n- [GitHub](${CONTACT.github})\n- [WhatsApp](${CONTACT.whatsapp})\n\n[Go to contact](#contato)`;
}

export function answerPortfolioQuestion(
  question: string,
  language: Language,
  previousQuestion = ''
) {
  const text = normalize(question);
  const projectAnswer = getProjectAnswer(question, previousQuestion, language);
  if (projectAnswer) return projectAnswer;

  if (containsAny(text, ['contato', 'contact', 'email', 'e-mail', 'whatsapp', 'linkedin', 'contratar', 'hire'])) {
    return getContactAnswer(language);
  }

  if (containsAny(text, ['experiencia', 'experience', 'carreira', 'career', 'trabalhou', 'work history', 'trajetoria'])) {
    return getExperienceAnswer(language);
  }

  if (containsAny(text, ['integracao', 'integration', 'api', 'webhook', 'erp', 'crm'])) {
    return language === 'pt'
      ? 'Wallace integra plataformas por **APIs REST e webhooks**, conectando e-commerce, ERP, CRM e WhatsApp. Na Prata e Prata, essas integrações mantêm pedidos, estoque e clientes sincronizados entre 10 lojas e o e-commerce; na Conversão.ai, apoiam fluxos de atendimento e vendas.\n\n[Ver trajetória](#experiencia) · [Ver projetos](#projetos)'
      : 'Wallace connects platforms using **REST APIs and webhooks**, integrating e-commerce, ERP, CRM, and WhatsApp. At Prata e Prata, these integrations keep orders, inventory, and customer records in sync across 10 stores and the online shop; at Conversão.ai, they support sales and customer-service workflows.\n\n[View experience](#experiencia) · [View projects](#projetos)';
  }

  if (containsAny(text, ['projetos', 'projects', 'portfolio', 'portfólio', 'constru', 'built'])) {
    return getProjectList(language);
  }

  if (containsAny(text, ['stack', 'tecnologia', 'tecnologias', 'skills', 'competencias', 'framework'])) {
    return language === 'pt'
      ? `A stack atual é **${currentStack.join(' · ')}**. Também há experiência com Angular, APIs REST, webhooks, Supabase, Salesforce, RD Station e integrações de e-commerce.\n\n[Ver competências](#tecnologias)`
      : `The current stack is **${currentStack.join(' · ')}**. Wallace also works with Angular, REST APIs, webhooks, Supabase, Salesforce, RD Station, and e-commerce integrations.\n\n[View skills](#tecnologias)`;
  }

  if (containsAny(text, ['automacao', 'automation', 'n8n', 'inteligencia artificial', 'artificial intelligence', 'agente', 'agent', 'ia', ' ai '])) {
    return language === 'pt'
      ? `Wallace cria automações com **n8n**, APIs e webhooks, além de agentes conversacionais para atendimento e qualificação de leads. No projeto imobiliário, o fluxo consulta o CRM ARBO, verifica agenda e organiza visitas; na Conversão.ai, automatiza etapas de vendas e relacionamento.\n\n[Ver projetos](#projetos) · [Ver trajetória](#experiencia)`
      : `Wallace builds **n8n** automations with APIs and webhooks, plus conversational agents for customer support and lead qualification. The real-estate project connects to the ARBO CRM, checks availability, and schedules visits; at Conversão.ai, he automated sales and customer-engagement workflows.\n\n[View projects](#projetos) · [View experience](#experiencia)`;
  }

  if (containsAny(text, ['quem e wallace', 'who is wallace', 'sobre voce', 'about you', 'sobre ele', 'about him'])) {
    return language === 'pt'
      ? 'Wallace é desenvolvedor full stack com atuação em aplicações web, integrações, automação e IA aplicada. Trabalha com React, TypeScript, Node.js e PostgreSQL, conectando tecnologia a problemas operacionais concretos.\n\n[Conhecer trajetória](#experiencia) · [Ver projetos](#projetos)'
      : 'Wallace is a full-stack developer focused on web applications, integrations, automation, and applied AI. He works with React, TypeScript, Node.js, and PostgreSQL, connecting software to practical operational needs.\n\n[View experience](#experiencia) · [View projects](#projetos)';
  }

  return language === 'pt'
    ? 'Posso responder sobre projetos, tecnologias, experiência, automações ou contato com Wallace. Tente perguntar, por exemplo: **“Quais tecnologias foram usadas no SAC Manager?”**'
    : 'I can answer questions about Wallace’s projects, technologies, experience, automations, or contact details. For example: **“What technologies were used in SAC Manager?”**';
}
