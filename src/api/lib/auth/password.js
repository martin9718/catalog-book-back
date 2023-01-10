const bcrypt = require('bcryptjs');

class Password {
    static toHash(password) {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    }

    static compare(suppliedPassword, storedPassword) {
        return bcrypt.compareSync(suppliedPassword, storedPassword);
    }

}

module.exports = {Password};
