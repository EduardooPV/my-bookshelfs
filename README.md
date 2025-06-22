![Ícone 128x128](./assets/icon-128x128.png)

# My Bookshelfs

My Bookshelfs é um sistema completo para ajudar usuários a gerenciar seus livros lidos, em leitura e para ler. O sistema permite organizar leituras, avaliar livros e criar uma lista de desejos para futuras aquisições.

## Tecnologias Utilizadas

- **Frontend**: Next.js (React, TypeScript, Tailwind CSS, Supabase)
- **Backend**: Express.js (Node.js, TypeScript, Supabase)
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Autenticação**: Supabase Auth (JWT)
- **Testes**: Jest
- **Padronização**: ESLint & Prettier
- **CI/CI**: Deploy automático para ambientes de staging e produção com deploy via actions na Vercel.
- **Dockerfile.dev** e **Dockerfile.prd**: Arquivos Dockerfile específicos para ambiente de desenvolvimento (`dev`) e produção (`prd`) em ambos os diretórios `backend` e `frontend`.
- **docker-compose.dev.yml**: Orquestra os containers de frontend e backend em modo desenvolvimento, com hot reload e volumes mapeados.
- **docker-compose.prd.yml**: Orquestra os containers otimizados para produção, utilizando as imagens finais de frontend e backend.

## Funcionalidades Principais

- Cadastro e autenticação de usuários
- Adição e organização de livros
- Registro de leituras (status: Lista de desejo, Lendo, Lido)
- Listagem de livros utilizando a api `Open library` (provavelmente irei mudar)

## Estrutura do Repositório

- `/` - Documentação global e informações gerais do projeto
- `/backend` - API construída com Express.js e TypeScript ([veja mais](./backend/README.md))
- `/frontend` - Aplicação web desenvolvida com Next.js e React ([veja mais](./frontend/README.md))

## Preview

![image](https://github.com/user-attachments/assets/b3d71346-8863-403c-82d2-1e40d312fe38)

![image](https://github.com/user-attachments/assets/f03a779c-8f22-4478-a09e-a5f76996983b)
