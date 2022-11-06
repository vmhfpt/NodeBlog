const Product = require('../models/Product');

class ProductController {
  async insert(req, res){
    const modelProduct = await Product();
    const row = await modelProduct.table.bulkCreate([
        { name : 'Oppo neo 5', slug : 'oppo-5', category_id : 4 },
        { name : 'Oppo neo 4', slug : 'oppo-4', category_id : 4 },
        { name : 'Oppo neo 3', slug : 'oppo-3', category_id : 4 },
        { name : 'Oppo neo 2', slug : 'oppo-2', category_id : 4 },
      ])
  return res.json({status : row });
    
   }
}
module.exports = new  ProductController();