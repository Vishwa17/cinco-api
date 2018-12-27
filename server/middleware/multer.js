'use strict';

module.exports = function(options){

    let aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

    let s3 = new aws.S3({});

    var upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'cinco-garbage',
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString())
        }
      })
    });
    return function(req, res, next){
      upload.array('attachments', 4)(req, res, function(){
        next();
      });
    }
}