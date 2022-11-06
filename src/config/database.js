const { Sequelize } = require('sequelize');


async function connect(){
    const sequelize = new Sequelize('laravel_db', 'root', '', {
        host: 'localhost',
        dialect: 'mysql'
      });

      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return (sequelize);
      } catch (error) {
         return res.json({message : 'connect to database error'});
      }
}
module.exports = {connect};