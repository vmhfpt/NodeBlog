const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');



const Value = async () => {
    const sequelize = await db.connect();
   const Values = sequelize.define('Value', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
        },
        value: {
          type: DataTypes.STRING,
        },
        type_id : {
            type: DataTypes.INTEGER,
            references: {
              model: 'types',
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
     return (Values);
     
}

module.exports = Value;
// `sequelize.define` also returns the model
