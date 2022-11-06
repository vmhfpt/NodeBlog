const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');



const Product = async () => {
    const sequelize = await db.connect();
   const Products = sequelize.define('Product', {
        
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
        },
        category_id : {
            type: DataTypes.INTEGER,
            references: {
              model: 'categories',
              key: 'id',
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
          }
       
      }, {
        timestamps: true
      });
     
      (async () => {
        await sequelize.sync();
      
      })();
     return ({table : Products, sequelize : sequelize});
     
}

module.exports = Product;
// `sequelize.define` also returns the model
