'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  
      Post_category.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
      Post_category.belongsTo(models.Post, {
        foreignKey: 'post_id'
      });
    }
  }
  Post_category.init({
    post_id: {
      type: DataTypes.INTEGER
    },
    category_id: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Post_category',
  });
  return Post_category;
};