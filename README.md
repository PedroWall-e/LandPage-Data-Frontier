# Data Frontier - Landing Page (Google Cloud)

Este projeto contém a landing page oficial da **Data Frontier**, utilizando tecnologias modernas (React + Vite + TailwindCSS) e integrando com um backend customizado (Express.js) hospedado no Google Cloud Run, e o frontend no Google Cloud Storage.

## 📁 Estrutura do Projeto

O projeto foi dividido em dois sub-diretórios principais:

*   **/frontend**: Contém toda a interface do usuário (React, Vite, Tailwind CSS).
*   **/backend**: Contém a API do servidor (Express.js) responsável por salvar os contatos no Firestore e enviar e-mails via Nodemailer.

---

## 🚀 Como Rodar e Testar Localmente

### 1. Inicializando o Backend (Express)
1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   # Opcional: Para testar as funcionalidades completas, exporte as variáveis de ambiente EMAIL_USER e EMAIL_PASS.
   npm start
   ```
   *A API estará escutando na porta 8080 (ou na porta definida por `PORT`).*

### 2. Inicializando o Frontend (React/Vite)
1. Navegue até a pasta do frontend e instale as dependências:
   ```bash
   cd frontend
   npm install
   ```
2. Crie seu arquivo de ambiente baseado no exemplo:
   *   Copie `frontend/.env.example` para `frontend/.env`.
   *   **Importante:** Se você estiver rodando o backend localmente, deixe `VITE_API_URL=http://localhost:8080`. Se você já publicou o backend no Cloud Run, coloque a URL gerada de produção.
3. Inicie o servidor de desenvolvimento Vite:
   ```bash
   npm run dev
   ```
   *O frontend ficará disponível em `http://localhost:5173`.*

---

## ☁️ Deploy no Google Cloud Platform

Para colocar sua Landing Page no ar na arquitetura Google Cloud, você precisará publicar o backend no **Google Cloud Run** e hospedar o frontend no **Cloud Storage** (com um Load Balancer / CDN, se desejado).

### Etapa 1: Deploy do Backend (Cloud Run)
O Cloud Run é ideal para rodar containers sem se preocupar com infraestrutura.
1. Instale e configure a ferramenta `gcloud CLI` no seu computador.
2. Navegue até o backend e execute:
   ```bash
   cd backend
   gcloud run deploy contacts-api --source . --region us-central1 --allow-unauthenticated
   ```
3. **Configuração de Segredos:** No Console do Google Cloud Run, acesse o serviço `contacts-api`, vá na aba "Edit & Deploy New Revision", e adicione `EMAIL_USER` e `EMAIL_PASS` nas Variáveis de Ambiente.
4. Anote a "URL" final (ex: `https://contacts-api-xxx.a.run.app`).

### Etapa 2: Deploy do Frontend (Cloud Storage)
1. Antes de gerar a compilação de produção, edite arquivo `frontend/.env` e configure com a URL obtida do Cloud Run:
   ```bash
   VITE_API_URL=https://contacts-api-xxx.a.run.app
   ```
2. Construa a versão otimizada do frontend:
   ```bash
   cd frontend
   npm run build
   ```
3. Envie a pasta `frontend/dist` para um bucket do Cloud Storage configurado para hospedagem de sites estáticos.
   *   *Dica: Você pode arrastar os arquivos no Console do Storage, ou usar comando `gsutil rsync -R dist/ gs://SEU_BUCKET`*
4. No bucket do Google Cloud Storage, certifique-se de configurar a **Página Principal** como `index.html` e as permissões de acesso público.
