const signIn = async (req, res) => {
    const {email, password} = req.body;
    const {database, passwords, serializers, session} = req;

    try {
        const existingUser = await database.users.findOne({email});

        if (!existingUser) {
            return res.status(400).json({
                code: 'BAD_REQUEST',
                message: 'Incorrect email or password'
            });
        }

        if(!passwords.compare(password, existingUser.password)){
            return res.status(400).json({
                code: 'BAD_REQUEST',
                message: 'Incorrect email or password'
            });
        }

        const token = session.createToken(serializers.userSerializer(existingUser));

        await database.sessions.create({token});

        res.status(200).json({
            ...serializers.userSerializer(existingUser),
            token
        });
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error trying to sign in'
        })
    }
}

module.exports = {signIn};
