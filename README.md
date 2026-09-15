# Login com Banco de Dados

Aplicação de autenticação de usuários construída com **React**, **Vite** e **Firebase** (Authentication + Firestore), com testes end-to-end automatizados usando **Playwright**.

🔗 **Demo ao vivo:** [link do deploy aqui](#)

![preview do projeto](./docs/preview.png)

> Adicione um screenshot ou GIF do app funcionando na pasta `docs/` e atualize o link acima.

---

## ✨ Funcionalidades

- Cadastro de usuário com e-mail e senha
- Validação de formulário (e-mail válido, senha mínima de 6 caracteres)
- Login e logout
- Persistência dos dados do usuário no Firestore
- Feedback visual com toasts de sucesso/erro
- Testes automatizados cobrindo o fluxo completo: cadastro → login → logout
- Ambiente de desenvolvimento isolado usando os **emuladores do Firebase**, sem risco de gravar dados de teste em produção

---

## 🛠️ Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Firebase](https://firebase.google.com/) — Authentication e Firestore
- [React Toastify](https://fkhadra.github.io/react-toastify/) — notificações
- [Playwright](https://playwright.dev/) — testes end-to-end

---

## 📁 Estrutura do projeto

```
src/
├── connectionBD/
│   └── firebaseConnect.js    # Inicialização do Firebase (Auth + Firestore)
├── pages/
│   ├── Login/                # Tela de login e cadastro
│   └── ListaUsuarios/        # Tela pós-login
├── App.jsx
├── Router.jsx
└── main.jsx

tests/
└── autenticacao.spec.js      # Testes E2E com Playwright
```

---

## 🚀 Rodando o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`
- [Java JDK](https://www.oracle.com/java/technologies/downloads/) 11+ (necessário para o emulador do Firestore)

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd login-com-bd
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_USE_FIREBASE_EMULATOR=true
```

Isso garante que, em desenvolvimento, o app se conecte aos **emuladores locais** do Firebase, sem gravar dados no banco de produção.

### 4. Inicie os emuladores do Firebase

Em um terminal:

```bash
firebase emulators:start
```

Isso sobe os emuladores de **Authentication** (`localhost:9099`) e **Firestore** (`localhost:8080`), além da interface visual em `http://127.0.0.1:4000`.

### 5. Inicie o servidor de desenvolvimento

Em outro terminal:

```bash
npm run dev
```

Acesse `http://localhost:5173`.

---

## 🧪 Testes automatizados

O projeto usa **Playwright** para testar o fluxo completo de autenticação (criar conta, fazer login, fazer logout).

Com os emuladores e o servidor de desenvolvimento rodando, execute:

```bash
npx playwright test
```

Para rodar com o navegador visível:

```bash
npx playwright test --headed
```

Para investigar uma falha em detalhes (screenshot, DOM, console, rede):

```bash
npx playwright show-trace test-results/<pasta-do-teste>/trace.zip
```

---

## 📦 Build para produção

```bash
npm run build
```

Antes de publicar, **remova ou não defina** a variável `VITE_USE_FIREBASE_EMULATOR` no ambiente de deploy, para que o app se conecte ao Firebase real.

Para pré-visualizar o build localmente:

```bash
npm run preview
```

---

## 🔒 Regras de segurança do Firestore

O projeto usa uma regra simples, exigindo autenticação para leitura e escrita:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

> Nomes de coleção sem acentos são recomendados — caracteres especiais podem causar erros de parsing nas regras do Firestore.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👤 Autor

Desenvolvido por **[Wiarley Sena]** — 
[LinkedIn](https://www.linkedin.com/in/wiarley-sena-528762357/) · [GitHub](https://github.com/wiarley-sena)