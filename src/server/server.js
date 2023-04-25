// import { Request, Response, Application } from 'express';

// import * as express from 'express';
// import {Application} from "express";
// import { onFileupload } from './file-upload.route';
const express = require('express');
const onFileupload = require('./file-upload.route');
// const fileUpload = require('express-fileupload');
const bodyParser = require( 'body-parser' );
const PORT = 9000;
const pool = require('./pool');

const app = express();

const cors = require('cors');

app.use(cors({origin: true}));

// app.use(fileUpload());

// Used for POST requests so that we can access req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/alt-api/thumbnail-upload", onFileupload);

// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});