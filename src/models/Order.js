const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');

   const Order =  async () => {
    const sequelize = await db.connect();

      const Orders =  sequelize.define('Order', {
        
            id : {
                primaryKey: true,
                type: DataTypes.INTEGER,
                 autoIncrement: true 
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
          return (Orders);
    }
    module.exports = Order;
   /* module.exports = Order = sequelize.define('Order', {
        
        id : {
            primaryKey: true,
            type: DataTypes.INTEGER,
             autoIncrement: true 
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
      
      })();*/