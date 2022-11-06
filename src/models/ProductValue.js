const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');



const ProductValue = async () => {
    const sequelize = await db.connect();
   const ProductValues = sequelize.define('ProductValue', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'products',
              key: 'id',
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        type_id : {
            type: DataTypes.INTEGER,
            references: {
              model: 'types',
              key: 'id',
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
          },
          value_id : {
            type: DataTypes.INTEGER,
            references: {
              model: 'values',
              key: 'id',
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
          },
       
      }, {
        timestamps: true
      });
     
      (async () => {
        await sequelize.sync();
      
      })();
     return (ProductValues);
     
}

module.exports = ProductValue;
// `sequelize.define` also returns the model
