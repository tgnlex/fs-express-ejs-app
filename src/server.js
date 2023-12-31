const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const HOST = 'localhost';
const PORT = 3000;
const app = express()

const upload = multer({dest: 'uploads/'})

const uploadImage = upload.fields(
    [
        { name: 'avatar', maxCount: 1}, 
        { name: 'uploads', maxCount: 8}
    ]
);

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.static('files'));
app.use(express.static('public'));
app.use(express.static('data'));
app.use(cors());

                /* Page Routes */ 

app.get('/',  (req, res, next) => {
    console.log('[HTTP]: Endpoint "/" Hit.' )
    console.log(req)
    res.render('pages/index.ejs');
})

app.get('/signin', (req, res, next) => {
    console.log('[HTTP]: Endpoint "/signin" Hit')
    console.log(req)
    res.render('pages/signin.ejs');
})


app.get('/status', (req, res, next) => {
  const status = {
    "Status": "Running"
  };
  if (status === true) {
    res.send(status)
  } else {
    res.send('An error has ocurred, please verify to ensure the server is correctly operating.')
  }
})

// ######################################################## //
                /**  Authentication Routes **/
app.post('/signup', () => {
  
})


app.post('/login', () => {

})

app.get('/user', () => {

})



// ######################################################## //
                /**  Image Upload Routes **/
/*
app.post('/profile', upload.single('avatar'), (req, res, next) => {
    console.log(req.avatar);
});
*/
app.post('/uploads', upload.array('files', 12), (req, res, next) => {
    console.log('[HTTP]: "/uploads" Endpoint Hit.' )
    console.log(req.files)

});

// ######################################################## //
                /**  Search Routes **/


app.post('/search', (req, res, next) => {
    res.send() 
})


app.listen(PORT, (req, res, next) => {
    console.log(`[HTTP]: Server running at http://${HOST}:${PORT}/` )
})
