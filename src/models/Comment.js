const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');



const Comment = async () => {
    const sequelize = await db.connect();
   const Comments = sequelize.define('Comment', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
        },
        content: {
          type: DataTypes.STRING,
          
        },
        product_id : {
            type: DataTypes.INTEGER,
            references: {
              model: 'products',
              key: 'id',
              deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
          },
        user_id : {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
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
     return ({table : Comments, sequelize : sequelize});
     
}

module.exports = Comment;
// `sequelize.define` also returns the model
