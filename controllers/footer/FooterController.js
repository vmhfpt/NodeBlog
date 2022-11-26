const Footer = require('../../models').Footer;

class FooterController {
  async index(req, res){
   
     const result = await Footer.findOne({
        where : {
            slug : req.body.slug
        }
     });
     return res.json(result);
  }
}
module.exports = new FooterController();