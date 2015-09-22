var express = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');
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

// DATA FOR SWIG
var data = {
    title: 'An Example',
    people: [{
        name: 'Gandalf',
    }, {
        name: 'Frodo'
    }, {
        name: 'Hermione'
    }]
};
swig.renderFile(__dirname + '/views/index.html', data, function (err, output) {
    console.log(output);
});


app.listen(8080, console.log('server listening'));
