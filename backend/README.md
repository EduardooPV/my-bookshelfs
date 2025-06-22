# Backend - My Bookshelfs

Este projeto é o backend do My Bookshelfs, responsável pela API, autenticação, persistência e regras de negócio da aplicação.

## Principais Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, aumentando a segurança e produtividade.
- **Express**: Framework minimalista para criação de APIs HTTP robustas e flexíveis.
- **Supabase**: Utilizado como banco de dados (PostgreSQL) e autenticação.
- **Jest**: Ferramenta de testes unitários e integração, garantindo a qualidade do código.
- **ESLint & Prettier**: Ferramentas para padronização e qualidade do código.
- **Dockerfile.dev**: Imagem para desenvolvimento, com hot reload e volumes mapeados.
- **Dockerfile.prd**: Imagem otimizada para produção, realizando build e rodando o código transpilado.
- **Vercel**: Plataforma de deploy serverless (opcional).

## Organização do Projeto

- `src/app.ts` — Ponto de entrada da aplicação Express.
- `src/config/` — Configurações de ambiente e banco de dados.
- `src/controllers/` — Lógica dos endpoints da API.
- `src/middleware/` — Middlewares para autenticação, logging, etc.
- `src/routes/` — Definição das rotas da API.
- `src/services/` — Serviços de negócio e integração com banco de dados.
- `src/types/` — Tipos TypeScript compartilhados.
- `src/utils/` — Funções utilitárias.
- `__mocks__/` — Mocks para testes.

## Boas Práticas

- Separação clara entre camadas (controllers, services, routes, etc).
- Utilização de middlewares para autenticação e logging.
- Tipagem forte com TypeScript.
- Padronização de código com ESLint e Prettier.
- Testes automatizados com Jest.
- Variáveis de ambiente para configurações sensíveis.
- Imagens separadas para desenvolvimento e produção.