import { Router } from 'express';
import {
  addToWishlistController,
  getAllWishlistItemsController,
  removeFromWishlistController,
  updateWishlistController,
} from '../controllers/wishlist';

const router = Router();

router.put('/:bookId', addToWishlistController);
router.get('/', getAllWishlistItemsController);
router.delete('/:bookId', removeFromWishlistController);
router.patch('/:bookId', updateWishlistController);

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Operações relacionadas à lista de desejos de livros
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Recuperar todos os livros da lista de desejos de um usuário
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []  # Requer o Bearer token para essa rota
 *     parameters:
 *       - name: userId
 *         in: query
 *         description: ID do usuário para buscar a lista de desejos
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: Lista de livros na lista de desejos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   book_id:
 *                     type: string
 *                   priority:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Erro na solicitação (ID do usuário inválido)
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /wishlist/{bookId}:
 *   put:
 *     summary: Adicionar um livro à lista de desejos de um usuário
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []  # Requer o Bearer token para essa rota
 *     parameters:
 *       - name: bookId
 *         in: path
 *         description: ID do livro a ser adicionado
 *         required: true
 *         schema:
 *           type: string
 *           example: "OL12345W"
 *       - name: userId
 *         in: query
 *         description: ID do usuário que está adicionando o livro
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *       - name: priority
 *         in: query
 *         description: Prioridade do livro na lista de desejos
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Livro adicionado à lista de desejos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 book_id:
 *                   type: string
 *                 priority:
 *                   type: integer
 *       400:
 *         description: Livro já está na lista de desejos ou dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /wishlist/{bookId}:
 *   delete:
 *     summary: Remover um livro da lista de desejos de um usuário
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []  # Requer o Bearer token para essa rota
 *     parameters:
 *       - name: bookId
 *         in: path
 *         description: ID do livro a ser removido
 *         required: true
 *         schema:
 *           type: string
 *           example: "OL12345W"
 *       - name: userId
 *         in: query
 *         description: ID do usuário que está removendo o livro
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: Livro removido da lista de desejos
 *       400:
 *         description: Erro ao tentar remover o livro (livro não encontrado)
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /wishlist/{bookId}:
 *   patch:
 *     summary: Atualizar a prioridade de um livro na lista de desejos de um usuário
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []  # Requer o Bearer token para essa rota
 *     parameters:
 *       - name: bookId
 *         in: path
 *         description: ID do livro que terá a prioridade atualizada
 *         required: true
 *         schema:
 *           type: string
 *           example: "OL12345W"
 *       - name: userId
 *         in: query
 *         description: ID do usuário que está atualizando o livro
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *       - name: priority
 *         in: query
 *         description: Nova prioridade do livro na lista de desejos
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Prioridade do livro atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                 book_id:
 *                   type: string
 *                 priority:
 *                   type: integer
 *       400:
 *         description: Erro ao tentar atualizar o livro (livro não encontrado)
 *       500:
 *         description: Erro interno do servidor
 */

export default router;
