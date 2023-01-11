const updateBook = async (req, res) => {
    const {database, serializers, images} = req;
    const {book} = req.body;
    const {bookId} = req.params;
    const files = req.files;

    console.log(req.body)

    try {
        if (!book) {
            return res.status(400).json({
                code: 'BAD_REQUEST',
                message: 'Book are required'
            });
        }

        const bookData = JSON.parse(book);

        if(
            !bookData.title ||
            !bookData.numberPages ||
            !bookData.publicationDate
        ){
            return res.status(400).json({
                code: 'BAD_REQUEST',
                message: 'Missing fields'
            });
        }

        let bookToStore;

        const image = files['book'];
        const pathImage = `tmp/${image.name}`;

        await image.mv(pathImage);

        const {height, width} = images.dimensions(pathImage);

        if (height > 1000 || width > 1000) {
            return res.status(400).json({
                code: 'IMAGE_EXCEEDS_SIZE',
                message: 'Image exceeds size'
            });
        }

        const resizedImage = await images.resizeImg(pathImage, {width: 240, height: 240});

        images.saveImage(pathImage, resizedImage)

        const imageBase64 = images.convertImageBase64(pathImage);

        bookToStore = {
            title: bookData.title,
            numberPages: bookData.numberPages,
            publicationDate: bookData.publicationDate,
            image: `data:${image.mimetype};base64, ${imageBase64}`,
        };

        await database.books.updateBook(bookId, bookToStore);
        const booksStored = await database.books.findById(bookId);

        res.status(200).json(serializers.bookSerializer(booksStored));
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying to update a book'
        })
    }
}

module.exports = {updateBook};
