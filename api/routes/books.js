const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books')

router.get('/', booksController.index)
router.get('/:id', booksController.show)
router.post('/', booksController.create)
router.delete('/:id', booksController.destroy) //adding the delete posts

module.exports = router;