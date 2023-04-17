const express = require('express');
const auth = require('../middleware/auth');
const todosController = require('../controllers/todos');
const UserRouter = require('./user');
const TeamRouter = require('./team');
const PlayerRouter = require('./player');

const AwardRouter = require('./award');

const router = express.Router();

router.get('/', auth, todosController.getTodos);

router.post('/add', todosController.addTodo);

router.delete('/delete/:id', todosController.deleteTodo);

router.use('/user', UserRouter);
router.use('/teams', auth, TeamRouter);
router.use('/players', auth, PlayerRouter);
router.use('/awards', auth, AwardRouter);

module.exports = router;