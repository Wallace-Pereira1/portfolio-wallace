import jsPDF from 'jspdf';

export function downloadResumePdf(language: 'pt' | 'en' = 'pt') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  let y = 13;

  const isPt = language === 'pt';

  // Section Header Generator with clean hairline rule
  const addHeader = (title: string) => {
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(25, 25, 25);
    doc.text(title.toUpperCase(), margin, y);

    y += 1.2;
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.25);
    doc.line(margin, y, margin + contentWidth, y);
    y += 3.2;
  };

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 15, 15);
  doc.text('WALLACE DE CARVALHO PEREIRA', margin, y);
  y += 5;

  // Title / Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 60);
  const headline = isPt
    ? 'Desenvolvedor Full Stack · Engenharia de Automação, Integrações & Inteligência Artificial'
    : 'Full Stack Developer · Automation Engineering, Enterprise Integrations & Applied AI';
  doc.text(headline, margin, y);
  y += 4.2;

  // Contact Strip (2 clean, structured lines)
  doc.setFontSize(7.8);
  doc.setTextColor(90, 90, 90);
  const contactLine1 = 'Rio de Janeiro, RJ (21051-240)  |  +55 (21) 99968-8381  |  wcps2001@gmail.com';
  doc.text(contactLine1, margin, y);
  y += 3.4;

  const contactLine2 = 'LinkedIn: linkedin.com/in/wallacepereira-in  |  GitHub: github.com/Wallace-Pereira1  |  Portfólio: wallacepereiradev.vercel.app';
  doc.text(contactLine2, margin, y);
  y += 2.5;

  // 1. Resumo Profissional (Contexto Real)
  addHeader(isPt ? 'Resumo Profissional' : 'Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.6);
  doc.setTextColor(45, 45, 45);

  const bio = isPt
    ? 'Formado em Ciência da Computação, atuo como Desenvolvedor Full Stack focado em engenharia de automação, integrações e Inteligência Artificial, unindo código sólido a fluxos de negócio para escalar operações e otimizar ecossistemas comerciais. Possuo mais de 3 anos de experiência ativa com TypeScript e JavaScript. No back-end, atuo com modelagem de dados relacionais (PostgreSQL e MySQL via DBeaver) e utilizo o Supabase (BaaS) para o rápido desenvolvimento de APIs e autenticação. Visão multiplataforma para hiperautomação: desenvolvo integrações complexas (APIs REST e Webhooks) conectando ferramentas e CRMs como RD Station e Salesforce. Sólida vivência na arquitetura e deploy de Agentes de IA multimodais e automação via low-code (n8n, Make) e scripts em Python, atuando na orquestração de dados em tempo real e qualificação autônoma de leads.'
    : 'Computer Science graduate working as a Full Stack Developer focused on automation engineering, integrations, and Applied Artificial Intelligence, bridging robust code with business workflows to scale operations and optimize commercial ecosystems. 3+ years of active development experience with TypeScript and JavaScript. On the backend, specialized in relational data modeling (PostgreSQL and MySQL via DBeaver) and Supabase (BaaS) for high-velocity REST API development and authentication. Multi-platform hyperautomation vision: architecting complex integrations (REST APIs & Webhooks) connecting tools and enterprise CRMs like RD Station and Salesforce. Proven track record deploying multimodal AI Agents and low-code automations (n8n, Make) alongside Python scripts for real-time data orchestration and autonomous lead qualification.';

  const splitBio = doc.splitTextToSize(bio, contentWidth);
  doc.text(splitBio, margin, y);
  y += splitBio.length * 3.1 + 1;

  // 2. Experiência Profissional (Contexto Real das Empresas e Liderança Técnica)
  addHeader(isPt ? 'Experiência Profissional' : 'Professional Experience');

  const experiences = isPt
    ? [
        {
          company: 'Conversão.ai',
          role: 'Desenvolvedor(a) IA & Full Stack',
          period: 'Junho de 2024 – Data Atual',
          location: 'Rio de Janeiro, RJ · Remoto',
          bullets: [
            'Liderança técnica em projetos de automação e Inteligência Artificial, gerindo o ciclo completo desde o planejamento estratégico até à implementação e deploy das soluções.',
            'Integração avançada de ecossistemas de vendas e marketing, conectando ativamente plataformas como RD Station e Salesforce para garantir a otimização e fluidez do funil comercial.',
            'Criação e orquestração de automações inteligentes e fluxos de dados via n8n e Make com APIs REST e Webhooks, eliminando tarefas operacionais manuais e reduzindo custos operacionais.',
            'Estruturação de bases de dados modernas (PostgreSQL via Supabase) para suportar de forma escalável as operações das aplicações e o consumo de dados em tempo real.',
            'Desenvolvimento de soluções focadas no aumento de produtividade e redução de custos operacionais, com rigoroso alinhamento técnico às métricas de negócio.',
          ],
        },
        {
          company: 'Mestra Informática e Tecnologia',
          role: 'Desenvolvedor Front-end',
          period: 'Março de 2022 – Março de 2023',
          location: 'Rio de Janeiro, RJ',
          bullets: [
            'Desenvolvimento e modernização de sistemas corporativos escaláveis e seguros utilizando TypeScript, JavaScript e o framework Angular.',
            'Implementação de novas funcionalidades nos sistemas em produção aplicando arquitetura limpa, componentizada e aderente às melhores práticas de mercado.',
            'Exploração e integração de APIs REST para acoplar funcionalidades de negócio de forma estável e performática aos sistemas encarregados.',
            'Atuação colaborativa direta com analistas de sistema em prototipação, especificação técnica e implementação em ciclos ágeis.',
          ],
        },
      ]
    : [
        {
          company: 'Conversão.ai',
          role: 'AI & Full Stack Developer',
          period: 'June 2024 – Present',
          location: 'Rio de Janeiro, RJ · Remote',
          bullets: [
            'Technical leadership in automation and Artificial Intelligence projects, managing the complete lifecycle from strategic planning to implementation and production deployment.',
            'Advanced integration of sales and marketing ecosystems, actively synchronizing platforms such as RD Station and Salesforce to optimize commercial funnel performance.',
            'Creation and orchestration of intelligent automation flows using n8n and Make with REST APIs and Webhooks, eliminating manual operational bottlenecks and cutting operating costs.',
            'Modern relational database engineering (PostgreSQL via Supabase) to reliably support scalable real-time application operations and analytics.',
            'Engineering solutions focused on productivity gains and operational cost reduction, strictly aligning technical architecture with core business KPIs.',
          ],
        },
        {
          company: 'Mestra Informática e Tecnologia',
          role: 'Front-end Developer',
          period: 'March 2022 – March 2023',
          location: 'Rio de Janeiro, RJ',
          bullets: [
            'Development and modernization of scalable, secure enterprise web applications leveraging TypeScript, JavaScript, and the Angular framework.',
            'Implemented new business features across production environments following clean, componentized, and responsive design patterns.',
            'Integrated internal and external REST APIs to deliver mission-critical business functionality to client platforms.',
            'Collaborated closely with systems analysts on prototyping, requirements definition, and agile software deliveries.',
          ],
        },
      ];

  experiences.forEach((exp, idx) => {
    // Role & Period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(20, 20, 20);
    doc.text(exp.role, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(85, 85, 85);
    const periodText = `${exp.company}  |  ${exp.period} (${exp.location})`;
    const periodWidth = doc.getTextWidth(periodText);
    doc.text(periodText, margin + contentWidth - periodWidth, y);
    y += 3.2;

    // Bullets
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.4);
    doc.setTextColor(45, 45, 45);

    exp.bullets.forEach((bullet) => {
      doc.text('•', margin + 1.2, y);
      const splitBullet = doc.splitTextToSize(bullet, contentWidth - 5);
      doc.text(splitBullet, margin + 4, y);
      y += splitBullet.length * 2.9;
    });

    if (idx < experiences.length - 1) {
      y += 1.8;
    }
  });

  // 3. Competências Técnicas & Tecnologias
  addHeader(isPt ? 'Competências & Ecossistema Técnico' : 'Technical Skills & Ecosystem');
  doc.setFontSize(7.4);
  doc.setTextColor(45, 45, 45);

  const skills = [
    {
      cat: isPt ? 'Linguagens & Front-end:' : 'Languages & Front-end:',
      items: 'TypeScript, JavaScript (ES6+), Angular, React, Next.js, HTML5, CSS3, Tailwind CSS, Flutter, Bootstrap',
    },
    {
      cat: isPt ? 'Back-end & Banco de Dados:' : 'Back-end & Databases:',
      items: 'PostgreSQL, MySQL, Supabase (BaaS), Modelagem Relacional & Normalização, DBeaver, APIs REST, Webhooks, JSON',
    },
    {
      cat: isPt ? 'Automação & IA:' : 'Automation & AI:',
      items: 'Agentes de IA Multimodais, n8n, Make (Integromat), Scripts Python, Engenharia de Prompt, LLMs (OpenAI/Gemini), Qualificação Autônoma',
    },
    {
      cat: isPt ? 'Ferramentas & Integrações:' : 'Tools & Integrations:',
      items: 'RD Station, Salesforce, Git, GitHub, Docker, Postman, Adobe Photoshop & Illustrator, Figma, CI/CD',
    },
  ];

  skills.forEach((s) => {
    doc.setFont('helvetica', 'bold');
    doc.text(s.cat, margin, y);
    const catWidth = doc.getTextWidth(s.cat);
    doc.setFont('helvetica', 'normal');
    doc.text(` ${s.items}`, margin + catWidth, y);
    y += 3.1;
  });

  // 4. Formação Acadêmica & Idiomas
  addHeader(isPt ? 'Formação Acadêmica & Idiomas' : 'Education & Languages');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(20, 20, 20);
  doc.text(
    isPt ? 'Ciência da Computação (Graduação)' : 'Bachelor of Science in Computer Science',
    margin,
    y
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.4);
  doc.setTextColor(80, 80, 80);
  const eduRight = 'Estácio de Sá  |  Rio de Janeiro, RJ';
  const eduRightWidth = doc.getTextWidth(eduRight);
  doc.text(eduRight, margin + contentWidth - eduRightWidth, y);
  y += 3.2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.4);
  doc.setTextColor(50, 50, 50);
  const langLine = isPt
    ? 'Idiomas: Português (Nativo)  ·  Inglês (Avançado)  ·  Espanhol (Intermediário)'
    : 'Languages: Portuguese (Native)  ·  English (Advanced)  ·  Spanish (Intermediate)';
  doc.text(langLine, margin, y);
  y += 1;

  // 5. Certificações & Licenças de Destaque
  addHeader(isPt ? 'Certificações & Licenças Chave' : 'Key Certifications & Licenses');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);
  doc.setTextColor(50, 50, 50);

  const certs = isPt
    ? [
        'Especialista em IA & Flash Skills: N8N e Automação de Processos com IA (Alura)',
        'Modelagem de Dados (Físico, Normalização, Entidades e Relacionamentos) & MySQL (Alura)',
        'Engenharia de Prompt, ChatGPT & IA Generativa Aplicada a Negócios (Alura)',
        'Python para Data Science & Primeira Aplicação (Alura)',
        'Curso Web Moderno Completo com JavaScript + Projetos (Udemy)',
      ]
    : [
        'AI Specialist & Flash Skills: n8n and AI Process Automation (Alura)',
        'Relational Database Modeling (Physical, Normalization, ERD) & MySQL (Alura)',
        'Prompt Engineering, ChatGPT & Generative AI for Business (Alura)',
        'Python for Data Science & Applied Programming (Alura)',
        'Modern Web Development with JavaScript & Full Stack Projects (Udemy)',
      ];

  certs.forEach((cert) => {
    doc.text('•', margin + 1.2, y);
    doc.text(cert, margin + 4, y);
    y += 2.8;
  });

  // Safety check: ensure only 1 page was generated
  const totalPages = doc.getNumberOfPages();
  if (totalPages > 1) {
    // Delete any inadvertent second page if triggered
    doc.deletePage(totalPages);
  }

  // Trigger download
  const filename = isPt
    ? 'Curriculo-Wallace-Pereira-Desenvolvedor-Fullstack.pdf'
    : 'Resume-Wallace-Pereira-Fullstack-Developer.pdf';
  doc.save(filename);
}
