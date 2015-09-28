s = require( 'express' );
var morgan = require('morgan');
var swig = require('swig');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var app = express(); // creates an instance of an express application
var routes = require('./routes/');
app.use(express.static(__dirname + '/public'))
app.use('/', routes(io));



// app.use(function (req, res, next){
//   console.log("Verb:",req.method);
//   console.log("URL:",req.url);
//   console.log("Status",res.statusCode);
//   next();
// });

// app.get('/', function(req, res){
//   var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render( 'index', {title: 'Hall of Fame', people: people} );
// });

// app.get('/news', function(req, res){
//   res.send("This is the news!");
// });

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

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });   // TURNS OFF SWIG FOR NOW

var server = app.listen(8080, console.log('server listening'));
var io = socketio.listen(server);
