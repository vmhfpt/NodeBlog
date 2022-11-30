class PostController {
    index(req, res){
      return res.json({status : "this page is private"});
    }
    create(req, res){
      return res.json(req.body);
    }
}
module.exports = new PostController();