const createBook = async (req, res) => {
    const {database, serializers, images} = req;
    const {books} = req.body;
    const files = req.files;

    try {
        if (!books) {
            return res.status(400).json({
                code: 'BAD_REQUEST',
                message: 'Books are required'
            });
        }

        const booksData = JSON.parse(books);
        const existingUser = await database.users.findById(booksData[0].userId);

        if (!existingUser) {
            return res.status(400).json({
                code: 'USER_DOES_NOT_EXIST',
                message: 'User does not exist'
            });
        }

        const booksToStore = [];

        for (let i = 0; i < booksData.length; i++) {
            if(
                !booksData[i].title ||
                !booksData[i].numberPages ||
                !booksData[i].publicationDate ||
                !booksData[i].image
            ){
                return res.status(400).json({
                    code: 'IMAGE_EXCEEDS_SIZE',
                    message: 'Missing fields'
                });
            }

            const image = files['book-file-' + i];
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

            booksToStore.push({
                title: booksData[i].title,
                numberPages: booksData[i].numberPages,
                publicationDate: booksData[i].publicationDate,
                image: `data:${image.mimetype};base64, ${imageBase64}`,
                userId: booksData[i].userId,
            });
        }

        let booksCreated = await database.books.create(booksToStore);
        booksCreated = booksCreated.map(book => serializers.bookSerializer(book));

        res.status(201).json(booksCreated);
    } catch (error) {
        res.status(500).json({
            code: 'UNEXPECTED_ERROR',
            message: 'Error while trying to create a book'
        })
    }
}

module.exports = {createBook};
