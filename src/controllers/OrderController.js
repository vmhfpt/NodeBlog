const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
class OrderController {
  async index(req, res){
    const Orders = await Order();
    const OrderDetails = await OrderDetail();
    const Users = await User();
    const Products = await Product();
    const Categories = await Category();
      Orders.hasMany(OrderDetails,  {
        foreignKey: 'order_id'
      });

      OrderDetails.belongsTo(Orders, {
        foreignKey: 'order_id'
      })
      
      OrderDetails.belongsTo(Products.table, {
        foreignKey: 'product_id'
      })

      Orders.belongsTo(Users.table,{
        foreignKey : 'user_id'
      })

      Orders.belongsToMany(Products.table, {
        through: OrderDetails,
        unique: false,
        foreignKey: 'order_id'
      })
      Products.table.belongsToMany(Orders,{
        through: OrderDetails,
        unique: false,
        foreignKey: 'product_id'
      })

      Products.table.belongsTo(Categories.table, {
        foreignKey: {
          name : 'id'
        }
      });

     const result = await Orders.findAll({
        include: [{
            model: Users.table,
          },
          {
            model: OrderDetails,
            include : [{
                model : Products.table,
                include : {
                    model : Categories.table
                }
                
          }]

          },
          {
            model : Products.table
          }
          
        ] 
     });
    /* const result = await OrderDetails.findOne({
        where : {
            id : 1
        },
        include : {
            model : Orders
        }
     })*/
      return res.json(result);
    /*const row = await demo.bulkCreate([
        {  user_id : 1 },
        {  user_id : 2 },
      ]) ;
      return res.jon(row);*/
   }
}
module.exports = new  OrderController();