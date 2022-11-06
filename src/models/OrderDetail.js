const {DataTypes,Deferrable} = require('sequelize');
const db = require('../config/database');

   const OrderDetail =  async () => {
    const sequelize = await db.connect();

      const OrderDetails =  sequelize.define('Order_detail', {
        
            id : {
                primaryKey: true,
                type: DataTypes.INTEGER,
                 autoIncrement: true 
            },
            order_id : {
                type: DataTypes.INTEGER,
                references: {
                  model: 'orders',
                  key: 'id',
                  deferrable: Deferrable.INITIALLY_IMMEDIATE
                }
              },
              product_id : {
                type: DataTypes.INTEGER,
                references: {
                  model: 'products',
                  key: 'id',
                  deferrable: Deferrable.INITIALLY_IMMEDIATE
                }
              },
              quantity : {
                  type : DataTypes.INTEGER 
              }
           
          }, {
            timestamps: true
          });
         
          (async () => {
            await sequelize.sync();
          })();
          return (OrderDetails);
    }
    module.exports = OrderDetail;
   