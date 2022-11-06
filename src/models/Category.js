const {DataTypes} = require('sequelize');
const db = require('../config/database');


const Category = async () => {
    const sequelize = await db.connect();
   const Categories = sequelize.define('Category', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false
        }
       
      }, {
        timestamps: true
      });
     
      (async () => {
        await sequelize.sync();
      
      })();
     return ({table : Categories, sequelize : sequelize});
     
}

module.exports = Category;
// `sequelize.define` also returns the model
