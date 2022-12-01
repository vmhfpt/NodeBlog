const express = require('express');
const app = express();
var morgan = require('morgan');
const cloudinary = require('cloudinary').v2;
const handleUploadFile = require('../config/upload/multerConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const FooterController = require('../controllers/footer/FooterController');
const UserController = require('../controllers/UserController');
const PostController = require('../controllers/post/PostController');
const CategoryController = require('../controllers/post/CategoryController');
const PostAdminController = require('../controllers/admin/post/PostController');
const CategoryAdminController = require('../controllers/admin/category/CategoryController');
const authLogin = require('../middleware/authentication');
app.use(morgan('combined'));



cloudinary.config({
  cloud_name: 'dqouzpjiz', 
  api_key: '621535751894482', 
  api_secret: 'yr8KAay4lBEf9TfS9RVSdRQ0fk0',
  secure: true
});


app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/demo', UserController.index);
app.get('/home', PostController.index);
app.get('/convert-url-image',  PostController.change);


//////////////////////////////////
app.post('/user/login', UserController.login);
app.post('/user/logout', UserController.logout);
app.post('/user/register', UserController.create);
////////////////////////////////


//////////////////////////////
app.get('/admin/post',authLogin , PostAdminController.index);
app.get('/admin/category', authLogin, CategoryAdminController.index);
app.post('/admin/category/add', authLogin, CategoryAdminController.create);
app.get('/admin/category/show/:slug', authLogin, CategoryAdminController.show);
app.put('/admin/category/update/:slug', authLogin, CategoryAdminController.update);
app.delete('/admin/category/delete', authLogin, CategoryAdminController.destroy);
//////////////////////////////////'/admin/post/add'

/////////////////////////////////////
app.post('/admin/post/add',[authLogin,handleUploadFile] , PostAdminController.create);

////////////////////////////////////






app.post('/post-comment', PostController.postComment);
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

/**function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, [])); */