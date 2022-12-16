'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messenger.init({
    user_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING(255)
    },
    name : {
      type: DataTypes.STRING(255)
    },
    createdAt : {
      type: DataTypes.STRING(100)
    },
  }, {
    timestamps: false,
    sequelize,
    tableName: 'messengers'
  });
  return Messenger;
};