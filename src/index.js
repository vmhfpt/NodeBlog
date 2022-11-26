const express = require('express');
const app = express();
var morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const FooterController = require('../controllers/footer/FooterController');
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
app.post('/post-by-search-auto-complete', PostController.getSearchAutoComplete);
app.post('/post-by-search', PostController.getSearch);
app.post('/post-by-tag', PostController.getByTag);
app.post('/post', PostController.getDetail);
app.post('/footer', FooterController.index);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



/**var morgan = require('morgan');
const express = require('express')
const app = express()
app.use(morgan('combined'));
const port = 8080
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wuahsgnt_blog'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 

app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM `categories` ',
    function (error, results, fields) {
       console.log(results);
       console.log(error);
      return res.json(results);
      
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
    }
  );
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */

