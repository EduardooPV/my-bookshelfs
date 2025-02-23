# Backend - My Bookshelfs

## Visão Geral
O backend do My Bookshelfs é uma API RESTful desenvolvida em Express.js, responsável pelo gerenciamento de usuários, livros, leituras, avaliações e lista de desejos.

## Modelagem do Banco de Dados
A estrutura do banco de dados segue a seguinte modelagem:

```dbml
Table users {
  id integer [pk, increment]
  name varchar(100)
  email varchar(100) [unique]
  password varchar(255)
  created_at timestamp [default: 'CURRENT_TIMESTAMP']
  updated_at timestamp [default: 'CURRENT_TIMESTAMP']
}

Table books {
  id integer [pk, increment]
  title varchar(200)
  author varchar(100)
  isbn varchar(20)
  created_at timestamp [default: 'CURRENT_TIMESTAMP']
  updated_at timestamp [default: 'CURRENT_TIMESTAMP']
}

Table readings {
  id integer [pk, increment]
  user_id integer [ref: > users.id]
  book_id integer [ref: > books.id]
  status varchar(20) [note: 'CHECK: status in (To Read, Reading, Read)']
  start_date date
  completion_date date
  created_at timestamp [default: 'CURRENT_TIMESTAMP']
  updated_at timestamp [default: 'CURRENT_TIMESTAMP']
}

Table reviews {
  id integer [pk, increment]
  user_id integer [ref: > users.id]
  book_id integer [ref: > books.id]
  rating integer [note: 'CHECK: rating BETWEEN 1 AND 5']
  comment text
  created_at timestamp [default: 'CURRENT_TIMESTAMP']
}

Table wishlist {
  id integer [pk, increment]
  user_id integer [ref: > users.id]
  book_id integer [ref: > books.id]
  priority integer
  created_at timestamp [default: 'CURRENT_TIMESTAMP']
}
```

## Considerações de Modelagem
- **Relacionamento N-N** entre Usuários e Livros, usando as tabelas `readings` e `wishlist`.
- **Gestão de leituras** permite rastrear status, datas de início e conclusão.
- **Avaliações** podem ter nota e comentários.
- **Lista de desejos** pode incluir uma prioridade para cada livro.

## Configuração do Projeto
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/my-bookshelfs.git
   cd my-bookshelfs/backend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie o servidor:
   ```sh
   npm run dev
   ```