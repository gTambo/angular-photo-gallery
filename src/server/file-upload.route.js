
// import {Request, Response} from 'express';

const express = require('express');
const pool = require('./pool');
const router = express.Router();

router.get("/", (req, res) => {
  pool.query(`SELECT * FROM "files";`).then( (result) => {
    console.log("Fetching files ", result.rows);
    const files = result.rows.map(file => {
      const fileObj = {
        id: file.id,
        name: file.name
      }
      if(file['photo-file']){
        fileObj.file = file['photo-file'].blob();
      }
    });
    console.log('new blob: ', files);
    // .then(myBlob => {
    //   const imgUrl = URL.createObjectURL(myBlob) 
    //   return imgUrl;
    // });
    res.send(files);
}).catch( error => {
    console.log('Error getting files', error);
   res.sendStatus(500); 
});
});

router.post("/", (req, res) => {
  let file = req['files'].thumbnail;

  console.log("File uploading: ", file.name);

  const query = `INSERT INTO "files" ("name", "photo-file") 
        VALUES ($1, $2)
        RETURNING "id"
  ;`;

  pool.query(query, [file.name, file]).then(result => {
    console.log('post response: ', result);
    res.send(result.rows[0])
  }).catch((err) => {
    console.log('Error in post: ', err);
    res.sendStatus(500);
  });
  // setTimeout(() => {
  //   res.status(200).json({message: 'File uploaded successfully.'});
  // }, 4000);
});

// const onFileupload = (req, res) => {

//     let file = req.body['files'].thumbnail;

//   console.log("File uploaded: ", file.name);

//   setTimeout(() => {
//     res.status(200).json({message: 'File uploaded successfully.'});
//   }, 2000)

// }

module.exports = router;