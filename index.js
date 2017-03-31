//USE utf8
var path = require('path');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var siscop = require('scrappers/siscop.js');
var multer = require('multer');
var upload = multer();
var between = require('between/between.js');
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('iso-8859-1', 'utf-8');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

app.post('/login', upload.array(), (req, res) => {
  siscop.scrap(req, res, request, between, iconv);
});

app.get('/siscop/*', (req, res) => {
  var address = siscop.host + req.originalUrl.split('/siscop/').join('/').split(
    '&amp;').join('&');
  request.post({
    url: address,
    strictSSL: false
  }).pipe(res);
});

app.get('/*', (req, res) => {
  var address = siscop.host + req.originalUrl.split('&amp;').join('&');
  request.post({
    url: address,
    strictSSL: false
  }).pipe(res);
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
