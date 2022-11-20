
const User = require('../models').User;
const Category = require('../models').Category;
const Tag = require('../models').Tag;
const Post = require('../models').Post;
const PostCategory = require('../models').Post_category;
const PostComment = require('../models').Post_comment;
const PostMeta = require('../models').Post_meta;
const PostTag = require('../models').Post_tag;
//const Post = require('../models').Post;

//console.log(PostCategory)
class UserController {
    async index(req, res){
    
       /* const result = await PostCategory.findAll({
            include: [
              {
                model: Category,
              }, 
              {
                model : Post
              }
            ]
        });*/


        const result = await Post.findOne({
            where: {
                id : 11
            },
            include: [
                {
                    model: Tag,
                },
                {
                    model : PostMeta
                },
                {
                    model : PostComment
                },
                {
                    model : Category
                },
                {
                    model : User
                }

            ]
            
        });
       
        return res.json(result);
    }
}
module.exports = new UserController();
