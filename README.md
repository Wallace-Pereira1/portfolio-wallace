# Portfolio Wallace Pereira | Engenharia de Automação & Integrações

Portfolio profissional desenvolvido com foco em alta performance, design minimalista premium e animações fluidas estruturado em React com Tailwind CSS.

## 🛠️ Tecnologias Utilizadas

- **React 19** com Vite para desenvolvimento e compilação rápidos
- **TypeScript** garantindo segurança e tipagem estática robusta
- **Tailwind CSS** para estilização utilitária de alta fidelidade e consistência visual
- **Motion for React** para micro-interações e animações de transição
- **Lucide React** para ícones vetoriais responsivos e modernos

## Assistente do portfólio

O assistente consulta localmente os dados públicos do portfólio no próprio navegador. Não chama `/api/chat`, não usa chave de modelo e não envia as perguntas a um provedor externo. As mensagens ficam somente na memória da aba e são apagadas ao recarregar ou fechar a página.

As respostas são guiadas por busca e regras sobre projetos, experiência, tecnologias e contato; não são texto gerado por um LLM. Por isso, o recurso não cria custos de inferência ou funções serverless e não requer configuração adicional de segredo na Vercel ou no GitHub. O site continua sujeito aos limites do plano de hospedagem escolhido.

## 🚀 Como Executar o Projeto Localmente

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Compilar para produção (Build):**
   ```bash
   npm run build
   ```

4. **Visualizar a versão compilada em ambiente de produção:**
   ```bash
   npm run preview
   ```

## 📂 Estrutura de Pastas

- `/src/components` - Componentes modulares reutilizáveis para cada seção da interface.
- `/src/context` - Provedor de contexto para gerenciamento do estado global e carregamento de tradução (PT/EN).
- `/src/index.css` - Estilos globais e lógica de temas customizados (claro e escuro).
- `/src/types.ts` - Tipagens e definições reutilizáveis e centralizadas.
