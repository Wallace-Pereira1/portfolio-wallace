export interface ContactMessage {
  nome: string;
  email: string;
  recompensa: string;
  mensagem: string;
}

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
}

export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; message?: string }> {
  const submissionData = new FormData();
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '9c805b8d-089c-4a66-abb7-9d7cb76df899';

  submissionData.append('access_key', accessKey);
  submissionData.append('name', message.nome);
  submissionData.append('email', message.email);
  submissionData.append('subject', `[Portfólio Wallace] Contato de ${message.nome} - ${message.recompensa}`);
  submissionData.append('message', message.mensagem);
  submissionData.append('recompensa', message.recompensa);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: submissionData,
  });
  const result = (await response.json()) as Web3FormsResponse;

  return {
    success: response.ok && Boolean(result.success),
    message: result.message,
  };
}
