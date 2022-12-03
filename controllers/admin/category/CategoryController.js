
/**const User = require("../models").User;
const Category = require("../models").Category;
const Tag = require("../models").Tag;
const Post = require("../models").Post;
const PostCategory = require("../models").Post_category;
const PostComment = require("../models").Post_comment;
const PostMeta = require("../models").Post_meta;
const PostTag = require("../models").Post_tag; */
const Category = require("../../../models").Category;
const { response } = require("express");
var slug = require('slug');
class CategoryController {
    async index(req, res){
       await Category.findAll({})
       .then((data) => {
         return res.json(data);
       })
       .catch((error) => {
        return res.json(error);
       })
    }
    async create(req, res){
        
        await Category.create({ 
            title : req.body.name,
            parent_id : req.body.parent_id,
            content : "",
            active : 1,
            slug : slug(req.body.name),
            meta_title : req.body.name
        })
        .then((data) => {
           return res.json({status : "success"});
        })
        .catch((error) => {
          return res.json(error);
        }) 
        
        
    }
    async show(req, res){
      const dataItem = await  Category.findOne({
        where : {
          slug :  req.params.slug
        }
       });
       const list = await Category.findAll({});
       return res.json({
        result : dataItem,
        list_category : list
       }) 
     
    }
    async update(req, res){
      await Category.update({ 
        title : req.body.title,
        parent_id : req.body.parent_id,
        slug : slug(req.body.title),
        meta_title : req.body.title
       }, {
        where: {
          slug : req.params.slug
        }
      })
      .then((data) => {
        return res.json({status : "success"});
      })
     .catch((error) => {
      return res.json(error);
     })
    }
    async destroy(req, res){
      await Category.destroy({
        where: {
          id : req.body.id
        }
      })
      .then((data) => {
        return res.json({status : "success",data});
      })
      .catch((error) => {
        return res.json(error);
      })
    }
}
module.exports = new CategoryController();