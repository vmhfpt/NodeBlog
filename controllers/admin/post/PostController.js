const cloudinary = require("cloudinary");
const slug = require("slug");
const Category = require("../../../models").Category;
const uploadImage = require("../../../config/cloudinary/cloudinary");
const Post = require("../../../models").Post;
const PostCategory = require("../../../models").Post_category;
const PostMeta = require("../../../models").Post_meta;
const PostTag = require("../../../models").Post_tag;
const Tag = require("../../../models").Tag;
const fs = require("fs");
const path = require("path");
class PostController {
  async index(req, res) {
    const row = await Post.findAll({
      include: [
        {
          model: Category,
          attributes: ["title", "id"],
        },
        {
          model: Tag,
          attributes: ["title", "id"],
        },
      ],
      order: [["id", "DESC"]],
      attributes: [
        "createdAt",
        "title",
        "thumb",
        "slug",
        "description",
        "active",
        "content",
        "id",
      ],
    });
    return res.json(row);
  }
  async create(req, res) {
    if (req.files.file) {
      const dataFile = req.files.file;
      const dataNameCloud = await uploadImage(dataFile[0].path, "image");
      await Post.create({
        user_post_id: req.userId,
        parent_id: 0,
        title: req.body.title,
        meta_title: req.body.title,
        slug: slug(req.body.title),
        description: req.body.description,
        content: req.body.content,
        active: req.body.active,
        thumb: dataNameCloud,
      })
        .then(async (data) => {
          const rowFirst = await PostCategory.create({
            post_id: data.id,
            category_id: req.body.category,
          });
          const rowSecond = await PostTag.create({
            post_id: data.id,
            tag_id: req.body.tag,
          });
          const rowThird = await PostMeta.create({
            post_id: data.id,
            key: req.body.title,
            content: "null",
          });

          const result = await Post.findOne({
            where: {
              id: data.id,
            },
            include: [
              {
                model: Category,
                attributes: ["title", "id"],
              },
              {
                model: Tag,
                attributes: ["title", "id"],
              },
            ],
            order: [["id", "DESC"]],
            attributes: [
              "createdAt",
              "title",
              "thumb",
              "slug",
              "description",
              "active",
              "content",
              "id",
            ],
          });
          return res.json(result);
        })
        .catch((error) => {
          return res.json(error);
        });
    }
    // console.log(req.userId)
  }
  async update(req, res) {
    await Post.update(
      {
        title: req.body.title,
        meta_title: req.body.title,
        slug: slug(req.body.title),
        description: req.body.description,
        content: req.body.content,
      },
      {
        where: {
          slug: req.body.slug,
        },
      }
    ).then(async (result) => {
      await Post.findOne({
        where: {
          slug: slug(req.body.title),
        },
      }).then(async (data) => {
        if (req.files.file) {
          const dataFile = req.files.file;
          var string = data.thumb;
          var public_id = string.slice(
            string.indexOf("avatars"),
            string.lastIndexOf(".")
          );

          await uploadImage(dataFile[0].path, "image").then(
            async (dataNameCloud) => {
              await Promise.all([
                Post.update(
                  { thumb: dataNameCloud },
                  {
                    where: {
                      id: data.id,
                    },
                  }
                ),
                cloudinary.v2.uploader.destroy(public_id),
              ]);
            }
          );
        }

        const rowFirst = await PostMeta.update(
          { key: data.title },
          {
            where: {
              post_id: data.id,
            },
          }
        );
        const rowSecond = await PostCategory.update(
          { category_id: req.body.category },
          {
            where: {
              post_id: data.id,
            },
          }
        );
        const rowThird = await PostTag.update(
          { tag_id: req.body.tag },
          {
            where: {
              post_id: data.id,
            },
          }
        );

        const results = await Post.findOne({
          where: {
            id: data.id,
          },
          include: [
            {
              model: Category,
              attributes: ["title", "id"],
            },
            {
              model: Tag,
              attributes: ["title", "id"],
            },
          ],
          order: [["id", "DESC"]],
          attributes: [
            "createdAt",
            "title",
            "thumb",
            "slug",
            "description",
            "active",
            "content",
            "id",
          ],
        });
        return res.json(results);
      });
    });
  }
  async destroy(req, res) {

    const directory = "src\\public\\img\\images";

    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (err) throw err;
        });
      }
    });


     await Post.findOne({
      where : {
        id : req.body.id
      },
      attributes: ['id', 'thumb']
    })
    .then(async (data) => {
      var string = data.thumb;
      var public_id = string.slice(string.indexOf("avatars"),string.lastIndexOf("."));
      await Promise.all([
         PostCategory.destroy({ where: { post_id: data.id } }),
         PostMeta.destroy({ where: { post_id: data.id } }),
         PostTag.destroy({ where: { post_id: data.id } }),
         cloudinary.v2.uploader.destroy(public_id)
      ]).then(async ([first, second, third, fourth]) => {
          await Post.destroy({ where: { id: data.id } })
          .then((result) => {
             return res.json({status : 'success', id : data.id});
          });
      })
    }); 
   
  }
}
module.exports = new PostController();
