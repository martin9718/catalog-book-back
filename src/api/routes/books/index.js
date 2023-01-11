const express = require('express');
const routerBook = express.Router();
const {body} = require('express-validator');

const {createBook} = require('./createBook');
const {findBooks} = require('./findBooks');
const {getBook} = require('./getBook');
const {updateBook} = require('./updateBook');
const {deleteBook} = require('./deleteBook');

const {validateToken} = require("../../lib/middlewares/validateToken");

routerBook.post('/', [
    validateToken,
    body('books').not().isEmpty().withMessage('Book is required'),
], createBook);
routerBook.get('/:userId', [validateToken], findBooks);
routerBook.get('/book/:bookId', [validateToken], getBook);
routerBook.post('/book/:bookId', [
    validateToken,
    // body('book').not().isEmpty().withMessage('Book is required'),
], updateBook);
routerBook.post('/delete/:bookId', [validateToken], deleteBook);

module.exports = {routerBook};
