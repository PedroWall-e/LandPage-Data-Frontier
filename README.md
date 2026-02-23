# Data Frontier - Landing Page

Esta é a landing page oficial da **Data Frontier**, uma empresa focada em soluções tecnológicas de ponta a ponta.

## 🚀 Sobre o Projeto

O projeto foi desenvolvido utilizando tecnologias modernas para garantir rapidez, responsividade e uma excelente experiência de usuário. A Data Frontier atua em diversas frentes tecnológicas, incluindo:

- **IoT Satelital**: Monitorização e conectividade em qualquer lugar.
- **Impressão 3D**: Resinas e filamentos de alta qualidade.
- **STL Prime**: Biblioteca de modelos 3D exclusivos.
- **Usinagem e Caldeiraria**: Precisão e robustez industrial.
- **Academy**: Cursos e capacitação técnica.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces.
- **Vite**: Ferramenta de build extremamente rápida.
- **Tailwind CSS**: Framework CSS utilitário para design moderno e responsivo.
- **Lucide React**: Biblioteca de ícones elegantes.
- **Firebase**: Utilizado para hospedagem e funções de backend (Cloud Functions).

## 📦 Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone [url-do-repositorio]
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Para gerar a versão de produção**:
   ```bash
   npm run build
   ```

## 🌐 Deploy Automático (GitHub Actions)

Este projeto está configurado para deploy automático no **Firebase Hosting**. Sempre que você fizer um `push` para a branch `main`, o GitHub Actions irá:
1. Instalar as dependências.
2. Gerar a pasta `dist` (build).
3. Fazer o upload para o Firebase.

### Configuração Necessária (Segurança)
Para que o backend funcione com segurança máxima (Secret Manager), você deve configurar as credenciais de e-mail via Firebase CLI:

```bash
# Definir o e-mail que enviará as mensagens
firebase functions:secrets:set EMAIL_USER

# Definir a senha (ou senha de app do Gmail)
firebase functions:secrets:set EMAIL_PASS
```

Também é necessário configurar um segredo no seu repositório GitHub para o deploy automático:
- Nome: `FIREBASE_SERVICE_ACCOUNT_DATA_FRONTIER_LANDING_PAGE`
- Valor: O conteúdo da sua chave JSON da conta de serviço do Firebase.

## 🗄️ Banco de Dados (Firestore)
As mensagens agora são salvas automaticamente no banco de dados Firestore (ID: `ladepage-dataf`) na coleção `contacts` antes do e-mail ser enviado. Isso garante redundância e um histórico acessível no console do Firebase.

## 📂 Estrutura de Arquivos (Diferença entre index)

- **`index.html` (raiz)**: O arquivo fonte onde você faz as alterações de design. Este arquivo DEVE ser enviado para o GitHub.
- **`dist/index.html`**: Gerado automaticamente pelo comando `npm run build`. Este arquivo NÃO deve ir para o GitHub (está no `.gitignore`).
- **`functions/index.js`**: O código do seu backend. Este arquivo DEVE ser enviado para o GitHub.

---

Desenvolvido para **Data Frontier** | *Tecnologia única como você.*
