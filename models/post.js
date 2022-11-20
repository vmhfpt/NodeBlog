'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      // define association here
      Post.belongsTo(models.User, {
        foreignKey : 'user_post_id'
      })
      Post.hasMany(models.Post_comment, {
        foreignKey : 'post_id',
        as : 'Post_comments'
      });
      Post.hasOne(models.Post_meta, {
        foreignKey : 'post_id'
      });
      Post.belongsToMany(models.Tag, {
        through: models.Post_tag,
        foreignKey : 'post_id'
      });
      models.Tag.belongsToMany(Post, {
        through: models.Post_tag,
        foreignKey : 'tag_id'
      });

      Post.belongsToMany(models.Category, {
        through: models.Post_category,
        foreignKey : 'post_id'
      });
      models.Category.belongsToMany(Post, {
        through: models.Post_category,
        foreignKey : 'category_id'
      });
    }
  }
  Post.init({
    
    user_post_id: {
      type: DataTypes.INTEGER
    },
    parent_id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.STRING(255)
    },
    meta_title: {
      type: DataTypes.STRING(255)
    },
    thumb: {
      type: DataTypes.STRING(255)
    },
    slug: {
      type: DataTypes.STRING(255)
    },
    content: {
      type: DataTypes.TEXT
    },
    active: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};