
const User = require('../../models').User;
const Category = require('../../models').Category;
const Tag = require('../../models').Tag;
const Post = require('../../models').Post;
const PostCategory = require('../../models').Post_category;
const PostComment = require('../../models').Post_comment;
const PostMeta = require('../../models').Post_meta;
const PostTag = require('../../models').Post_tag;
const { response } = require('express');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
//const Post = require('../models').Post;

//console.log(PostCategory)
class PostController {
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


        /**
         * const result = await Post.findOne({
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
         */
      /*  const topPost = await Post.findAll({
            limit: 5 ,
            order: [['id', 'DESC']],
            include: [
               
                {
                    model : PostMeta,
                    attributes: ['key']
                },
                {
                    model : Category,
                    attributes: ['title', 'slug']
                },
                {
                    model : User,
                    attributes: ['name']
                }

            ],
            attributes: ['createdAt','title', 'description', 'thumb', 'slug']
        });  */



       const rowFirst = await Category.findAll({
            
            include: [
                {
                    model: PostCategory,
                    include : {
                        model : Post,
                        attributes: ['createdAt','title', 'description', 'thumb', 'slug'],
                        include : {
                            model : User,
                            attributes: ['name'],
                        }
                    },
                    
                    limit: 1 ,
                    order: [['id', 'DESC']],
                },
                
             
            ],
            attributes: ['title', 'slug']

        }); 
         const rowSecond = await Category.findOne({
            where : {
                id : 1
            },
            include: [
                {
                    model: PostCategory,
                    include : {
                        model : Post,
                        attributes: ['createdAt','title', 'description', 'thumb', 'slug']
                    },
                    limit: 5 ,
                    order: [['id', 'DESC']],
                },
                
             
            ],
            attributes: ['title', 'slug']

        });  
       const rowThird = await Category.findOne({
            where : {
                id : 3
            },
            include: [
                {
                    model: PostCategory,
                    include : {
                        model : Post,
                        include : {
                            model : User,
                            attributes: ['name'],
                        },
                        attributes: ['createdAt','title', 'description', 'thumb', 'slug']
                    },
                    limit: 4 ,
                    order: [['id', 'DESC']],
                },
                
             
            ],
            attributes: ['title', 'slug']

        });  
        const rowFour = await Category.findOne({
            where : {
                id : 4
            },
            include: [
                {
                    model: PostCategory,
                    include : {
                        model : Post,
                        attributes: ['createdAt','title', 'description', 'thumb', 'slug']
                    },
                    limit: 4 ,
                    order: [['id', 'DESC']],
                },
                
             
            ],
            attributes: ['title', 'slug']

        });  
        const rowFive = await Category.findOne({
            where : {
                id : 5
            },
            include: [
                {
                    model: PostCategory,
                    include : {
                        model : Post,
                        attributes: ['createdAt','title', 'description', 'thumb', 'slug']
                    },
                    limit: 4 ,
                    order: [['id', 'DESC']],
                },
                
             
            ],
            attributes: ['title', 'slug']

        }); 
        const rowRandom = await Post.findAll({
            offset : 5,
            limit: 6 ,
            order: [['id', 'DESC']],
            attributes: ['createdAt','title', 'thumb', 'slug']
        }); 

        const randomFirst = await Post.findAll({
            offset : 15,
            limit: 3 ,
            order: [['id', 'DESC']],
            attributes: ['createdAt','title', 'thumb', 'slug']
        }); 
        const randomSecond = await Post.findAll({
            offset : 20,
            limit: 3 ,
            order: [['id', 'DESC']],
            attributes: ['createdAt','title', 'thumb', 'slug']
        }); 

        /////////////////////////////////////////////////////////////
       
