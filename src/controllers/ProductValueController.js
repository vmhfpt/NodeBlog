const Product = require('../models/Product');
const ProductValue = require('../models/ProductValue');
const Type = require('../models/Type');
const Value = require('../models/Value');


class ProductValueController {
  async insert(req, res){
    const Values = await Value();
    const Types = await Type();
    const ProductValues = await ProductValue();
    const Products = await Product();
    // const row = await Types.bulkCreate([
    //   { name : 'Ram' },
    //   { name : 'Rom' },
    //   { name : 'Màn hình' },
    //   { name : 'Pin' },
    // ]) 
    Products.table.hasMany(ProductValues,  {
      foreignKey: 'product_id'
    });
    
    Products.table.belongsToMany(Types, {
      through: ProductValues,
      unique: false,
      foreignKey: 'type_id'
    })
    Types.belongsToMany(Products.table,{
      through: ProductValues,
      unique: false,
      foreignKey: 'product_id'
    })
    ProductValues.belongsTo(Types, {
      foreignKey: 'type_id'
    })
    ProductValues.belongsTo(Values, {
      foreignKey: 'value_id'
    })



    const result = await Products.table.findAll({
      include: [
      {
        model: ProductValues,
        
        attributes: ['type_id', 'value_id'],
        include : [
          {
            model : Types,
            attributes: ['name']
          },
          {
            model : Values,
            attributes: ['value']
          }
       ],
       
      }
    ] 
    });
    return res.json(result);
   }
}
module.exports = new  ProductValueController();