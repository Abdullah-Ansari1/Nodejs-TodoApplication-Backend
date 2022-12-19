import express from 'express';

import { createTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../controlllers/todos.js';

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:id', getTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;