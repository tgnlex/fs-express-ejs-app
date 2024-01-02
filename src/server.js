const express = require('express');
const cors = require('cors');
const compression = require('compression')
const { createServer } = require('node:http');
const fs = require('fs')
const {logger} = require('./lib/logger.js');
const { Server } = require('socket.io');
const { errMsg, hitMsg, uploadErrMsg } = require('./vars/strings.js');
const { HOST, PORT } = require('./vars/hostname.js');
const {upload, filestore, avatar} = require('./lib/mult.js');
const { error } = require('node:console');
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
    logger.info(`${hitMsg} "/"` );
    res.render('pages/index.ejs');
});

app.get('/search', (req, res, next) => {
    console.log(`${hitMsg} "/search"`)
    logger.info(`${hitMsg} "/search"`)
    res.render('pages/search.ejs');
});

app.get('/signin', (req, res, next) => {
    console.log(`${hitMsg} "/signin"`)
    logger.info(`${hitMsg} "/signin"` );

    res.render('pages/signin.ejs');
});

// ######################################################## //
                 // ** Utility Routes ** //
app.get('/status', (req, res, next) => {
  console.log(`${hitMsg} "/status"`);    
  logger.info(`${hitMsg} "/status"` );


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
  console.log(`${hitMsg} "/signup"`);    
  logger.info(`${hitMsg} "/signup"` );


});

app.post('/login', () => {
  console.log(`${hitMsg} "/login"`);    
  logger.info(`${hitMsg} "/login"` );
});

app.get('/user', () => {
  console.log(`${hitMsg} "/user"`);    
  logger.info(`${hitMsg} "/user"` );
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
app.post('/upload', upload.single('upload'), (req, res, next) => {
  console.log(`${hitMsg} "/uploads"` )
  logger.info(`${hitMsg} "/uploads"` )
  const oldName = `storage/uploads/${req.file.filename}`;
  const name = `storage/uploads/${req.body.name}.jpg`;
  fs.rename(oldName, name, function (err) {
    if (err) { 
      console.log(uploadErrMsg);
      logger.error(`${$uploadErrMsg} \n ${err}`);
      return
    }
      logger.info(`[HTTP]: File uploaded as ${name}! `)
      console.log(`[HTTP]: File uploaded as ${name}! `)  
      res.redirect("/") 
  });
});
// ######################################################## //
                /**  Search Routes **/
app.post('/search/query', (req, res, next) => {
  console.log(`${hitMsg} "/search/query"`)
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
