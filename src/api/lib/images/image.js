const fs = require("fs");
const sizeOf = require('image-size');
const resizeImg = require('resize-img');


class Image {
    static dimensions(imagePath) {
        return sizeOf(imagePath);
    }

    static resizeImg(pathImage, dimensions) {
        return new Promise((resolve) =>{
            resizeImg(fs.readFileSync(pathImage), {
                width: dimensions.width,
                height: dimensions.height
            }).then(result => resolve(result));
        })
    }

    static saveImage(pathImage, image) {
        fs.writeFileSync(pathImage, image);
    }

    static convertImageBase64(pathImage) {
        return fs.readFileSync(pathImage, {encoding: 'base64'});
    }
}

module.exports = {Image};
