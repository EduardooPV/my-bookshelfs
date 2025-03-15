import { Router } from 'express';
import { getAllBooksController, getBookControler } from '../controllers/book';

const router = Router();

router.get('/', getAllBooksController);
router.get('/:id', getBookControler);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Operações relacionadas a livros
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Recuperar todos os livros com base em uma consulta de pesquisa
 *     tags: [Books]
 *     parameters:
 *       - name: searchQuery
 *         in: query
 *         description: Termo de pesquisa para filtrar os livros
 *         required: true
 *         schema:
 *           type: string
 *           example: "Harry Potter"
 *       - name: page
 *         in: query
 *         description: Número da página para paginar os resultados
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Quantidade de livros a retornar por página
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de livros encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         description: Identificador único do livro
 *                       title:
 *                         type: string
 *                         description: Título do livro
 *                       author:
 *                         type: string
 *                         description: Autor do livro
 *                       cover:
 *                         type: string
 *                         description: URL da capa do livro
 *                       publishYear:
 *                         type: integer
 *                         description: Ano de publicação do livro
 *                       rating:
 *                         type: object
 *                         properties:
 *                           average:
 *                             type: number
 *                             format: float
 *                             description: Média das avaliações
 *                           count:
 *                             type: integer
 *                             description: Número total de avaliações
 *                           readingLog:
 *                             type: object
 *                             properties:
 *                               currently_reading:
 *                                 type: integer
 *                               want_to_read:
 *                                 type: integer
 *                               already_read:
 *                                 type: integer
 *     400:
 *       description: Erro na solicitação (parâmetros inválidos)
 *     500:
 *       description: Erro interno do servidor
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Recuperar detalhes de um livro específico pelo seu ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID único do livro
 *         required: true
 *         schema:
 *           type: string
 *           example: "OL12345W"
 *     responses:
 *       200:
 *         description: Detalhes do livro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 key:
 *                   type: string
 *                 book:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     subtitle:
 *                       type: string
 *                     cover:
 *                       type: string
 *                     pages:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     publishDate:
 *                       type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 rating:
 *                   type: object
 *                   properties:
 *                     average:
 *                       type: number
 *                       format: float
 *                     count:
 *                       type: integer
 *                     readingLog:
 *                       type: object
 *                       properties:
 *                         currently_reading:
 *                           type: integer
 *                         want_to_read:
 *                           type: integer
 *                         already_read:
 *                           type: integer
 *     400:
 *       description: Erro ao tentar recuperar livro com ID inválido
 *     404:
 *       description: Livro não encontrado
 *     500:
 *       description: Erro interno do servidor
 */

export default router;
