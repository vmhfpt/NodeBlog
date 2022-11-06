const Comment = require('../models/Comment');

class CommentController {
  async insert(req, res){
    const modelComment = await Comment();
    const row = await modelComment.table.bulkCreate([
        { content : 'Hùng bình luận iphone 14', product_id : 1, user_id : 1 },
        { content : 'Hùng bình luận iphone X', product_id : 2, user_id : 1 },

        { content : 'Dung bình luận iphone 14', product_id : 1, user_id : 2 },
        { content : 'Dung bình luận iphone X', product_id : 2, user_id : 2 },
      ]) 
    
  return res.json({status : row });
    
   }
}
module.exports = new  CommentController();