        return res.json({
            rowFirst,
            rowSecond,
            rowThird,
            rowFour,
            rowFive,
            rowRandom,
            randomFirst,
            randomSecond,

            
        }); 
      
       
    }
    async category (req, res) {
        
        const postSuggest = await Post.findAll({
            offset : 0,
            limit: 3 ,
            order: [['id', 'DESC']],
            attributes: ['createdAt','title', 'thumb', 'slug']
        }); 


        const commentSuggest = await PostComment.findAll({
            offset : 0,
            limit: 3 ,
            include : {
                model : Post,
                attributes: ['slug']
            },
            order: [['id', 'DESC']],
            attributes: ['name', 'content']

        }); 
        const categoryAll = await Category.findAll({
           
            include : {
                model : Post,
                attributes : ['id']
            },
           
        });
        const tag = await Tag.findAll({
            attributes: ['title', 'slug']
        })
        return res.json({  
            postSuggest,
            commentSuggest,
            categoryAll,
            tag
        });
    }
    async getByCategory(req, res){
       
        var page = Number(req.body.page) <= 0 || !req.body.page ? 1 : Number(req.body.page) ;
        var slug = req.body.slug;
        var limit_item = 6;
        const category = await Category.findOne({
            where : {
                slug : slug,
               
            },
            attributes : ['id', 'title', 'slug'],
        });
       if(category){
        const result = await PostCategory.findAll({
            include : [
                {
                    model : Category,
                    where : {
                        slug : slug
                    },
                    attributes : ['id']
                },
                {
                    model : Post,
                    attributes : ['title','description', 'createdAt', 'slug', 'thumb'],
                    include : {
                            model : User,
                            attributes: ['name']
                        
                    }
                },
                
            ],
            offset : 0,
            limit: page *  limit_item ,
            order: [['id', 'DESC']],
           });
        
           const total = await PostCategory.findAndCountAll({
             where : {
                category_id : category.id,
                
             },
            
           });
           
           
      
            return res.json({
               
               category,
                result ,
                paginate : {
                   total_item : total.count,
                   current_page : page,
                   next_page : page < Math.ceil(total.count / limit_item) ? page + 1 : false,
                   prev_page : page - 1 <= 0 ? false : page - 1,
                   total_page : total.count / limit_item > 0 ?  Math.ceil(total.count / limit_item)  : 0 ,
                   limit_item : limit_item,
                   more_item : total.count -  result.length > 0 ? total.count -  result.length : false,
    
                }
            });
       }else {
           return res.json({error : "not-found"});
       }
    }
    async getByTag(req, res){
        var page = Number(req.body.page) <= 0 || !req.body.page ? 1 : Number(req.body.page) ;
        var slug = req.body.slug;
        var limit_item = 6;
        const tag = await Tag.findOne({
            where : {
                slug : slug,
            },
            attributes : ['id', 'title', 'slug'],
        });
        if(tag){
            const result = await PostTag.findAll({
                include : [
                    {
                        model : Tag,
                        where : {
                            slug : slug
                        },
                        attributes : ['id']
                    },
                    {
                        model : Post,
                        attributes : ['title','description', 'createdAt', 'slug', 'thumb'],
                        include : {
                                model : User,
                                attributes: ['name']
                            
                        }
                    },
                    
                    
                ],
                offset : 0,
                limit: page *  limit_item ,
                order: [['id', 'DESC']],
               });
            
               const total = await PostTag.findAndCountAll({
                 where : {
                    tag_id : tag.id,
                    
                 },
                
               });
               
               
          
                return res.json({
                   
                    tag,
                    result ,
                    paginate : {
                       total_item : total.count,
                       current_page : page,
                       next_page : page < Math.ceil(total.count / limit_item) ? page + 1 : false,
                       prev_page : page - 1 <= 0 ? false : page - 1,
                       total_page : total.count / limit_item > 0 ?  Math.ceil(total.count / limit_item)  : 0 ,
                       limit_item : limit_item,
                       more_item : total.count -  result.length > 0 ? total.count -  result.length : false,
        
                    }
                });
        }else {
            return res.json({error : 'not-found'});
        }
      
    }
    async getDetail(req, res){
        var slug = req.body.slug;
        const tag = await Tag.findAll({
            attributes : ['id', 'title', 'slug'],
        });
        await Post.findOne({
            where: {
               slug : slug
            },
            include: [
                {
                    model: Tag,
                    attributes : ['title', 'slug']
                },
                {
                    model : PostMeta
                },
                {
                    model : PostComment,
                    as : 'Post_comments',
                    include : {
                        model : PostComment,
                        
                    },
                    where : {
                        parent_id : 0
                    },
                    required:false,
                },
                {
                    model : Category,
                    attributes : ['title', 'slug', 'id']
                },
                {
                    model : User
                }

            ],
            order: [['Post_comments','id', 'DESC']]
            
        })
        .then(async (result) => {
            if(result && result.Categories) {
                const category_id = (result.Categories[0].id);
                const post_id = result.id;
                
                const postSuggest = await PostCategory.findAll({
                    where: {
                        [Op.and]: [{ category_id : category_id  }, { post_id: { [Op.ne]: post_id} }],  
                    },
                    include : {
                        model : Post,
                        attributes : ['title','description', 'createdAt', 'slug', 'thumb']
                    },
                    offset : 0,
                    limit: 3 ,
                    order: [['id', 'DESC']],
                })
                return res.json({
                    result,
                    tag,
                    postSuggest 
                });
               }else {
                  return res.json({error : "not found"});
               }
        })
        .catch((error) => {
            return res.json(error);
        })
       
       
    }
    async getSearchAutoComplete(req, res){
       // return res.json(req.body.key);
        const result = await Post.findAll({
            where : {
                title : {[Op.substring]: req.body.key} 
            },
            offset : 0,
            limit: 5 ,
            order: [['id', 'DESC']],
            attributes : ['title', 'slug']
        })
        return res.json(result);
    }
    async getSearch(req, res){
        var page = Number(req.body.page) <= 0 || !req.body.page ? 1 : Number(req.body.page) ;
      
        var limit_item = 6;
      
       const result = await Post.findAll({
        where : {
            title : {[Op.substring]: req.body.key}
            
         },
         
        attributes : ['title','description', 'createdAt', 'slug', 'thumb'],
        include : {
            model : User,
            attributes: ['name']
        
        },
        offset : 0,
        limit: page *  limit_item ,
        order: [['id', 'DESC']],
       });
    
       const total = await Post.findAndCountAll({
         where : {
            title : {[Op.substring]: req.body.key}
         },
        
       });
       
       
  
        return res.json({
           
           
            result ,
            paginate : {
               total_item : total.count,
               current_page : page,
               next_page : page < Math.ceil(total.count / limit_item) ? page + 1 : false,
               prev_page : page - 1 <= 0 ? false : page - 1,
               total_page : total.count / limit_item > 0 ?  Math.ceil(total.count / limit_item)  : 0 ,
               limit_item : limit_item,
               more_item : total.count -  result.length > 0 ? total.count -  result.length : false,

            }
        });
    }
    async postComment(req, res){
        const row = await PostComment.create({ 
            post_id : req.body.id,
            parent_id : req.body.parent_id,
            name : req.body.name,
            phone_number : req.body.number,
            email : req.body.email,
            content : req.body.content,
            active : 1
         });
        const result = await PostComment.findAll({
            where : {
                [Op.and]: [{   post_id : req.body.id }, { parent_id: 0 }], 
            },
            include : {
                model : PostComment,
                order: [['id', 'DESC']],
            },
            order: [['id', 'DESC']],
            required:false,
        });
        return res.json(result);
    }
    async change(req, res){
        const result = await Post.findAll({
            attributes : ['id', 'thumb'],
        });
        result.map(async (item, key) => {
          
            var text = item.thumb;
           
           var add = "https://res.cloudinary.com/dqouzpjiz/image/upload/v1669888719/avatars/";
            const next = add + text.slice(17, text.length);
           
            await Post.update({ thumb: next }, {
                where: {
                  id : item.id
                }
              });
        }) 
        return res.json(result);
    }
}
module.exports = new PostController();
