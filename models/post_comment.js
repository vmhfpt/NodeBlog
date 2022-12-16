'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Post_comment.belongsTo(models.Post, {
          foreignKey  : "post_id"
        })
        Post_comment.hasMany(Post_comment, {
         foreignKey  : "parent_id",
        
        })
    }
  }
  Post_comment.init({
    parent_id: {
      type:DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.BIGINT(20)
    },
    name: {
      type: DataTypes.STRING(255)
    },
    phone_number: {
      type: DataTypes.STRING(255)
    },
    email: {
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
    tableName: 'post_comments'
  });
  return Post_comment;
};