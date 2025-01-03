const express = require('express');
const router = express.Router();

const { addBook, getBook, updateBook, deleteBook, allBooks } = require('../Controllers/bookController');
const { protect } = require('../Controllers/userController');
const upload = require('../Config/multer');

router.post('/add', protect, upload.single('cover_page'), addBook);
router.get('/get', protect, getBook);
router.post('/update', protect, updateBook);
router.delete('/delete', protect, deleteBook);
router.get('/all', allBooks);

module.exports = router;