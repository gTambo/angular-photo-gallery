
// import {Request, Response} from 'express';

const express = require('express');
const pool = require('./pool');
const router = express.Router();

router.post("/server/thumbnail-upload", (req, res) => {
  let file = req.body['files'].thumbnail;

  console.log("File uploaded: ", file.name);

  setTimeout(() => {
    res.status(200).json({message: 'File uploaded successfully.'});
  }, 2000);
});

// const onFileupload = (req, res) => {

//     let file = req.body['files'].thumbnail;

//   console.log("File uploaded: ", file.name);

//   setTimeout(() => {
//     res.status(200).json({message: 'File uploaded successfully.'});
//   }, 2000)

// }

module.exports = router;