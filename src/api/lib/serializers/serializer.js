class Serializer {
    static userSerializer(user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    static bookSerializer(book) {
        return {
            id: book._id,
            title: book.title,
            numberPages: book.numberPages,
            publicationDate: book.publicationDate,
            userId: book.userId,
        }
    }
}

module.exports = {Serializer};
