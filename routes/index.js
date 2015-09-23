module.exports = function (io) {

	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser');
	// could use one line instead: var router = require('express').Router();
	var tweetBank = require('../tweetBank');

	router.get('/', function (req, res) {
	  // if(req.path == _dirname + '/'
	  var tweets = tweetBank.list();
	  console.log(tweets)
	  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});


	router.get('/users/:name', function(req, res) {

	  var name = req.params.name;
	  var list = tweetBank.find({name: name});
	  // var arrayOfText =[];
	  // for (var i = 0; i < list.length; i++) {
	  // 	arrayOfText.push(list[i].text);
	  // 	console.log("this is i", list[i].text);
	  // }

	  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, name: name} );
	});

	router.get('/users/:name/tweets/:id', function(req, res) {

	  var name = req.params.name;
	  var id = req.params.id;
	  var oneTweet = tweetBank.find({name: name})
	  console.log("tweet is here")
	  console.log(oneTweet)
	  res.render( 'singleTweet', {name: name, tweet: oneTweet[0]} );
	});

	var urlEncodedParser = bodyParser.urlencoded({extended: false});

	 router.post('/submit', urlEncodedParser, function(req, res) {
	   console.log(req.body);
	   var name = req.body.name;
	   var text = req.body.text;
	   tweetBank.add(name, text);
	   res.redirect('/');
	});


return router;
};



// module.exports = router;	