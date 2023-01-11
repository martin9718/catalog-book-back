const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    const {database} = req;
    const token = req.get('Authorization')?.split("Bearer ")[1];

    if (!token) {
        return res.status(403).json({
            code: 'FORBIDDEN',
            message: 'No authorization to perform the action'
        });
    }

    const existingSession = await database.sessions.findOne({token});

    if (!existingSession) {
        return res.status(403).json({
            code: 'UNAUTHORIZED',
            message: 'No authorization to perform the action'
        });
    }

    jwt.verify(token, process.env.SEED, async (error, decoded) => {
        if (error) {
            return res.status(403).json({
                code: 'FORBIDDEN',
                message: 'No authorization to perform the action'
            });
        }

        req.user = decoded.user;
        req.token = token;
    });

    next();
}

module.exports = {
    validateToken
}
