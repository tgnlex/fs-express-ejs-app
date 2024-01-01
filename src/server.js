const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const HOST = 'localhost';
const PORT = 3000;
const app = express()
const upload = multer({dest: 'uploads/'})


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
      res.send(status)
    });
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

app.get('/uploads', (req, res, next) => {
  res.send('/uploads/*')
})
app.post('/uploads', upload.single('files'), (req, res, next) => {
    console.log('[HTTP]: "/uploads" Endpoint Hit.' )
    const title = req.body.filename;
    const file = req.file;
    console.log(title)
    console.log(file)
});

// ######################################################## //
                /**  Search Routes **/


app.post('/search', (req, res, next) => {
    res.send() 
})


app.listen(PORT, (req, res, next) => {
    console.log(`[HTTP]: Server running at http://${HOST}:${PORT}/` )
})
