const express = require('express');
const cors = require('cors');
const multer = require('multer');
const {createServer} = require('node:http');
const fs = require('fs')
const { Server } = require('socket.io');
const HOST = 'localhost';
const PORT = 3000;
const app = express()
const server = createServer(app);
const io = new Server(server)

const upload = multer({dest: 'uploads/'})

const errMsg = `[HTTP]: An error has occurred`;

async function stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime))
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(express.static('data'));
app.use(express.static('assets'))
app.use(cors());

                /* Page Routes */                 

app.get('/',  (req, res, next) => {
    console.log('[HTTP]: Endpoint "/" Hit.' );
    res.render('pages/index.ejs');
});

app.get('/info', (req, res, next) => {
    console.log('[HTTP]: Endpoint "/info" Hit.')
    res.render('pages/info.ejs');
});

app.get('/signin', (req, res, next) => {
    console.log('[HTTP]: Endpoint "/signin" Hit')
    console.log(req)
    res.render('pages/signin.ejs');
});

// ######################################################## //
                 // ** Utility Routes ** //

app.get('/status', (req, res, next) => {
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

app.post('/info/all-files', (req, res, next) => {
    fs.readdir(`uploads/`, function (err, files) {
    if (err) {
     return console.log(`${errMsg}`);
    }
    files.forEach(function (file) {
        console.log(file)
    })
      res.send(files);
 
  });
});
app.post('/uploads', upload.single('files'), (req, res, next) => {
  console.log('[HTTP]: "/uploads" Endpoint Hit.' )
  const title = req.body.title;     
  const file = req.file;
  const oldName = file.originalname;
  const newName = `${title}.jpg`;
    fs.rename(oldName, newName, function (err) {
      if (err) { 
        const uploadErr = `${errMsg} while trying to upload this file.`;
        console.log(uploadErr);
        console.log(err)        
        res.send(uploadErr);
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


app.post('/search', (req, res, next) => {
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
