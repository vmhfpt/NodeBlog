const path = require("path");
const cloudinary = require("cloudinary");
const slug = require("slug");

const uploadImage = require("../../../config/cloudinary/cloudinary");
class PostController {
    index(req, res){
      return res.json({status : "this page is private"});
    }
   async create(req, res){
      if (req.files.file) {
        const dataFile = req.files.file;
       // const dataNameCloud = await uploadImage(dataFile[0].path, "image");
       // console.log(dataNameCloud);
        
      //storage/products/844ce56e931b087eb623d912e182c0e4.jpg


        //https://res.cloudinary.com/dqouzpjiz/image/upload/v1669888719/avatars/e113e2cc45321736f396749a7069e1bd_dugtwq.jpg
    
      }
      return res.json({status : req.body});
    }
}
module.exports = new PostController();