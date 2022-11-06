const express = require('express')
const app = express()
var morgan = require('morgan')
//const db  = require('./config/database');
const port = 3000
//const sequelize = db.connect();
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');
const CommentController = require('./controllers/CommentController');
const OrderController = require('./controllers/OrderController');
const OrderDetailController = require('./controllers/OrderDetailController');
app.use(morgan('combined'));
//const User = require('./models/User');

//User();
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/hello', UserController.index);
app.get('/category', CategoryController.insert);
app.get('/product', ProductController.insert);
app.get('/get-category', CategoryController.index);
app.get('/get-comment', CommentController.insert);
app.get('/order', OrderController.index);
app.get('/order-detail', OrderDetailController.index);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})