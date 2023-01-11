const findBooks = async (req, res) => {
    const {database, serializers} = req;
    const {userId} = req.params;
    const {page = 1, limit = 4} = req.query;

    try {

        const booksStored = await database.books.findAllByUserId(userId, limit, page);
        const countBooks = await database.books.countBooks();

        const books = booksStored.map(book => serializers.bookSerializer(book));

        res.status(200).json({
            books,
            totalPages: Math.ceil(countBooks / limit),
            currentPage: page,
            totalBooks: countBooks
        });

    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying get books'
        })
    }
}

module.exports = {findBooks};
