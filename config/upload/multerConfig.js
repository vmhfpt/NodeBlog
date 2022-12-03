const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/../../src/public/img/images/'));
    },
    filename: function (req, file, cb) {
      
      cb(null,  Date.now() + (Math.random() + 1).toString(36).substring(7) );
    }
  });

  var upload = multer({ storage: storage });
   const handleUploadFile = upload.fields([{name : 'file', maxCount:1}, {name: 'images', maxCount:12}]);
   module.exports = handleUploadFile;