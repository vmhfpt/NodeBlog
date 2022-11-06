const User = require('../models/User');

class UserController {
  async index(req, res){
    const modelUser = await User();
   // console.log(modelUser);
   const users = await modelUser.table.findAll({
    
   });
    return res.json({status : users});
   }
}
module.exports = new  UserController();