
const { Op } = require("sequelize");
const Product = require('../models/Product');
const ProductValue = require('../models/ProductValue');
const Type = require('../models/Type');
const Value = require('../models/Value');
const { QueryTypes } = require('sequelize');
const db = require('../config/database');
class ProductValueController {
  async insert(req, res){
    const sequelize = await db.connect();
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
      foreignKey: 'product_id',
      as: 'top_product'
    });
    
    Products.table.belongsToMany(Types, 
      {
      through: ProductValues,
      unique: false,
      foreignKey: 'type_id',
  
    })
    Types.belongsToMany(Products.table,{
      through: ProductValues,
      unique: false,
      foreignKey: 'product_id'
    })




    Products.table.belongsToMany(Values, {
      through: ProductValues,
      unique: false,
      foreignKey: 'product_id',
      
    })
    Values.belongsToMany(Products.table,{
      through: ProductValues,
      unique: false,
      foreignKey: 'value_id'
    })


    ProductValues.belongsTo(Types, {
      foreignKey: 'type_id',
      as: 'attribute'
    })
    ProductValues.belongsTo(Values, {
      foreignKey: 'value_id',
      as: 'attribute_value',

    })



    /*const result = await Products.table.findAll({
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
    }); */
    /*select products.name , `values`.`value`, types.name from products
join productvalues on productvalues.product_id = products.id
join types on productvalues.type_id = types.id
join `values` on productvalues.value_id = `values`.`id`
where products.id IN (
select products.id  from products
join productvalues on productvalues.product_id = products.id
join types on productvalues.type_id = types.id
join `values` on productvalues.value_id = `values`.`id`
where types.name like '%ram%'
AND `values`.`id` = 3
);*/
   const ram = "ram";
    const valueRam = 2;
    const result = await Products.table.findAll({
        where: {
          [Op.and]: [{ '$top_product.attribute.name$': 'Ram' }, {'$top_product.attribute_value.id$': 2 }],
        },
     
      include: [
        {
          model: ProductValues,
          as: 'top_product',
          attributes: ['type_id', 'value_id'],
          include : [
            {
              model : Types,
              as: 'attribute',
              
            },
            {
              model : Values,
              as: 'attribute_value',
            }
         ],
         
        }
      ] 
    });
    
    return res.json(result);
   }
}
module.exports = new  ProductValueController();

