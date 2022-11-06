const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');



const Type = async () => {
    const sequelize = await db.connect();
   const Types = sequelize.define('Type', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
        },
        name: {
          type: DataTypes.STRING,
          
        },
       
       
      }, {
        timestamps: true
      });
     
      (async () => {
        await sequelize.sync();
      
      })();
     return (Types);
     
}

module.exports = Type;
// `sequelize.define` also returns the model
