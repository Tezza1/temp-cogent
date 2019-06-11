// resize.js
/*
Wanted to use Sharp, but doesn't support 32-bit node
The typical use case for this high speed Node.js module is to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.
Resizing an image is typically 4x-5x faster than using the quickest ImageMagick and GraphicsMagick settings.
*/

const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);

    return filename;
  }
  static filename() {
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;