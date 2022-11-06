const {DataTypes} = require('sequelize');
const db = require('../config/database');


const User = async () => {
    const sequelize = await db.connect();
   const Users = sequelize.define('User', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        token: {
            type: DataTypes.STRING(300),
            allowNull: true,
          },
        otp: {
            type: DataTypes.STRING(300),
            allowNull: true,
          },
      }, {
        timestamps: true
      });
     
      (async () => {
        await sequelize.sync();
      
      })();
     return ({table : Users, sequelize : sequelize});
     
}

module.exports = User;
// `sequelize.define` also returns the model
