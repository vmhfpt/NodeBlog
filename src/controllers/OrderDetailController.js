const OrderDetail = require('../models/OrderDetail');

class OrderController {
  async index(req, res){
    const data = await OrderDetail();

   /* const row = await data.bulkCreate([
        {  order_id : 9, product_id : 4, quantity : 7},
        {  order_id : 9, product_id : 6, quantity : 6},
      ]) ;*/
  
    return res.json({status : 'success'});
    /*const row = await demo.bulkCreate([
        {  user_id : 1 },
        {  user_id : 2 },
      ]) ;
      return res.jon(row);*/
   }
}
module.exports = new  OrderController();