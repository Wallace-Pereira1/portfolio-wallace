import ContactSection from '../components/ContactSection';
import EditorialColophon from '../components/EditorialColophon';
import { useApp } from '../context/AppContext';
import { usePageSeo } from '../utils/usePageSeo';

export default function ContatoPage() {
  const { language } = useApp();

  usePageSeo({
    title:
      language === 'pt'
        ? 'Contato | Wallace Pereira - Desenvolvedor Full Stack'
        : 'Contact | Wallace Pereira - Full Stack Developer',
    description:
      language === 'pt'
        ? 'Entre em contato com Wallace Pereira para oportunidades profissionais, desenvolvimento full stack, integrações de APIs e automações com IA.'
        : 'Get in touch with Wallace Pereira for software engineering opportunities, full stack web development, API integrations, and AI automations.',
    path: '/contato',
  });

  return (
    <>
      <main className="pt-24 sm:pt-28">
        <ContactSection showHeader />
      </main>
      <EditorialColophon />
    </>
  );
}
