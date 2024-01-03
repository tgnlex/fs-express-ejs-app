import express from 'express';
import cors from 'cors';
import  compression from 'compression';
import { createServer } from 'node:http';
import fs from 'fs';
import {logger} from './lib/logger.js';
import { Server } from 'socket.io';
import { errMsg, hitMsg, uploadErrMsg } from './vars/strings.js';
import { HOST, PORT } from './vars/hostname.js';
import {upload, filestore, avatar} from './lib/mult.js';
import {PrismaClient} from '@prisma/client';
import {createUser} from './db/prisma.js';
const app = express()
const server = createServer(app);
const io = new Server(server);

const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.use(compression());
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

app.get('/upload', (req, res, next) => {
  console.log(`${hitMsg} "/upload"`);
  logger.info(`${hitMsg} "/upload"`);
  res.render('pages/upload.ejs');
})

app.get('/login', (req, res, next) => {
    console.log(`${hitMsg} "/login"`)
    logger.info(`${hitMsg} "/login"` );
    res.render('pages/login.ejs');
});

app.get('/signup', (req, res, next) => {
  console.log(`${hitMsg} "/signup"`)
  logger.info(`${hitMsg} "/signup"` );

  res.render('pages/signup.ejs');
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


app.post('/login/auth', (req, res, next) => {
  console.log(`${hitMsg} "/login/auth"`);    
  logger.info(`${hitMsg} "/login/auth"` );
  let username= req.body.user;
  let password = req.body.password
  console.log(`User: ${username}, Pass: ${password}}`);
  console.log()

  res.redirect("/login")
});

app.post('/signup/auth', (req, res, next) => {
  console.log(`${hitMsg} "/signup"`);    
  logger.info(`${hitMsg} "/signup"` );
  createUser(req)
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    })
    res.redirect('/signup')
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

app.post('/upload/file', upload.single('upload'), (req, res, next) => {
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
