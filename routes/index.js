const express = require('express');

const todosController = require('../controllers/todos');

const TeamRouter = require('./team');
const PlayerRouter = require('./player');

const router = express.Router();

router.get('/', todosController.getTodos);

router.post('/add', todosController.addTodo);

router.delete('/delete/:id', todosController.deleteTodo);

router.use('/teams', TeamRouter);
router.use('/players', PlayerRouter);

module.exports = router;