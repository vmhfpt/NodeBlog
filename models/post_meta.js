'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post_meta.init({
    post_id: {
      type: DataTypes.BIGINT(20)
    },
    key: {
      type: DataTypes.STRING(255)
    },
    content: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Post_meta',
  });
  return Post_meta;
};