const User = require("../models").User;
const Category = require("../models").Category;
const Tag = require("../models").Tag;
const Post = require("../models").Post;
const PostCategory = require("../models").Post_category;
const PostComment = require("../models").Post_comment;
const PostMeta = require("../models").Post_meta;
const PostTag = require("../models").Post_tag;
const { response } = require("express");
var jwt = require("jsonwebtoken");

//const Post = require('../models').Post;

//console.log(PostCategory)
class UserController {
  async index(req, res) {
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
        id: 11,
      },
      include: [
        {
          model: Tag,
        },
        {
          model: PostMeta,
        },
        {
          model: PostComment,
        },
        {
          model: Category,
        },
        {
          model: User,
        },
      ],
    });

    return res.json(result);
  }
  async create(req, res) {
    const row = await User.create({name : 'Vu Minh Hùng', email: 'vuminhhungltt9042@gmail.com', password: '123456789' });
    return res.json({status : 'success'});
   /* await User.findOne({ where: { email: "vuminhhungltt9042@gmail.com" } })
      .then((data) => {
        const test = data.authenticate("***********");
        return res.json(test);
      })
      .catch((error) => {
        return res.json({ error: error });
      });*/
    //   const testFirst = user.authenticate('**********');
    //   const testSecond = user.authenticate('SuperSecret');
    // const row = await User.create({name : 'Vũ Minh Hùng', email: 'vuminhhungltt9042@gmail.com', password: '123456789' });
    //     return res.json({
    //    first : testFirst,
    //    second : testSecond  1670090113902uqjce
    //   });
  }
  async login(req, res) {
    await User.findOne({ where: { email: req.body.email } })
      .then( async (data) => {
        if (!data) return res.json({ status: "error", message : "Email chưa được đăng ký" });
        const checkPassWord = data.authenticate(req.body.password);
        if (!checkPassWord)
          return res.json({ status :"error", message: "Mật khẩu không chính xác !" });
        const {id , name, email} = data;
        var token = jwt.sign(
          {
             data : {id, name, email}
          },
          "authentication_token",
          { expiresIn: "1h" }
        );
         await User.update({ remember_token: token }, {
            where: {
              id : data.id
            }
          });
        return res.json({ status : 'success', data : {id, name, email}, access_token : token });
      })
      .catch((error) => {
        return res.json({ error: error });
      });
  }
 async logout(req, res){
   await  User.update({ remember_token: null }, {
        where: {
          id : req.body.id
        }
      })
      .then((data) => {
         return res.json({status : "success"});
      })
      .catch((error)  => {
        return res.json({status : error});
      })
  }
}
module.exports = new UserController();
