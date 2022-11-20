'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Post, {
        through: models.Post_category,
        foreignKey : 'category_id'
      });
      models.Post.belongsToMany(Category, {
        through: models.Post_category,
        foreignKey : 'post_id'
      });
      Category.hasMany(models.Post_category, {
        foreignKey : 'category_id'
      })
    }
  }
  Category.init({
    parent_id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING(255)
    },
    meta_title: {
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
    modelName: 'Category',
  });
  return Category;
};