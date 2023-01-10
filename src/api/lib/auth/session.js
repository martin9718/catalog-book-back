const jwt = require('jsonwebtoken');

class Session {
    static createToken(user) {
        return jwt.sign({
            user: user,
        }, process.env.SEED, {
            expiresIn: process.env.EXPIRATION_TOKEN,
        });
    }
}

module.exports = {Session};
