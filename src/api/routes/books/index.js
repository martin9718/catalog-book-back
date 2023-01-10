const express = require('express');
const routerBook = express.Router();

const {createBook} = require('./createBook');

const {body} = require("express-validator");

const {validateFields} = require("../../lib/middlewares/validateFields");
const {validateToken} = require("../../lib/middlewares/validateToken");

routerBook.post('/', [
    validateToken,
    body('books').isArray().not().isEmpty().withMessage('Books are required'),
    body('books.*.title').not().isEmpty().withMessage('Title is required'),
    body('books.*.numberPages').isNumeric().withMessage('NumberPages must be a valid number'),
    body('books.*.publicationDate').isDate().withMessage('PublicationDate must be a valid date'),
    body('books.*.userId').not().isEmpty().withMessage('UserId must be a valid ID'),
    validateFields
], createBook);

module.exports = {routerBook};
