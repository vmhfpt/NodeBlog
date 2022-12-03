const Tag = require("../../../models").Tag;
var slug = require('slug');
class TagController {
    async index(req, res){
        await Tag.findAll({})
        .then((data) => {
            return res.json(data);
        })
        .catch((error) => {
            return res.json(error);
        })
    }
    async create(req, res){
        await Tag.create({ 
            title : req.body.name,
            meta_title : req.body.name,
            slug : slug(req.body.name),
            content : "null"
        })
        .then((data) => {
            return res.json(data);
        })
    }
    async update(req, res){
        await Tag.update({ 
            title : req.body.name,
            slug : slug(req.body.name),
            meta_title : req.body.name
           }, {
            where: {
              id : req.params.id
            }
          })
          .then(async (data) => {
              const result = await Tag.findOne({where: {id : req.params.id}});
              return res.json(result);
          })
      
    }
    async destroy(req, res){
        await Tag.destroy({
            where: {
              id : req.body.id
            }
          })
          .then((data) => {
            return res.json({status : "success",id : req.body.id});
          })
          .catch((error) => {
            return res.json(error);
          })
    }
}
module.exports = new TagController();