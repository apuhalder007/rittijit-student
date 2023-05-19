const express = require('express');
const auth = require('../middleware/auth');
const todosController = require('../controllers/todos');
const UserRouter = require('./user');
const TeamRouter = require('./team');
const PlayerRouter = require('./player');

const AwardRouter = require('./award');

const bookCategoryRouter = require('./bookCategory');

const bookRouter = require('./book');

const geocodeRouter = require('./geocode');

const router = express.Router();

router.get('/', auth, todosController.getTodos);

router.post('/add', todosController.addTodo);

router.delete('/delete/:id', todosController.deleteTodo);

router.use('/user', UserRouter);
router.use('/teams', auth, TeamRouter);
router.use('/players', auth, PlayerRouter);
router.use('/awards', auth, AwardRouter);
router.use('/book', bookCategoryRouter);
router.use('/', auth, bookRouter);

router.use('/geocode', geocodeRouter);

module.exports = router;