'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_tag.belongsTo(models.Tag, {
        foreignKey: 'tag_id'
      });
      Post_tag.belongsTo(models.Post, {
        foreignKey: 'post_id'
      });
    }
  }
  Post_tag.init({
   
    post_id: {
      type: DataTypes.BIGINT(20)
    },
    tag_id: {
      type: DataTypes.BIGINT(20)
    },
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Post_tag',
  });
  return Post_tag;
};