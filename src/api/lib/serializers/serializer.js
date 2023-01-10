class Serializer {
    static userSerializer(user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }
}

module.exports = {Serializer};
