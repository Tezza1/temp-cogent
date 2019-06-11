// index.js
const express = require('express');
const path = require('path');
const upload = require('./upload');
// const resize = require('./resize');

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.hml');
})


app.post('/image', upload.single('image'), async function(req, res) {
    // submit an image for processing
    // return an id that can be used for later retrieval
    const imagePath = path.join(__dirname, '/public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });
});

// app.get(`/image/${imageID}/thumbnail`, (req, res) => {
app.get(`/image/thumbnail`, (req, res) => {
    // fetch the resulting thumbnail for a given id
})

// set the port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})