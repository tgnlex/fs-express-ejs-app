const express = require('express');
const cors = require('cors');
const compression = require('compression')
const { createServer } = require('node:http');
const fs = require('fs')
const {logger} = require('./logger.js');
const { Server } = require('socket.io');
const { errMsg, hitMsg, uploadErrMsg } = require('./vars/strings.js');
const { HOST, PORT } = require('./vars/hostname.js');
const {upload, filestore} = require('./mult.js');
const app = express()
const server = createServer(app);
const io = new Server(server);
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static('client'));
logger.info("Server online!")
logger.error(new Error("An error occured:"))
//#####################################################//
                  /* Page Routes */                 
app.get('/',  (req, res, next) => {
    console.log(`${hitMsg} "/" ` );
    res.render('pages/index.ejs');
});

app.get('/search', (req, res, next) => {
    console.log(`${hitMsg} "/search"`)
    res.render('pages/search.ejs');
});

app.get('/signin', (req, res, next) => {
    console.log(`${hitMsg} "/signin"`)
    res.render('pages/signin.ejs');
});

// ######################################################## //
                 // ** Utility Routes ** //
app.get('/status', (req, res, next) => {
  console.log(`${hitMsg} "/status"`);
  const status = {
    "Status":"Running"
  };
  const message = `[HTTP]: ${status}`
  console.log(message)
  res.send(message)
});
// ######################################################## //
                /**  Authentication Routes **/
app.post('/signup', () => {
  
});


app.post('/login', () => {

});

app.get('/user', () => {

});
// ######################################################## //
               /**  Image Upload Routes **/
/*
app.post('/profile', upload.single('avatar'), (req, res, next) => {
    console.log(req.avatar);
});
*/
app.post('/info/files', (req, res, next) => {
  console.log(`${hitMsg} "/info/files"`)  
  fs.readdir(`storage/uploads/`, function (err, files) {
    if (err) {
     return console.log(`${errMsg}`);
    }
    files.forEach(function (file) {
        console.log(file)
        res.write(`<p>${file}</p>`)
    })
  });
});
app.post('/uploads', upload.single('files'), (req, res, next) => {
  console.log(`${hitMsg} "/uploads"` )
  const title = req.body.title;     
  const file = req.file;
  const oldName = file.originalname;
  const newName = `${title}.jpg`;
    fs.rename(oldName, newName, function (err) {
      if (err) { 
        console.log(uploadErr);
        console.log(err)        
        res.send(uploadErrMsg);
        res.send(err);
        res.end()
      } else {
        res.send(`[HTTP]: File uploaded as ${file.newName}! `)
    }
    });
    console.log(title)
    console.log(file)
});
// ######################################################## //
                /**  Search Routes **/
app.post('/search/query', (req, res, next) => {
  console.log(`${hitMsg} "/search/query`)
    res.send() 
});
// ######################################################## //
            /** Web Sockets **/
io.on('connect', (socket) => {
  console.log(`[SOCKET]: A user connected via websocket.`);
  setInterval(function () {
    let date = new Date().toLocaleTimeString()
    socket.send(date)
  }, 1000)
  
  socket.on('disconnect', () => {
    console.log(`[SOCKET]: User disconnected from socket server.`);
  });
});

server.listen(PORT, (req, res, next) => {
    console.log(`[HTTP]: Server running at http://${HOST}:${PORT}/` )
});
