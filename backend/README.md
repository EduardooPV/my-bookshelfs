# Backend - My Bookshelfs

## Visão Geral
O backend do My Bookshelfs é uma API RESTful desenvolvida em Express.js, responsável pelo gerenciamento de usuários, livros, leituras, avaliações e lista de desejos.

## Modelagem do Banco de Dados (Desenvolvimento)

```dbml
Table users {
  // Supabase service
}

Table wishlist {
  id uuid [pk, increment]
  user_id uuid [ref: > users.id]
  book_id varchar [ref: > books.id]
  priority int4
  created_at timestamp [default: 'CURRENT_TIMESTAMP']
}
```
