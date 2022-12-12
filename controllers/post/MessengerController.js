
const Messenger = require('../../models').Messenger;


class MessengerController {
   async index(req, res){
      await Messenger.findAll({})
      .then((data) => {
        return res.json(data);
      })
      .catch((error) => {
        return (error);
      })
   }
}
module.exports = new MessengerController();
