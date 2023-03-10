const express = require('express');
const routerAuth = express.Router();

const {signUp} = require('./signUp');
const {signIn} = require('./signIn');
const {signOut} = require('./signOut');

const {body} = require("express-validator");

const {validateFields} = require("../../lib/middlewares/validateFields");
const {validateToken} = require("../../lib/middlewares/validateToken");

routerAuth.post('/signUp', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage("Password must be between 4 and 20 characters"),
    validateFields
], signUp);

routerAuth.post('/signIn', [
    body('email').not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
    validateFields
], signIn);

routerAuth.post('/signOut', [validateToken], signOut);

module.exports = {routerAuth};
