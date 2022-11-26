'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Footer.init({
    
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
  }, {
    sequelize,
    tableName: 'footer'
  });
  return Footer;
};