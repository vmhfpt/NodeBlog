const Footer = require('../../models').Footer;
const Post = require('../../models').Post;
class FooterController {
  async index(req, res){
   const post_suggest = await Post.findAll({
      offset : 3,
      limit: 3 ,
      order: [['id', 'DESC']],
      attributes: ['createdAt','title', 'thumb', 'slug']
  }); 
     const result = await Footer.findOne({
        where : {
            slug : req.body.slug
        }
     });
     return res.json({
      result,
      post_suggest
     });
  }
}
module.exports = new FooterController();