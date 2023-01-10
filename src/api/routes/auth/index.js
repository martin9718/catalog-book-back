const express = require('express');
const routerAuth = express.Router();

const {signUp} = require('./signUp');

const {body} = require("express-validator");
const {validateFields} = require("../../lib/middlewares/validateFields");

routerAuth.post('/signUp', [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage("Password must be between 4 and 20 characters"),
    validateFields
], signUp);

module.exports = {routerAuth};
