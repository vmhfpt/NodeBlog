'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name : DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    email_verified_at : DataTypes.DATE,
    password : DataTypes.STRING(255),
    remember_token : DataTypes.STRING(100),
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};