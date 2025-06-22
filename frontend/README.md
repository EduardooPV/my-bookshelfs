# Frontend - My Bookshelfs

Este projeto é o frontend do My Bookshelfs, uma aplicação para organização e acompanhamento de leituras.

## Principais Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web modernas, com renderização híbrida (SSR/SSG), roteamento automático e otimizações de performance.
- **React**: Biblioteca para construção de interfaces de usuário baseadas em componentes reutilizáveis.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, aumentando a segurança e produtividade no desenvolvimento.
- **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva, facilitando a criação de interfaces modernas.
- **Supabase**: Backend as a Service utilizado para autenticação e persistência de dados, integrando facilmente com o frontend via hooks e serviços.
- **Jest**: Ferramenta de testes unitários e integração, garantindo a qualidade do código.
- **ESLint & Prettier**: Ferramentas para padronização e qualidade do código.
- **Dockerfile.dev**: Imagem para desenvolvimento, com hot reload e volumes mapeados.
- **Dockerfile.prd**: Imagem otimizada para produção, realizando build e servindo a aplicação Next.js pronta.


## Organização do Projeto

- `src/app/` — Estrutura de rotas e páginas do Next.js.
- `src/components/` — Componentes reutilizáveis da interface.
- `src/hooks/` — Hooks customizados para lógica de negócio e integração com serviços.
- `src/services/` — Serviços para comunicação com APIs e Supabase.
- `src/lib/` — Utilitários e funções auxiliares.
- `src/styles/` — Arquivos de estilos globais.
- `public/` — Imagens e arquivos estáticos.

## Boas Práticas

- Utilização de componentes funcionais e hooks do React.
- Separação de responsabilidades entre componentes, hooks e serviços.
- Tipagem forte com TypeScript.
- Padronização de código com ESLint e Prettier.
- Testes automatizados com Jest.
- Imagens separadas para desenvolvimento e produção.