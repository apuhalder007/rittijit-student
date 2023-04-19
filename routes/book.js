const book = require('../controllers/book');
const express = require('express');
const router = express.Router();

router.get('/books', book.getBooks);
router.get('/books/category/:id', book.getBooksByCategory);
router.get('/books/search/:term', book.searchBooks);
router.post('/add-book', book.addBook);


module.exports =  router;