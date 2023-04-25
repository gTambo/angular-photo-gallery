
// import {Request, Response} from 'express';

const express = require('express');
const pool = require('./pool');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(`req: ${Object.keys(req)}, file: ${Object.keys(file)}`);
    cb(null, file.originalname + '-' + Date.now())
  }
})
const upload = multer({dest: 'src/assets/photos/'});


router.post('/upload', upload.single('thumbnail'), async (req, res) => {
  const file = req.file;
  console.log('request to upload: ', Object.keys(req));
  const img = fs.readFileSync(file.path);
  const encode_image = img.toString('base64');
  // Define a JSONobject for the image attributes for saving to database 
  const finalImg = {
      contentType: file.mimetype,
      image: Buffer.from(encode_image, 'base64')
  };
  try {
    const result = await pool.query(
      'INSERT INTO "files" ("name", "url", "type", "photoFile") VALUES ($1, $2, $3, $4) RETURNING id;', 
      [file.originalname, file.path, file.mimetype, finalImg]
      );
    console.log(result.rows);
    res.status(200).send({message: `File uploaded and inserted into database with id: ${result.rows[0].id}`})
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting file into database');
  }
})

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../assets/photos/', filename);
  res.sendFile(filepath);
});


module.exports = router;