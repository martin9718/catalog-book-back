const express = require('express');
const router = express.Router();

const {routerAuth} = require('./auth/index');
const {routerUser} = require('./users/index');
const {routerBook} = require('./books/index');

router.use('/auth', routerAuth);
router.use('/users', routerUser);
router.use('/books', routerBook);

module.exports = {router};
