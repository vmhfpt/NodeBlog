const express = require('express');
const app = express();
var morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3100;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/post/PostController');
const CategoryController = require('../controllers/post/CategoryController');
app.use(morgan('combined'));

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/demo', UserController.index);
app.get('/home', PostController.index);
app.get('/home-category', PostController.category);
app.get('/category', CategoryController.index);
app.post('/post-by-category', PostController.getByCategory);
app.post('/post-by-tag', PostController.getByTag);
app.post('/post', PostController.getDetail);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


/*  */