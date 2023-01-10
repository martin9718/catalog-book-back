const currentUser = async (req, res) => {
    const {database, serializers} = req;

    try {
        const existingUser = await database.users.findOne({email: req.user.email});

        res.status(200).json({
            ...serializers.userSerializer(existingUser),
            token: req.token
        });
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error trying to getting current user'
        })
    }
}

module.exports = {currentUser};
