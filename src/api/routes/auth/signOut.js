const signOut = async (req, res) => {
    const {database} = req;

    try {
        await database.sessions.delete({token: req.token});

        return res.status(200).json({message: 'Session successfully closed'});
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying to sign out'
        })
    }
}

module.exports = {signOut};
