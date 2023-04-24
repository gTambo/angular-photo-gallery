
// import {Request, Response} from 'express';

const express = require('express');
const pool = require('./pool');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: "assets/photos/"});
const path = require('path');


router.post('/', upload.single('<NAME>'), async (req, res) => {
  const file = req.file;
  console.log('request to upload: ', file);

  // try {
  //   const result = await pool.query('INSERT INTO files (name, url) VALUES ($1, $2) RETURNING id', [file.originalname, file.path]);
  //   console.log(result.rows);
  //   res.send('File uploaded and inserted into database successfully!', result.rows[0].id);
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).send('Error inserting file into database');
  // }
})

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../assets/photos/', filename);
  res.sendFile(filepath);
});


module.exports = router;