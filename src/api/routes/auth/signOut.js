const signOut = async (req, res) => {
    const {database} = req;
    const token = req.get('Authorization').split("Bearer ")[1];

    try {
        const existingSession = await database.sessions.findOne({token});

        if (!existingSession) {
            return res.status(401).json({
                code: 'UNAUTHORIZED',
                message: 'No authorization to perform the action'
            });
        }

        await database.sessions.delete({token});

        return res.status(200).json({message: 'Session successfully closed'});
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying to sign out'
        })
    }
}

module.exports = {signOut};
