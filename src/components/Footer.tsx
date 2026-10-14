import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, Check, ArrowUp, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t, language } = useApp();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    recompensa: 'Recrutamento / Oportunidade',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) return;

    setLoading(true);
    setErrorMsg(null);

    const submissionData = new FormData();
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "9c805b8d-089c-4a66-abb7-9d7cb76df899";
    submissionData.append("access_key", accessKey);
    submissionData.append("name", formData.nome);
    submissionData.append("email", formData.email);
    submissionData.append("subject", `[Portfólio Wallace] Contato de ${formData.nome} - ${formData.recompensa}`);
    submissionData.append("message", formData.mensagem);
    submissionData.append("recompensa", formData.recompensa);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setFormData({ nome: '', email: '', recompensa: 'Recrutamento / Oportunidade', mensagem: '' });
        setTimeout(() => setSuccess(false), 6000);
      } else {
        setErrorMsg(data.message || (language === 'pt' ? 'Erro ao enviar mensagem.' : 'Failed to send message.'));
      }
    } catch (e) {
      setErrorMsg(language === 'pt' ? 'Algo deu errado. Por favor, tente novamente.' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      id="contato"
      className="py-24 md:py-36 bg-theme-bg px-6 md:px-12 transition-colors"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3 pb-8">
          <span className="text-[10px] font-mono text-theme-muted uppercase tracking-widest block">
            {language === 'pt' ? 'Comunicação & Contato' : 'Communication & Contact'}
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-[28px] leading-tight font-semibold text-theme-text tracking-tight uppercase">
            {t('foot.cta')}
          </h3>
          <p className="text-sm sm:text-base text-theme-dim max-w-2xl leading-relaxed">
            {t('foot.desc')}
          </p>
        </div>

        {/* 12-Column Grid: Direct Channels & Dispatch Terminal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-16">
          {/* Identity & Direct Channels */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-theme-muted block">
                Canais Diretos
              </span>
              <p className="text-xs sm:text-sm text-theme-dim leading-relaxed">
                {language === 'pt'
                  ? 'Prefere contato direto? Utilize os canais abaixo para convites de trabalho ou propostas de consultoria.'
                  : 'Prefer direct communication? Reach out through any of the channels below.'}
              </p>
            </div>

            {/* Direct Contact List (Editorial Hairlines) */}
            <div className="divide-y divide-theme-border border-y border-theme-border">
              <a
                href="mailto:wcps2001@gmail.com"
                className="py-3.5 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-theme-muted block">
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
                className="py-3.5 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-theme-muted block">LinkedIn</span>
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
                className="py-3.5 flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-theme-muted block">GitHub</span>
                  <span className="text-xs font-mono text-theme-text group-hover:text-theme-dim transition-colors">
                    github.com/Wallace-Pereira1
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-muted group-hover:text-theme-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Geographical Coordinates */}
            <div className="space-y-1 text-xs font-mono text-theme-muted pt-2">
              <span className="text-[10px] uppercase tracking-wider block">Base Operacional:</span>
              <p className="text-theme-dim">Rio de Janeiro, RJ · Brasil (GMT-3)</p>
              <p className="text-[11px]">Disponível para contratação remota ou híbrida</p>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 bg-theme-surface border border-theme-border rounded-[2px] space-y-6">
              <span className="text-xs font-mono text-theme-muted uppercase tracking-wider block">
                {t('foot.form.title')}
              </span>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="nome" className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                      {t('foot.form.name')}
                    </label>
                    <input
                      id="nome"
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder={t('foot.form.name.placeholder')}
                      required
                      className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-xs sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                      {t('foot.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@empresa.com"
                      required
                      className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-xs sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="recompensa" className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                    {t('foot.form.subject')}
                  </label>
                  <select
                    id="recompensa"
                    name="recompensa"
                    value={formData.recompensa}
                    onChange={handleInputChange}
                    className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-xs sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors font-sans"
                  >
                    <option value="Recrutamento">{t('foot.form.sub.rec')}</option>
                    <option value="Projeto Full Stack">{t('foot.form.sub.full')}</option>
                    <option value="Integrações & Automação">{t('foot.form.sub.ai')}</option>
                    <option value="Outro">{t('foot.form.sub.other')}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="mensagem" className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                    {t('foot.form.msg')}
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder={t('foot.form.msg.placeholder')}
                    required
                    className="w-full bg-theme-bg border border-theme-border focus:border-theme-text focus:outline-none text-theme-text text-xs sm:text-sm px-3.5 py-2.5 rounded-[2px] transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || success}
                  className="group inline-flex items-center justify-center gap-2 w-full bg-theme-text text-theme-bg text-xs font-mono uppercase tracking-wider py-3 rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {success ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> {t('foot.form.btn.sent')}
                    </>
                  ) : loading ? (
                    <>
                      <span className="w-3 h-3 border-2 border-theme-bg border-t-transparent rounded-full animate-spin" /> {t('foot.form.btn.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /> {t('foot.form.btn.send')}
                    </>
                  )}
                </button>

                {success && (
                  <p className="text-xs font-mono text-theme-text text-center pt-2">
                    {t('foot.form.success')}
                  </p>
                )}

                {errorMsg && (
                  <p className="text-xs font-mono text-rose-500 text-center pt-2">
                    {errorMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Colophon & Legal Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-theme-muted gap-4">
          <p>{t('foot.copy')}</p>
          <button
            onClick={handleBackToTop}
            className="group flex items-center gap-1.5 hover:text-theme-text transition-colors"
          >
            <span>{t('foot.top')}</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
