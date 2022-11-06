const Category = require('../models/Category');
const Product = require('../models/Product');
const Comment = require('../models/Comment');
const User = require('../models/User');
class CategoryController {
  async insert(req, res){
    const modelCategory = await Category();
    const row = await modelCategory.table.create({
          name : '',
          slug : 'oppo'
         });
    return res.json({status : row });
   }


   async index(req, res) {
      const modelCategory = await Category();
      const modelProduct = await Product();
      const modelComment = await Comment();
      const modelUser = await User();
      
      modelCategory.table.hasMany(modelProduct.table, {
        foreignKey: 'category_id'
      });

      modelProduct.table.hasMany(modelComment.table, {
        foreignKey: 'product_id'
      });



      modelProduct.table.belongsTo(modelCategory.table, {
        foreignKey: {
          name : 'id'
        }
      });

      modelComment.table.belongsTo(modelUser.table,  {
        foreignKey: 'user_id'
      });
      modelComment.table.belongsTo(modelProduct.table,  {
        foreignKey: 'product_id'
      });


      modelUser.table.hasMany(modelComment.table, {
        foreignKey: "user_id"
      })

      modelUser.table.belongsToMany(modelProduct.table, { 
          
        through: modelComment.table,
        unique: false,
        foreignKey: 'product_id'
      
        });

        modelProduct.table.belongsToMany(modelUser.table, { 
        
          through: modelComment.table,
          unique: false,
          foreignKey: 'user_id'
        
          });


     


   //   const response  = ((await modelCategory.table.findAll({ include: modelProduct.table })));
  
  /* const  response  = ((await modelProduct.table.findAll(
    { 
      where: {
        id: 2,

      },
      attributes: ['id', 'name'],
      include: {
        model: modelCategory.table,
        attributes: ['id', 'name'],
      }
    }
    
    )));*/


    /*const  comment_result = ((await modelComment.table.findAll(
      { 
        attributes: ['id', 'content'],
        include: [{
          model: modelUser.table,
          attributes: ['id', 'email'],
        },
        {
          model: modelProduct.table,
          attributes: ['id', 'name'],
        }]
      }
      
      )));*/
     /* const user_result = ((await modelUser.table.findAll(
        { 
          attributes: ['id', 'email'],
          include: {
            model: modelComment.table,
            attributes: ['id', 'content'],
          }
        }
        
        )))*/
       


        /*const result = await  modelUser.table.findAll({
          
          include: {
            model: modelProduct.table,
           
          }
        });*/
        const result = await  modelProduct.table.findOne({
          where : {
             id : 1
          },
          include: [{
            model: modelUser.table ,
           
          },
          {
            model: modelCategory.table,
            
          }]
        })
      /**SELECT `Category`.`id`, `Category`.`name`, `Category`.`slug`, `Category`.`createdAt`, `Category`.`updatedAt`, `Products`.`id` AS `Products.id`, `Products`.`name` AS `Products.name`, `Products`.`slug` AS `Products.slug`, `Products`.`category_id` AS `Products.category_id`, `Products`.`createdAt` AS `Products.createdAt`, `Products`.`updatedAt` AS `Products.updatedAt` FROM `Categories` AS `Category` LEFT OUTER JOIN `Products` AS `Products` ON `Category`.`id` = `Products`.`category_id`; */
   //  const response = await  modelProduct.table.findAll({});
    
      return res.json( result );
   }
}
module.exports = new  CategoryController();