const express = require('express');
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const jimp = require('jimp'); // move this to a separate file in future

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Upload images to /images directory
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer(
    {storage},
    {
        limits: {  // can set error handling here
            fieldNameSize: 20,
            files: 2,
            fields: 5
        }
    }
    ).single('photo');

app.get('/', (req, res) => {
    res.render('index.hml');
})


app.post('/image', (req, res) => {
    // submit an image for processing
    // return an id that can be used for later retrieval
    // let id = uuidv4();
    upload(req, res, (err) => {
        if(err) {
            return res.end("Error uploading file");
        }
        res.end("File is uploaded");
    })
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