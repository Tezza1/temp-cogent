const jimp = require('jimp');

jimp.read('image.jpg', (err, image) => {  
  if (err) {
    console.log('Error occurred');
  } else {       
    // image.resize(256, 256)
    image.resize(256, jimp.AUTO)
      .quality(80)
      .write('newfile.jpg');
  }
});

// using promises
jimp.read('image.jpg').then((image) => {
  image.resize(256, jimp.AUTO)
    .quality(80)
    .write('newfile.jpg');
}).catch((err) => {
  console.log(`error: ${err}`);
})


jimp.read('images/background.jpg').then( (image) => {
  // do stuff here
  image.resize(100, 100);
})