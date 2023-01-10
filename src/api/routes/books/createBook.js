const createBook = async (req, res) => {
    const {database, serializers} = req;
    const body = req.body;

    try {
        const existingUser = await database.users.findById(body.books[0].userId);

        if (!existingUser) {
            return res.status(400).json({
                code: 'USER_DOES_NOT_EXIST',
                message: 'User does not exist'
            });
        }

        const books = body.books.map(book => {
            return {
                title: book.title,
                numberPages: book.numberPages,
                publicationDate: book.publicationDate,
                userId: book.userId
            }
        });

        let booksCreated = await database.books.create(books);
        booksCreated = booksCreated.map(book => serializers.bookSerializer(book));

        res.status(201).json(booksCreated);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying to create a book'
        })
    }
}

module.exports = {createBook};
