const express = require('express');
const router = express.Router();

const {routerAuth} = require('./auth/index');
const {routerUser} = require('./users/index');

router.use('/auth', routerAuth);
router.use('/users', routerUser);

module.exports = {router};
