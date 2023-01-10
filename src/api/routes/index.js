const express = require('express');
const router = express.Router();

const {routerAuth} = require('./auth/index');

router.use('/auth', routerAuth);

module.exports = {router};
