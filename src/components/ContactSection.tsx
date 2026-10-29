import React, { useState } from 'react';
import { ArrowUpRight, Send, Check, Loader2, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { trackEvent } from '../utils/analytics';
import { submitContactMessage } from '../utils/submitContactMessage';

interface ContactSectionProps {
  showHeader?: boolean;
}

export default function ContactSection({ showHeader = true }: ContactSectionProps) {
  const { language, t } = useApp();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    recompensa: 'Recrutamento / Oportunidade',
    mensagem: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const data = await submitContactMessage(formData);

      if (data.success) {
        setSuccess(true);
        trackEvent('form_submit_success', { subject: formData.recompensa });
        setFormData({ nome: '', email: '', recompensa: 'Recrutamento / Oportunidade', mensagem: '' });
        setTimeout(() => setSuccess(false), 6000);
      } else {
        setErrorMsg(data.message || (language === 'pt' ? 'Erro ao enviar mensagem.' : 'Failed to send message.'));
      }
    } catch (e) {
      setErrorMsg(
        language === 'pt'
          ? 'Algo deu errado. Por favor, tente novamente.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contato"
      className={`${
        showHeader ? 'py-6 sm:py-8 md:py-10' : 'py-6 md:py-8'
      } px-6 md:px-12 bg-transparent transition-colors`}
    >
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
        {showHeader && (
          <div className="space-y-2 pb-5">
            <span className="text-[11px] font-mono text-theme-muted uppercase tracking-widest block">
              {language === 'pt' ? 'Contato & Disponibilidade' : 'Contact & Availability'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-medium text-theme-text tracking-[-0.015em]">
              {language === 'pt' ? 'Comunicação Direta' : 'Direct Contact'}
            </h2>
            <p className="text-sm sm:text-base text-theme-dim max-w-2xl leading-relaxed">
              {language === 'pt'
                ? 'Pronto para colaborar em novos desafios de engenharia full-time (remoto/híbrido no RJ) ou estruturação de produtos web e integrações complexas.'
                : 'Available for full-time software engineering roles and strategic web product/integration architectures.'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Official Channels & Coordinates */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-theme-muted block">
                {language === 'pt' ? 'Canais Oficiais' : 'Official Channels'}
              </span>
              <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                {language === 'pt'
                  ? 'Prefere contato direto via e-mail ou redes profissionais? Fique à vontade para conectar através dos links abaixo.'
                  : 'Prefer direct correspondence via email or professional profiles? Connect directly via the links below.'}
              </p>
            </div>

            {/* Direct Contact List */}
            <div className="divide-y divide-theme-border border-y border-theme-border">
              <a
                href="mailto:wcps2001@gmail.com"
                className="py-4 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase text-theme-muted block">
                    {language === 'pt' ? 'E-mail Direto' : 'Direct Email'}
                  </span>
                  <span className="text-xs font-mono text-theme-text group-hover:text-theme-dim transition-colors">
                    wcps2001@gmail.com
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/wallacepereira-in/"
                target="_blank"
                rel="noreferrer"
                className="py-4 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase text-theme-muted block">LinkedIn</span>
                  <span className="text-xs font-mono text-theme-text group-hover:text-theme-dim transition-colors">
                    linkedin.com/in/wallacepereira-in
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/Wallace-Pereira1"
                target="_blank"
                rel="noreferrer"
                className="py-4 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase text-theme-muted block">GitHub</span>
                  <span className="text-xs font-mono text-theme-text group-hover:text-theme-dim transition-colors">
                    github.com/Wallace-Pereira1
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`https://wa.me/5521999688381?text=${encodeURIComponent(
                  language === 'pt'
                    ? 'Olá, Wallace! Vi seu portfólio e gostaria de conversar sobre uma oportunidade / projeto.'
                    : 'Hello, Wallace! I came across your portfolio and would like to talk about an opportunity / project.'
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('whatsapp_click')}
                className="py-4 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase text-theme-muted block">WhatsApp</span>
                  <span className="text-xs font-mono text-theme-text group-hover:text-theme-dim transition-colors">
                    +55 (21) 99968-8381
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Geographical Coordinates */}
            <div className="space-y-1.5 text-xs font-mono text-theme-muted pt-2">
              <span className="text-[11px] uppercase tracking-wider block">Base Operacional:</span>
              <p className="text-theme-dim">Rio de Janeiro, RJ · Brasil (GMT-3)</p>
              <p className="text-[11px] text-theme-muted">
                {language === 'pt'
                  ? 'Disponível para contratação remota ou presencial/híbrida no RJ'
                  : 'Available for remote contracts or hybrid work in Rio de Janeiro'}
              </p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 bg-theme-surface border border-theme-border rounded-[2px] space-y-6 offset-static">
              <div className="space-y-1">
                <span className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                  {t('foot.form.title')}
                </span>
                <p className="text-xs text-theme-dim">
                  {language === 'pt'
                    ? 'Preencha o formulário abaixo para envio direto à minha caixa de entrada profissional.'
                    : 'Fill in the form below to send a message directly to my professional inbox.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-nome" className="text-[11px] font-mono text-theme-muted uppercase tracking-wider">
                      {t('foot.form.name')} *
                    </label>
                    <input
                      id="contact-nome"
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder={t('foot.form.name.placeholder')}
                      required
                      className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-base sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="text-[11px] font-mono text-theme-muted uppercase tracking-wider">
                      {t('foot.form.email')} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                      className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-base sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-recompensa" className="text-[11px] font-mono text-theme-muted uppercase tracking-wider">
                    {t('foot.form.subject')}
                  </label>
                  <select
                    id="contact-recompensa"
                    name="recompensa"
                    value={formData.recompensa}
                    onChange={handleInputChange}
                    className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-base sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans"
                  >
                    <option value="Recrutamento / Oportunidade">{t('foot.form.sub.rec')}</option>
                    <option value="Projeto de Automação / APIs">{t('foot.form.sub.ai')}</option>
                    <option value="Desenvolvimento de Produto">{t('foot.form.sub.full')}</option>
                    <option value="Outro Assunto">{t('foot.form.sub.other')}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-mensagem" className="text-[11px] font-mono text-theme-muted uppercase tracking-wider">
                    {t('foot.form.msg')} *
                  </label>
                  <textarea
                    id="contact-mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder={t('foot.form.msg.placeholder')}
                    required
                    className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-base sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/20 border border-red-500/40 text-red-400 text-xs font-mono rounded-[2px]">
                    {errorMsg}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono rounded-[2px] flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{t('foot.form.success')}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-theme-text text-theme-bg hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-xs font-mono uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-2 font-medium cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{language === 'pt' ? 'ENVIANDO DADOS...' : 'TRANSMITTING DATA...'}</span>
                    </>
                  ) : success ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t('foot.form.btn.sent')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('foot.form.btn.send')}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <a
                    href={`https://wa.me/5521999688381?text=${encodeURIComponent(
                      language === 'pt'
                        ? 'Olá, Wallace! Vi seu portfólio e gostaria de conversar sobre uma oportunidade / projeto.'
                        : 'Hello, Wallace! I came across your portfolio and would like to talk about an opportunity / project.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('whatsapp_click')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-theme-dim hover:text-theme-text transition-colors group/wa cursor-pointer py-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 opacity-80 group-hover/wa:opacity-100" />
                    <span>
                      {language === 'pt'
                        ? 'Prefere resposta imediata? Conversar no WhatsApp'
                        : 'Prefer immediate reply? Chat on WhatsApp'}
                    </span>
                    <ArrowUpRight className="w-3 h-3 opacity-70 group-hover/wa:translate-x-0.5 group-hover/wa:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
