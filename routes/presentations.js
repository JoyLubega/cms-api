const path = require('path');
const express = require('express');
const multer = require('multer');
const Presentation = require('../models/presentations');

const Router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './files');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|mp4|mp3)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });

Router.post(
  '/presentation',
  async (req, res) => {
    console.log(req.body,'ooooooooo')
    try {
      const { title, description, files } = req.body;
    //   const { path, mimetype } = req.file;
      const presentation = new Presentation({
        title,
        description,
        files
      });
      console.log(presentation,'ooooooooo')
      await presentation.save();
      res.send('Presentation added successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/presentations', async (req, res) => {
  try {
    const presentation = await Presentation.find({});
    const sortedByCreationDate = presentation.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of presenations. Try again later.');
  }
});

module.exports = Router;
