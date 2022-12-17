


var express = require("express");
const http = require("http");
const morgan = require("morgan");

const MessengerController = require("../controllers/post/MessengerController");
const Messenger = require('../models').Messenger;
var bodyParser = require("body-parser");

const cors = require("cors");
const res = require("express/lib/response");
var app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const server = http.createServer(app);
app.get('/chat', (req, res) => {
  res.send('Hello chat app');
});
//////////////////////////////////////////////////////////////////////////


//app.use(morgan('combined'));
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  path: "/chat/"
 
});

const users = {};
var arrayTyping = [];
socketIo.on("connection", (socket) => {
  socket.on("sendDataClientNewRegister", function(data) {
     console.log(data)
    
  })
  socket.on("sendDataClientPrivate", function (data) {


  });

  socket.on("login", function (data) {
    users[socket.id] = data.userId;
    socketIo.emit("sendDataServerOnline", { users });
  });

  socket.on("sendDataClient", async function (data) {
    const timestamp = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();
    data = {...data,
        createdAt : timestamp
    };
    socketIo.emit("sendDataServer",  data );
   const result = await Messenger.create({ 
        name : data.name,
        content : data.content,
        user_id : data.id,
        createdAt : timestamp,
        thumb : data.thumb ? data.thumb : null
     });
   
  });
  socket.on("sendDataClientTyping", function (data) {
     if(!data) arrayTyping = [];
     else {
        if(!arrayTyping.includes(data))  arrayTyping.push(data);
     }
     
    //if(!arrayTyping.includes(data))  arrayTyping.push(data);
     socketIo.emit("sendDataServerTyping", arrayTyping);
  });

  socket.on("sendDataClientTypingPrivate", function (data) {
   
  });
  

  socket.on("disconnect", () => {
    arrayTyping = [];
    delete users[socket.id];
    socketIo.emit("sendDataServerOnline", { users });
  });
});


server.listen(process.env.PORT || 8081, () => {
  console.log(`server run  running at http://localhost:8081`);
});
