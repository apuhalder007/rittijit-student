const express = require('express')
const router = express.Router() 
const bookController = require('../controllers/bookCategoryController')

router.get('/categories', bookController.getCategories)
router.post('/add-category', bookController.addCategory)
router.put('/category/:id', bookController.updateCategory)

module.exports = router