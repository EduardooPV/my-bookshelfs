<p align="center">
  <img src="./assets/icon-128x128.png" alt="My Bookshelves" width="96" />
</p>

<h1 align="center">My Bookshelves</h1>

<p align="center">
  Organize sua biblioteca pessoal — acompanhe livros que leu, está lendo e quer ler.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Express-4-gray?logo=express" alt="Express 4" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/deploy-Vercel-black?logo=vercel" alt="Vercel" />
</p>

---

## Sobre o projeto

**My Bookshelves** é uma aplicação full-stack para gestão de leituras pessoais. A ideia central é simples: você pesquisa livros pelo título, adiciona à sua estante e marca o status — _lista de desejos_, _lendo_ ou _concluído_. O acervo é alimentado pela [Open Library API](https://openlibrary.org/developers/api), garantindo milhões de títulos disponíveis sem precisar cadastrar nada manualmente.

### Funcionalidades

- Cadastro e autenticação de usuários (e-mail/senha)
- Busca de livros por título via Open Library
- Adição de livros à estante com status `wishlist`, `reading` ou `done`
- Visualização da estante agrupada por status com contagem
- Recuperação de senha por e-mail
- Interface responsiva e acessível

---

## Stack

| Camada        | Tecnologias                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **Frontend**  | Next.js 15, React 18, TypeScript, Tailwind CSS, Shadcn/ui, React Query      |
| **Backend**   | Node.js, Express 4, TypeScript                                              |
| **Banco**     | PostgreSQL via Supabase                                                     |
| **Auth**      | Supabase Auth (JWT em httpOnly cookie)                                      |
| **Testes**    | Jest, Supertest, Testing Library                                            |
| **CI/CD**     | GitHub Actions → Vercel (staging + produção)                                |
| **Container** | Docker + Docker Compose (dev e prod)                                        |

---

## Como rodar localmente

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose (opcional, mas recomendado)
- Projeto no [Supabase](https://supabase.com) com Auth habilitado

### 1. Clone o repositório

```bash
git clone https://github.com/EduardooPV/my-bookshelves.git
cd my-bookshelves
```

### 2. Configure as variáveis de ambiente

**`backend/.env`**
```env
SUPABASE_URL=https://<seu-projeto>.supabase.co
SUPABASE_KEY=<sua-service-role-key>
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**`frontend/.env`**
```env
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua-anon-key>
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Inicie com Docker

```bash
docker compose -f docker-compose.dev.yml up --build
```

Acesse em `http://localhost:3000`. A API estará disponível em `http://localhost:3001`.

### 3. Ou inicie sem Docker

```bash
# Terminal 1 — backend
cd backend && npm install && npm run dev

# Terminal 2 — frontend
cd frontend && npm install && npm run dev
```

---

## Testes

```bash
# Backend
cd backend && npm run test:unit

# Frontend
cd frontend && npm run test:unit
```

---

## Estrutura do repositório

```
my-bookshelves/
├── backend/    API REST (Express + TypeScript + Supabase)
├── frontend/   Web app (Next.js + React + Tailwind)
├── assets/     Ícones do projeto
├── docker-compose.dev.yml
└── docker-compose.prd.yml
```

Documentação detalhada de cada camada:

- [Backend →](./backend/README.md)
- [Frontend →](./frontend/README.md)

---

## CI/CD

O projeto possui pipelines automáticos via **GitHub Actions** que cobrem qualidade de código, testes e deploy:

| Workflow | Trigger | O que faz |
|---|---|---|
| **Frontend Checks** | PR para `staging` ou push em `main` (changes em `frontend/`) | ESLint + Prettier + build de verificação |
| **Backend Checks** | PR para `staging` ou push em `main` (changes em `backend/`) | ESLint + Prettier + testes unitários (Jest) |
| **Frontend Deploy** | Push em `main` (prod) · PR para `staging` | Build + deploy na Vercel (prod ou preview) |
| **Backend Deploy** | Push em `main` (prod) · PR para `staging` | Build + deploy na Vercel (prod ou preview) |
| **Keep Alive** | Cron a cada 3 dias | Ping no `/health` do backend para evitar que o Supabase pause por inatividade |
| **Validate PR** | Abertura/atualização de PR | Valida título e estrutura do pull request |

### Fluxo de branches

```
feature/* → staging (PR + checks + preview deploy)
                ↓
             main (merge + deploy produção)
```

## Screenshots

![Dashboard com estante de livros](https://github.com/user-attachments/assets/b3d71346-8863-403c-82d2-1e40d312fe38)

![Busca e adição de livros](https://github.com/user-attachments/assets/f03a779c-8f22-4478-a09e-a5f76996983b)
