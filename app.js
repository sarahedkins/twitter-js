var express = require( 'express' );
var morgan = require('morgan');
var app = express(); // creates an instance of an express application

app.use(function (req, res, next){
  console.log("Verb:",req.method);
  console.log("URL:",req.url);
  console.log("Status",res.statusCode);
  next();
});

app.get('/', function(req, res){
  res.send("Hello!");
});

app.get('/news', function(req, res){
  res.send("This is the news!");
});

app.listen(8080, console.log('server listening'));
