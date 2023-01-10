const express = require('express');
const routerUser = express.Router();

const {currentUser} = require('./currentUser');

const {validateToken} = require('../../lib/middlewares/validateToken');

routerUser.get('/currentUser', [validateToken], currentUser);

module.exports = {routerUser};
