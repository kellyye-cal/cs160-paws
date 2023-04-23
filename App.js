
//ref from https://github.com/s-almeda/nodejs-express-starter-code
const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

//specify that we want to run our website on 'http://localhost:8000/'
const host = 'localhost';
const port = 8000;

var publicPath = path.join(__dirname, 'public'); //get the path to use our "public" folder where we stored our html, css, images, etc
app.use(express.static(publicPath));  //tell express to use that folder



//here's where we specify what to send to users that connect to our web server...
//if there's no url extension, it will show "index.html"
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
});

//The nutrition page.
app.get('/food', function (req, res) {
    res.sendFile(publicPath + '/food/main.html');
});

//depending on what url extension the user navigates to, send them the respective html file. 
app.get('/a', function (req, res) {
    res.sendFile(publicPath + '/a.html');
});
app.get('/b', function (req, res) {
    res.sendFile(publicPath + '/b.html');
});
app.get('/c', function (req, res) {
    res.sendFile(publicPath + '/c.html');
});


//run this server by entering "node App.js" using your command line. 
   app.listen(port, () => {
     console.log(`Server is running on http://${host}:${port}`);
   });
