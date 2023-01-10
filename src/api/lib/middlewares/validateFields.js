const {validationResult} = require('express-validator');

const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            code: 'BAD_REQUEST',
            message: 'Invalid request parameters',
            errors: errors.errors[0]
        });
    }
    next();
}

module.exports = {
    validateFields
}
