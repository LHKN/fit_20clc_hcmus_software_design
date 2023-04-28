const formidable = require('formidable');
const fs = require('fs-extra');
const _ = require('lodash');

const fileService = {
  saveFile: (req, options) => {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm(options);
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return reject(Error(err));
        }
        if (_.isEmpty(files)) resolve(null);
        if (!files.myFile.length) {
          const file = files.myFile;
          return resolve(file.toJSON());
        }
        // else {
          
        // }
      })
    })
  }
};

module.exports = fileService;