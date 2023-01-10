const signUp = async (req, res) => {
    const {name, email, password} = req.body;
    const {database, passwords, serializers} = req;

    try {
        const existingUser = await database.users.findOne({email});

        if (existingUser) {
            return res.status(409).json({
                code: 'EMAIL_ALREADY_REGISTERED',
                message: `Already exists an user with email ${email}`
            });
        }

        const passwordHash = passwords.toHash(password);
        const user = await database.users.create({name, email, password: passwordHash});

        res.status(201).json(serializers.userSerializer(user));
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying to create an user'
        })
    }
}

module.exports = {signUp};
