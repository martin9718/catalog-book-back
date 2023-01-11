const deleteBook = async (req, res) => {
    const {database, serializers} = req;
    const {bookId} = req.params;

    try {

        await database.books.delete(bookId);
        const booksStored = await database.books.findById(bookId);

        res.status(200).json(serializers.bookSerializer(booksStored));
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying get book'
        })
    }
}

module.exports = {deleteBook};
