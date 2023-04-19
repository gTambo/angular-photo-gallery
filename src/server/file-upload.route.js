
// import {Request, Response} from 'express';

const express = require('express');
const pool = require('./pool');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get("/:id", (req, res) => {
  const id  = req.params.id;
  const queryText = `SELECT * FROM "files" WHERE "id" = $1;`;
  pool.query((queryText), [id]).then( (result) => {
    console.log(`Fetching files with id=${id}`, result.rows[0]);
/** Probably not needed */
    // const files = result.rows.map(file => {
    //   const fileObj = {
    //     id: file.id,
    //     name: file.name
    //   }
    //   if(file['photo-file']){
    //     fileObj.file = file['photo-file'].blob();
    //   }
    // });
    // console.log('new blob: ', files);
    // .then(myBlob => {
    //   const imgUrl = URL.createObjectURL(myBlob) 
    //   return imgUrl;
    // });
/** yet another method that is probably not needed */
    // const imageName = "image.webp"
    // const imagePath = path.join(__dirname, "images", imageName);

    // fs.exists(imagePath, exists => {
    //     if (exists) res.sendFile(imagePath);
    //     else res.status(400).send(`Error: Image does not exists at , ${imagePath}`);
    // });
    res.send(result.rows[0]);
}).catch( error => {
    console.log('Error getting files', error);
   res.sendStatus(500); 
});
});

router.post("/", (req, res) => {
  let file = req['files'].thumbnail;
  const fileName = file.name;
  const fileType = file.mimetype;
  // const binFile = Buffer.from(file.data);
  console.log(`File uploading: name = ${fileName}, type =  ${fileType}`);

  const query = `INSERT INTO "files" ("name", "photoFile", "type") 
        VALUES ($1, $2, $3)
        RETURNING *
  ;`;

  setTimeout(() => {
    pool.query(query, [fileName, file, fileType]).then(result => {
      console.log('post response: ', result);
      res.send(result.rows[0])
    }).catch((err) => {
      console.log('Error in post: ', err);
      res.sendStatus(500);
    });
  }, 3500);
});

// const onFileupload = (req, res) => {

//     let file = req.body['files'].thumbnail;

//   console.log("File uploaded: ", file.name);

//   setTimeout(() => {
//     res.status(200).json({message: 'File uploaded successfully.'});
//   }, 2000)

// }

module.exports = router;