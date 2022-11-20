
const User = require('../../models').User;
const Category = require('../../models').Category;
const Tag = require('../../models').Tag;
const Post = require('../../models').Post;
const PostCategory = require('../../models').Post_category;
const PostComment = require('../../models').Post_comment;
const PostMeta = require('../../models').Post_meta;
const PostTag = require('../../models').Post_tag;
const Sequelize = require('sequelize');

class CategoryController {
   async index(req, res){
      const result = await Category.findAll({
        attributes : ['title', 'slug']
      });
      return res.json(result);
   }
}
module.exports = new CategoryController();
